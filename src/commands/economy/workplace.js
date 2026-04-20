const emojis = require("../../config/emojis.json");
const { randomColor } = require("../../utils/color.js");
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

async function workplace(interaction) {
  const data = await db.findOne({ uid: interaction.user.id });

  const avatar = interaction.user.displayAvatarURL({ dynamic: true });

  const thumbnail = new ThumbnailBuilder({ media: { url: `${avatar}` } });

  const promotion = new TextDisplayBuilder().setContent(
    `### ${data.workplace.promotion}% Until your promotion`,
  );

  const separator = new SeparatorBuilder()
    .setDivider(true)
    .setSpacing(SeparatorSpacingSize.Small);

  const position = (x) => {
    const y = {
      1: "Intern",
      2: "Staff",
      3: "Manager",
      4: "Director",
      5: "CEO"
    };
    return y[x];
  };

  const dailypay = data.workplace.position === 1 ? 100 : data.workplace.position === 2 ? 200 : data.workplace.position === 3 ? 300 : data.workplace.position === 4 ? 400 : data.workplace.position === 5 ? 500 : 0;
  const incentive = data.workplace.position === 1 ? 0.1 : data.workplace.position === 2 ? 0.2 : data.workplace.position === 3 ? 0.3 : data.workplace.position === 4 ? 0.4 : data.workplace.position === 5 ? 0.5 : 0;

  const salary = {
    dp:
      data.workplace.dailyquota >= 100
        ? dailypay * 2
        : dailypay,
    iv:
      data.workplace.dailyquota >= 100
        ? incentive * 2
        : incentive,
  };

  const incentivex = (salary.dp * salary.iv) / 100;

  const isClick = (interaction) => {
    const text = interaction.customId === "click" ? `\`+${incentivex}\`` : '';
    return text;
  }

  const money = new TextDisplayBuilder().setContent(
    `${emojis.money} \`$${numberSeparator(data.assets.money, 2)}\` ${isClick(interaction)}`,
  );

  const text = new TextDisplayBuilder().setContent(`**Daily quota**\n**${data.workplace.dailyquota}%**\n\n${position(data.workplace.position)}\nDaily pay: $${salary.dp}\nIncentive: $${incentivex.toFixed(2)}`);

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

  const wb = data.workplace.dailyquota >= 100 ? true : false

  const work = new ButtonBuilder()
    .setCustomId("work")
    .setLabel("Work")
    .setStyle(ButtonStyle.Primary)
    .setDisabled(wb);

  const taptap = new ButtonBuilder()
    .setCustomId("click")
    .setLabel("Click")
    .setStyle(ButtonStyle.Primary);

  const container = new ContainerBuilder()
    .setAccentColor(randomColor)
    .addSectionComponents(title)
    .addSeparatorComponents(separator)
    .addSectionComponents(section)
    .addSeparatorComponents(separator)
    .addActionRowComponents((actionrow) =>
      actionrow.setComponents(work, taptap),
    );

  const respond = interaction.isButton()
    ? (opts) => interaction.update(opts)
    : (opts) => interaction.reply(opts);

  return respond({
    components: [container],
    flags: MessageFlags.IsComponentsV2,
  });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("workplace")
    .setDescription("Your workplace"),
  async execute(interaction) {
    const data = await db.findOne({ uid: interaction.user.id });

    if (!data) {
      return interaction.reply({
        content: "No profile found, please try again.",
        flags: MessageFlags.Ephemeral,
      });
    }

    if (data.workplace.have === false) {
      const image = new AttachmentBuilder("./src/assets/images/workplace/eja.jpg", {
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
        .setAccentColor(randomColor)
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

    return workplace(interaction);
  },
  workplace,
};
