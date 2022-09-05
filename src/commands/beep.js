const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beep")
    .setDescription("Replies with Boop!")
    .setDescriptionLocalization("tr", "Boop! ile cevap verir"),
  async execute(interaction) {
    return interaction.reply("Boop!");
  },
};
