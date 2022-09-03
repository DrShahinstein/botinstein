module.exports = {
  name: "messageCreate",
  async execute(message) {
    const targetChannelId = process.env.SUGGESTIONS_CHANNEL_ID;
    if (message.channelId === targetChannelId) {
      await message.react("👍");
      await message.react("👎");
    }
  },
};
