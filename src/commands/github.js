const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("github")
    .setDescription("Gives the link to the github of Botinstein.")
    .setDescriptionLocalization("tr", "Botinstein'ın Github linkini verir."),
  async execute(interaction) {
    return interaction.reply("https://github.com/1TaylanOzturk/botinstein");
  },
};
