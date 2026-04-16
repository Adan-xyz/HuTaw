const property = require('../src/database/models/property.js');

for (let i = 1; i <= 2; i++) {
  function getAddress(code) {
    const itemsPerBlock = 100;
    const block = String.fromCharCode(65 + Math.floor((code - 1) / itemsPerBlock));
    const num = ((code - 1) % itemsPerBlock) + 1;
    return `${block}-${num}`;
  }

  const address = getAddress(i);
  const price = Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;
  const description = `This is a property located at ${address}.`;

  const newProperty = new property({
    id: i,
    name: address,
    price: price,
    description: description
  });
  newProperty.save()
    .then(() => console.log(`Property ${address} saved successfully`))
    .catch(err => console.error(`Error saving property ${address}:`, err))
}