const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mutes members.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to be muted.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("The reason why you mute.")
    ),
  async execute(interaction) {
    const targetUser = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason");
    const targetGuildMember = interaction.guild.members.cache.get(
      targetUser.id
    );
    const muteRoleId = process.env.MUTE_ROLE_ID;
    const muteRole = interaction.guild.roles.cache.get(muteRoleId);

    if (!targetGuildMember)
      return interaction.reply("**There's not a such member.**");

    if (targetGuildMember.roles.cache.some((role) => role.name === "Muted"))
      return interaction.reply("**Already muted.**");

    targetGuildMember.roles.add(muteRole);
    if (reason) {
      interaction.user.createDM().then((dmChannel) => {
        dmChannel.send(reason);
      });
    }
    return interaction.reply(`**Muted ${targetUser}**`);
  },
};
