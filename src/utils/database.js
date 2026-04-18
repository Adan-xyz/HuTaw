const { user } = require("../database/models/");

const userModels = async (interaction) => {
  let data = await user.findOneAndUpdate({
    uid: interaction.user.id }, {
  }, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true });
  return data;
}

const dbModels = (interaction) => {
  userModels(interaction);
  return;
}

module.exports = { dbModels };