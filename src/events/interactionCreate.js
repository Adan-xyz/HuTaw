const { dbModels } = require('../utils/database');
const { button } = require('../interactions/buttons.js');
const { Events, MessageFlags } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		await dbModels(interaction);

		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		} else if (interaction.isButton()) {
			await button(interaction);	

		} else if (interaction.isStringSelectMenu()) {
			
		}
	},
};