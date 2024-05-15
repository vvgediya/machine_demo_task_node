const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");
const sanitizeReqBody = require("./middlewares/sanitizeReqBody");
const { generateData } = require("./services/iotDeviceLogic.js");
const net = require("net");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// Connect Database
require("./db/mongoose-connection.js");

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(sanitizeReqBody);

const IotData = require("./models/IotDataModel.js");

// Routes
const authRoutes = require("./routes/authRoutes");
const servicesRoutes = require("./routes/serviceRoutes.js");
const tokenRoutes = require("./routes/tokenRoutes.js");
const iotRoutes = require("./routes/iotRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/tokens", tokenRoutes);
app.use("/api/iot", iotRoutes);
app.use("/api/users", userRoutes);

// custom error handling middleware
app.use(errorHandler);

// Start HTTP server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("tcpData", (data) => {
    console.log("Received data from TCP server:", data);
    io.emit("tcpData", data);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

// Start TCP server for IoT devices
const tcpServer = net.createServer((socket) => {
  console.log("Device connected:", socket.remoteAddress, socket.remotePort);
  const intervalId = setInterval(() => {
    sendSimulatedData(socket);
  }, 1000);

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
  socket.on("end", () => {
    console.log(
      "Device disconnected:",
      socket.remoteAddress,
      socket.remotePort
    );
    clearInterval(intervalId);
  });

  // Handle data events from TCP server
  socket.on("data", (data) => {
    console.log("Received data from TCP device:", data);
    // Broadcast data to all connected Socket.IO clients except the sender
    io.emit("tcpData", data.toString());
  });
});

tcpServer.listen(3001, () => {
  console.log("TCP server listening on port 3001");
});
io.on("connection", (socket) => {
  console.log("A client Timer connected");

  let elapsedTimeInterval; 
  let isTimerRunning = false; 
  socket.on("startTimer", () => {
    console.log("Timer started by a client");
    if (!isTimerRunning) {
      emitElapsedTime();
      isTimerRunning = true; 
    }
  });

  socket.on("stopTimer", () => {
    console.log("Timer stopped by a client");
    // Stop the timer only if it's running
    if (isTimerRunning) {
      // Stop emitting elapsed time to all connected clients
      clearInterval(elapsedTimeInterval);
      isTimerRunning = false; // Update the running status
      // Reset elapsedTime to "00:00"
      elapsedTime = "00:00";
      // Emit the reset elapsedTime to all connected clients
      io.emit("elapsedTime", elapsedTime);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    if (isTimerRunning) {
      clearInterval(elapsedTimeInterval);
      isTimerRunning = false; 
      elapsedTime = "00:00";
      io.emit("elapsedTime", elapsedTime);
    }
  });

  let elapsedTime = "00:00"; 

  function emitElapsedTime() {
    elapsedTimeInterval = setInterval(() => {
      io.emit("elapsedTime", elapsedTime);
      const [minutes, seconds] = elapsedTime.split(":").map(Number);
      if (seconds < 59) {
        elapsedTime = `${minutes}:${seconds + 1 < 10 ? "0" : ""}${seconds + 1}`;
      } else {
        elapsedTime = `${minutes + 1}:${"00"}`;
      }
    }, 1000);
  }
});

function sendSimulatedData(clientSocket) {
  const data = generateData();
  const dataString = JSON.stringify(data);
  io.emit("tcpData", JSON.parse(dataString));
  clientSocket.write(dataString);
  const iotData = new IotData(data);
  iotData
    .save()
    .then(() => {
      console.log("IoT data saved to database:", data);
    })
    .catch((error) => {
      console.error("Error saving IoT data to database:", error);
    });
}
