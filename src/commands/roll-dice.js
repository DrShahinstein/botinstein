const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll-dice")
    .setDescription("Rolls a dice and returns a number from 1 to 6"),
  async execute(interaction) {
    let rand = Math.random() * 6;
    rand = Math.floor(rand);
    return interaction.reply(`🎲 **${rand}** 🎲`);
  },
};
