module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isButton()) {
      if (interaction.customId === "reportButton") {
        interaction.user.createDM().then((dmChannel) => {
          return dmChannel.send(
            `Administrators have seen your report in ${interaction.guild.name}`
          );
        });
      }
    }

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  },
};
