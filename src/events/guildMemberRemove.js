module.exports = {
  name: "guildMemberRemove",
  async execute(member) {
    const welcomeChannelId = process.env.WELCOME_CHANNEL_ID;
    const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
    const memberCount = member.guild.memberCount;
    const username = member.user;
    const message = `${username} aramızdan ayrıldı, ${memberCount} kişi kaldık 😭`;

    welcomeChannel.send(message);
  },
};
