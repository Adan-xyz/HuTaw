const { ActivityType } = require('discord.js');

function status(client) {
  let status = [{
    name: `:3`,
    type: ActivityType.Playing
  }, {
    name: `${client.guilds.cache.size} servers & ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} members`,
    type: ActivityType.Watching
  }];

  return setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 12000);
}

module.exports = { status };