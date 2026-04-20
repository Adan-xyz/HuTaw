const { randomColor } = require("../utils/color.js");
const { workplace } = require("../commands/economy/workplace.js")
const emojis = require("../config/emojis.json");
const db = require("../database/models/user.js");
const {
  AttachmentBuilder,
  MessageFlags,
  TextDisplayBuilder,
  ButtonBuilder,
  ButtonStyle,
  ContainerBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  MediaGalleryBuilder,
} = require("discord.js");

async function button(interaction) {
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
          "./src/assets/images/workplace/eja.jpg",
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
          .setAccentColor(randomColor)
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
      
      if (rng <= 50) {
        setTimeout(() => {
          back();
        }, 3000);
      } else {
        setTimeout(async (interaction) => {
          await interaction.deferUpdate();
          
         await workplace(interaction);
        }, 3000);
      }

      const tx = new TextDisplayBuilder().setContent(`${text}`);

      interaction.editReply({
        components: [tx],
        flags: MessageFlags.IsComponentsV2,
      });
    }, 3000);
  }

  // resign
  if (interaction.customId === "resign") {
    await interaction.deferUpdate();

    const title = new TextDisplayBuilder().setContent(`### Resign`);
    
    const text = new TextDisplayBuilder().setContent(`Do you really want to resign?`);

    const separator = new SeparatorBuilder()
      .setDivider(true)
      .setSpacing(SeparatorSpacingSize.Small);

    const yes = new ButtonBuilder()
      .setCustomId("resign_yes")
      .setLabel("Yes")
      .setStyle(ButtonStyle.Secondary);

    const no = new ButtonBuilder()
      .setCustomId("resign_no")
      .setLabel("No")
      .setStyle(ButtonStyle.Secondary);

    const constainer = new ContainerBuilder()
      .setAccentColor(randomColor)
      .addTextDisplayComponents(title)
      .addSeparatorComponents(separator)
      .addTextDisplayComponents(text)
      .addSeparatorComponents(separator)
      .addActionRowComponents((actionrow) => actionrow.setComponents(yes, no));

    await interaction.editReply({
      components: [constainer],
      flags: MessageFlags.IsComponentsV2,
    });
  }

  // resign yes
  if (interaction.customId === "resign_yes") {
    await interaction.deferUpdate();

    const title = new TextDisplayBuilder().setContent(`### Resignation`);

    const text = new TextDisplayBuilder().setContent(`You are free from corporate slavery now!\n-# You've subbmitted your resignation`);

    const separator = new SeparatorBuilder()
      .setDivider(true)
      .setSpacing(SeparatorSpacingSize.Small);

    const constainer = new ContainerBuilder()
      .setAccentColor(randomColor)
      .addTextDisplayComponents(title)
      .addSeparatorComponents(separator)
      .addTextDisplayComponents(text);

    await interaction.editReply({
      components: [constainer],
      flags: MessageFlags.IsComponentsV2,
    });
    
  }

  // resign no
  if (interaction.customId === "resign_no") {
    await workplace(interaction);
  }

  // work
  if (interaction.customId === "work") {
    await interaction.deferUpdate();
  }

  // click
  if (interaction.customId === "click") {
    const data = await db.findOne({ uid: interaction.user.id });

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

    data.assets.money += incentivex;
    data.workplace.dailyquota += 10;
    await data.save();

    await workplace(interaction);

  }
  
}

module.exports = { button };
