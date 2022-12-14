const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("members")
    .setDescription("Indicates the number of participants of this server.")
    .setDescriptionLocalization("tr", "Bu sunucudaki üye sayısını gösterir."),
  async execute(interaction) {
    return interaction.reply(
      `Sunucumuzda ${interaction.guild.memberCount} katılımcı var!`
    );
  },
};
