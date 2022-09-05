const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll-dice")
    .setNameLocalization("tr", "zar-at")
    .setDescription("Returns a number from 1 to 6")
    .setDescriptionLocalization("tr", "1-6 arasında bir sayı döndürür."),
  async execute(interaction) {
    let rand = Math.random() * 6;
    rand = Math.floor(rand);
    if (rand === 0) rand += 1;
    return interaction.reply(`🎲 ${rand} 🎲`);
  },
};
