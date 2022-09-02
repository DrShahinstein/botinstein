const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks users.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to be kicked.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason why you kick.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.user.username;
    const targetUser = interaction.options.getUser("target");
    const targetGuildMember = interaction.guild.members.cache.get(
      targetUser.id
    );
    const reason = interaction.options.getString("reason");

    if (targetUser.username === user) {
      return interaction.reply("**You can't kick yourself.**");
    } else if (!targetGuildMember.kickable) {
      return interaction.reply("**You can't kick this member.**");
    }

    targetGuildMember.kick(reason);
    return interaction.reply(`Kicked ${targetUser}`);
  },
};
