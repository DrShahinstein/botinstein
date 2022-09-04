const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purge up to 99 messages.")
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("Amount of messages to purge.")
    ),
  async execute(interaction) {
    let amount = interaction.options.getInteger("amount");
    if (!amount) amount = 10;

    await interaction.channel.bulkDelete(amount, true).catch((error) => {
      console.error(error);
      interaction.reply({
        content: "There was an error trying to purge messages in this channel!",
        ephemeral: true,
      });
    });

    return interaction.reply({
      content: `Successfully purged \`${amount}\` messages.`,
      ephemeral: true,
    });
  },
};
