const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setNameLocalization("tr", "söyle")
    .setDescription("Sends a message as per the given text.")
    .setDescriptionLocalization("tr", "Verilen metne göre bir mesaj gönderir.")
    .addStringOption((option) =>
      option
        .setName("text")
        .setNameLocalization("tr", "metin")
        .setDescription("The text which you want me to say.")
        .setDescriptionLocalization("tr", "Söylememi istediğiniz metin.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    return interaction.reply(text);
  },
};
