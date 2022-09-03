const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmutes members.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to be unmuted.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const targetUser = interaction.options.getUser("target");
    const targetGuildMember = interaction.guild.members.cache.get(
      targetUser.id
    );
    const muteRoleId = process.env.MUTE_ROLE_ID;
    const muteRole = interaction.guild.roles.cache.get(muteRoleId);

    if (!targetGuildMember)
      return interaction.reply("**There's not a such member.**");

    if (!targetGuildMember.roles.cache.some((role) => role.name === "Muted"))
      return interaction.reply("**Already unmuted.**");

    targetGuildMember.roles.remove(muteRole);
    interaction.user.createDM().then((dmChannel) => {
      dmChannel.send(`You are no longer muted in ${interaction.guild.name}`);
    });
    return interaction.reply(`**Unmuted ${targetUser}**`);
  },
};
