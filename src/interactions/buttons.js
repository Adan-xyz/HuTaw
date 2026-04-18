const emojis = require("../config/emojis.json");
const db = require("../database/models/user.js");
const { MessageFlags, TextDisplayBuilder } = require('discord.js');

function button(interaction) {
  
  // workplace
  if (interaction.customId === "findjob") {
    
    const text = new TextDisplayBuilder()
      .setContent(`Searching...`);
    
    interaction.update({
      components: [text], 
      flags: MessageFlags.IsComponentsV2 });

    setTimeout(async (interaction) => {
      let data = await db.findOne({ uid: interaction.user.id });
      
      let rng = Math.floor(Math.random() * 100) + 1;
      if (rng > 50) {
        await data.updateOne({ workplace: { 
          have: true } });
        await data.save();
      };
      
      
      const text = rng > 50 ? "You've successfully found a job!" : "You have failed to get a job";
      
      const tx = new TextDisplayBuilder()
        .setContent(`${text}`);
      
      interaction.editReply({
        components: [tx],
        flags: MessageFlags.IsComponentsV2
      });
    }, 3000);
  }
}

module.exports = { button };