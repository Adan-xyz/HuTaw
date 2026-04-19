const emojis = require("../../config/emojis.json");
const db = require("../../database/models/user.js");
const { numberSeparator } = require("../../utils/text.js");
const {
  SlashCommandBuilder,
  AttachmentBuilder,
  ContainerBuilder,
  TextDisplayBuilder,
  MediaGalleryBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  ButtonBuilder,
  ButtonStyle,
  SectionBuilder,
  ThumbnailBuilder,
  MessageFlags,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("workplace")
    .setDescription("Your workplace"),
  async execute(interaction) {
    const data = await db.findOne({ uid: interaction.user.id });

    if (!data) {
      return interaction.reply({
        content: "No profile found, please try again.",
        ephemeral: true,
      });
    }

    if (data.workplace.have === false) {
      const image = new AttachmentBuilder("./assets/images/workplace/EJA.jpg", {
        name: "EJA.jpg",
      });

      const text = new TextDisplayBuilder().setContent(
        "## Get a job!\n-# You have no job, find a job",
      );

      const media = new MediaGalleryBuilder().addItems([
        {
          media: {
            url: `attachment://EJA.jpg`,
          },
        },
      ]);

      const separator = new SeparatorBuilder()
        .setDivider(true)
        .setSpacing(SeparatorSpacingSize.Small);

      const button = new ButtonBuilder()
        .setCustomId("findjob")
        .setLabel("Find job")
        .setStyle(ButtonStyle.Secondary)
        .setEmoji(emojis.search);

      const container = new ContainerBuilder()
        .setAccentColor(0x000000)
        .addTextDisplayComponents(text)
        .addMediaGalleryComponents(media)
        .addSeparatorComponents(separator)
        .addActionRowComponents((actionrow) => actionrow.setComponents(button));

      return interaction.reply({
        components: [container],
        files: [image],
        flags: MessageFlags.IsComponentsV2,
      });
    }

    const avatar = interaction.user.displayAvatarURL({ size: 1024 });

    const thumbnail = new ThumbnailBuilder({ media: { url: `${avatar}` } });

    const promotion = new TextDisplayBuilder().setContent(
      `### ${data.workplace.promotion}% Until your promotion`,
    );

    const money = new TextDisplayBuilder().setContent(
      `${emojis.money} \`$${numberSeparator(1000, 2)}\``,
    );

    const separator = new SeparatorBuilder()
      .setDivider(true)
      .setSpacing(SeparatorSpacingSize.Small);

    const position = (x) => {
      const y = {
        1: "Intern",
        2: "Staff",
        3: "Assistant Manager",
        4: "Manager",
        5: "Director",
        6: "CEO",
      };
      return y[x];
    };

    const salary = {
      dp:
        data.workplace.dailyquota >= 100
          ? data.workplace.dailypay * 2
          : data.workplace.dailypay,
      iv:
        data.workplace.dailyquota >= 100
          ? data.workplace.incentive * 2
          : data.workplace.incentive,
    };

    const incentive = (salary.dp * salary.iv) / 100;

    const text = new TextDisplayBuilder().setContent(`**Daily quota**\n**${data.workplace.dailyquota}%**\n\n${position(3)}\nDaily pay: $${salary.dp}\nIncentive: $${incentive.toFixed(2)}`);

    const resign = new ButtonBuilder()
      .setCustomId("resign")
      .setLabel("Resign")
      .setStyle(ButtonStyle.Secondary);

    const title = new SectionBuilder()
      .addTextDisplayComponents(promotion)
      .setButtonAccessory(resign)
      .addTextDisplayComponents(money);

    const section = new SectionBuilder()
      .setThumbnailAccessory(thumbnail)
      .addTextDisplayComponents(text);

    const work = new ButtonBuilder()
      .setCustomId("work")
      .setLabel("Work")
      .setStyle(ButtonStyle.Primary);

    const taptap = new ButtonBuilder()
      .setCustomId("click")
      .setLabel("Click")
      .setStyle(ButtonStyle.Primary);

    const workplace = new ContainerBuilder()
      .setAccentColor(0x000000)
      .addSectionComponents(title)
      .addSeparatorComponents(separator)
      .addSectionComponents(section)
      .addSeparatorComponents(separator)
      .addActionRowComponents((actionrow) =>
        actionrow.setComponents(work, taptap),
      );

    return interaction.reply({
      components: [workplace],
      flags: MessageFlags.IsComponentsV2,
    });
  },
};
