const dotenv = require('dotenv'); dotenv.config();
const { connect } = require('../src/database/connection');
const property = require('../src/database/models/property.js');
const mongoose = require('mongoose');

function getAddress(code) {
  const itemsPerBlock = 100;
  const block = String.fromCharCode(65 + Math.floor((code - 1) / itemsPerBlock));
  const num = ((code - 1) % itemsPerBlock) + 1;
  return `${block}-${num}`;
}

function generateProperties() {
   const properties = [];
  for (let i = 1; i <= 2600; i++) {
    const address = getAddress(i);
    properties.push({
      id: i,
      name: `${address}`,
      price: Math.floor(Math.random() * 1000000),
      description: `This is property ${i} located at ${address}.`
    });
  } return properties;
}

(async () => {
  try {
    await connect();
    const properties = generateProperties();
    await property.insertMany(properties);
    console.log('Properties inserted successfully');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
})();
