const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("members")
    .setDescription("Display info about this server."),
  async execute(interaction) {
    return interaction.reply(
      `Sunucumuzda ${interaction.guild.memberCount} katılımcı var!`
    );
  },
};
