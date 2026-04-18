const { user, property } = require("../database/models/");

const userModels = async (interaction) => {
  let data = await user.findOneAndUpdate({
    uid: interaction.user.id }, {
  }, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true });
  return data;
}

const propertyModels = async (interaction) => {
  let data = await property.findOneAndUpdate({
    uid: interaction.user.id }, {
  }, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true });
  return data;
}

const dbModels = (interaction) => {
  userModels(interaction);
  propertyModels(interaction);
  return;
}

module.exports = { dbModels };