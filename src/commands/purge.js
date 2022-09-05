const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setNameLocalization("tr", "temizle")
    .setDescription("Able to purge up to 99 messages.")
    .setDescriptionLocalization("tr", "99'a kadar mesaj temizleyebilir.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setNameLocalization("tr", "miktar")
        .setDescription("Amount of messages to purge.")
        .setDescriptionLocalization("tr", "Temizlenecek mesajların miktarı.")
    ),
  async execute(interaction) {
    let amount = interaction.options.getInteger("amount");
    if (!amount) amount = 10;

    await interaction.channel.bulkDelete(amount, true).catch((error) => {
      console.error(error);
      interaction.reply({
        content:
          "Bu kanaldaki mesajlar silinmeye çalışılırken bir hata oluştu!", // There was an error trying to purge messages in this channel!
        ephemeral: true,
      });
    });

    return interaction.reply({
      content: `\`${amount}\` kadar mesaj başarılı bir şekilde temizlendi.`, // Successfully purged \`${amount}\` messages.
      ephemeral: true,
    });
  },
};
