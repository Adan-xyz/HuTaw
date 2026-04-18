const emojis = require("../../config/emojis.json");
const db = require("../../database/models/user.js");
const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ContainerBuilder, TextDisplayBuilder, MediaGalleryBuilder, SeparatorBuilder, SeparatorSpacingSize, ButtonBuilder, ButtonStyle, SectionBuilder, MessageFlags } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("workplace")
    .setDescription("Your workplace"),
  async execute(interaction) {
    const data = await db.findOne({ uid: interaction.user.id });

    if (!data) {
      return interaction.reply({ content: "No profile found, please try again.", ephemeral: true });
    }

    if (data.workplace.have === false) {
      const image = new AttachmentBuilder('./assets/images/workplace/EJA.jpg', { name: 'EJA.jpg' });

      const text = new TextDisplayBuilder()
        .setContent("## Get a job!\n-# You have no job, find a job");

      const media = new MediaGalleryBuilder()
        .addItems([ {
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
      
    };

    const embed = new EmbedBuilder()
      .setTitle("Workplace")
      .setColor("Random")
      .setDescription("This is your workplace")
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }));
    await interaction.reply({ embeds: [embed] });
  },
};
