const emojis = require("../../config/emojis.json");
const db = require("../../database/models/user.js");
const { numberSeparator } = require("../../utils/text.js");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("profile")
    .setDescription("View your profile"),
  async execute(interaction) {
    let data = await db.findOne({ uid: interaction.user.id });

    const condition = (x) => {
      if (x > 50) return "Good";
      if (x <= 50 && x > 20) return "Fine";
      if (x <= 20) return "Bad";
    };

    const foodexpense = (x) => {
      const y = {
        1: "Instant food",
        2: "Fast food",
        3: "Home cooked meal",
        4: "Organic meal",
        5: "Wealthy meal",
        6: "Extravagant meal",
      };
      return y[x];
    };
    const leisurelife = (x) => {
      const y = {
        1: "No expense",
        2: "Little expense",
        3: "Average expense",
        4: "Above average expense",
        5: "High-end Hobby",
        6: "Extravagant Hobby",
      };
      return y[x];
    };

    const embed = new EmbedBuilder()
      .setTitle("Profile")
      .setColor("Random")
      .setDescription(
        `${interaction.user.displayName} \`(Lvl ${data.level})\` \n ${interaction.user.id}`,
      )
      .addFields(
        {
          name: "",
          value: `${emojis.money} \`$${numberSeparator(data.assets.money, 2)}\` \n ${emojis.goldbar} \`${data.assets.goldbar}\``,
          inline: false,
        },
        { name: "Health", value: `${condition(data.health)}`, inline: true },
        {
          name: "Happiness",
          value: `${condition(data.happiness)}`,
          inline: true,
        },
        {
          name: "Food expense",
          value: `${foodexpense(data.foodexpense)}`,
          inline: true,
        },
        {
          name: "Leisure life",
          value: `${leisurelife(data.leisurelife)}`,
          inline: true,
        },
        { name: "Property", value: `House`, inline: true },
        { name: "Account book", value: `123`, inline: true },
      )
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));

    await interaction.reply({ embeds: [embed] });
  },
};
