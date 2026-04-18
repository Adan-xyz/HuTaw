const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("market")
    .setDescription("Market interactions"),
  async execute(interaction) {
    await interaction.reply({ content: "Coming soon", ephemeral: true });
  },
};
