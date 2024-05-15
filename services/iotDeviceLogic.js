function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function generateRandomAlphabets(length) {
    const alphabets = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    }
    return result;
  }
  
  function generateData() {
    const data = {
      D1: generateRandomNumber(10, 99),
      D2: generateRandomNumber(100, 999),
      D3: generateRandomNumber(1000, 9999),
      D4: generateRandomAlphabets(2),
      D5: generateRandomAlphabets(4),
    };
    data.D6 = data.D1.toString() + data.D4;
    const d5Prefix = data.D5.substring(0, 2);
    const d3Suffix = data.D3.toString().substring(2);
    data.D7 = d5Prefix + d3Suffix;
    return data;
  }
  
  module.exports = {
    generateData,
  };
  