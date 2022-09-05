const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")
    .setDescriptionLocalization("tr", "Pong! ile cevap verir."),
  async execute(interaction) {
    return interaction.reply("Pong!");
  },
};
