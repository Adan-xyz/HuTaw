const property = require('../src/database/models/property.js');

function getAddress(code) {
  const itemsPerBlock = 100;
  const block = String.fromCharCode(65 + Math.floor((code - 1) / itemsPerBlock));
  const num = ((code - 1) % itemsPerBlock) + 1;
  return `${block}-${num}`;
}

function generateProperties() {
   const properties = [];
  for (let i = 1; i <= 1000; i++) {
    const address = getAddress(i);
    properties.push({
      id: i,
      name: `Property ${i}`,
      price: Math.floor(Math.random() * 1000000),
      description: `This is property ${i} located at ${address}.`
    });
  } return properties;
}
const properties = generateProperties();
property.insertMany(properties).then(() => {
  console.log('Properties inserted successfully');
});