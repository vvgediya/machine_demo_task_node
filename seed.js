const mongoose = require('mongoose');
const config = require('./config/config');
const Service = require('./models/serviceModel');

mongoose.connect(config.database[process.env.NODE_ENV || 'development'].url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

async function seedDatabase() {
  try {
    const servicesData = [
      { name: 'General Servicing', status: 'active' },
      { name: 'Tyre Change', status: 'active' },
      { name: 'Over oiling', status: 'active' },
      { name: 'Petrol filling', status: 'active' },
      { name: 'Denting Panting', status: 'active' },
      { name: 'Electronic work', status: 'active' }
    ];

    const createdServices = await Service.create(servicesData);
    console.log('Seed data inserted:', createdServices);
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.disconnect();
  }
}
