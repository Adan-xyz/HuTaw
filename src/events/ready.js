const { Events } = require('discord.js');
const { status } = require('../functions/status');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		
		status(client);
	},
};