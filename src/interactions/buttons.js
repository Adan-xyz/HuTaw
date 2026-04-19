const emojis = require("../config/emojis.json");
const db = require("../database/models/user.js");
const {
  AttachmentBuilder,
  MessageFlags,
  TextDisplayBuilder,
  ButtonBuilder,
  ButtonStyle,
  ContainerBuilder,
  SectionBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  MediaGalleryBuilder,
} = require("discord.js");

function button(interaction) {
  // workplace
  
  // find job
  if (interaction.customId === "findjob") {
    const text = new TextDisplayBuilder().setContent(`Searching...`);

    interaction.update({
      components: [text],
      flags: MessageFlags.IsComponentsV2,
    });

    setTimeout(async () => {
      let data = await db.findOne({ uid: interaction.user.id });

      let rng = Math.floor(Math.random() * 100) + 1;
      if (rng > 50) {
        await data.updateOne({
          workplace: {
            have: true,
          },
        });
        await data.save();
      }

      const back = () => {
        const image = new AttachmentBuilder(
          "./assets/images/workplace/EJA.jpg",
          { name: "EJA.jpg" },
        );

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
          .addActionRowComponents((actionrow) =>
            actionrow.setComponents(button),
          );

        return interaction.editReply({
          components: [container],
          files: [image],
          flags: MessageFlags.IsComponentsV2,
        });
      };

      const text =
        rng > 50
          ? "You've successfully found a job!"
          : "You have failed to get a job 🥀";
      if (rng <= 50)
        setTimeout(() => {
          back();
        }, 3000);

      const tx = new TextDisplayBuilder().setContent(`${text}`);

      interaction.editReply({
        components: [tx],
        flags: MessageFlags.IsComponentsV2,
      });
    }, 3000);
  }

  // resign
  if (interaction.customId === "resign") {
    const image = new AttachmentBuilder("./assets/images/workplace/resign.jpg", {
      name: "resign.jpg",
    });

    const media = new MediaGalleryBuilder().addItems([
      {
        media: {
          url: `attachment://resign.jpg`,
        },
      },
    ]);
    
    const text = new TextDisplayBuilder().setContent(`Resigning...`);

    const constainer = new ContainerBuilder()
      .setAccentColor(0x000000)
      .addTextDisplayComponents(text)
      .addMediaGalleryComponents(media);

    interaction.editReply({
      components: [constainer],
      files: [image],
      flags: MessageFlags.IsComponentsV2,
    });

  }
}

module.exports = { button };
