module.exports = {
  name: "guildMemberAdd",
  async execute(interaction) {
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const welcomeChannel =
      interaction.guild.channels.cache.get(welcomeChannelId);
    const memberCount = interaction.guild.memberCount;
    const user = interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    const message = `Aramıza hoş geldin ${user}, ${memberCount} kişi olduk!`;

    if (interaction.user.bot) {
      const botRoleID = process.env.BOT_ROLE_ID;
      const botRole = interaction.guild.roles.cache.get(botRoleID);
      member.roles.add(botRole);
    }

    welcomeChannel.send(message);
  },
};
