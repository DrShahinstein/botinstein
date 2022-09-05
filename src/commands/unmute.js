const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmutes members.")
    .setDescriptionLocalization("tr", "Üyelerin susturmasını kaldırır.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setNameLocalization("tr", "hedef")
        .setDescription("The member to be unmuted.")
        .setDescriptionLocalization("tr", "Susturması kaldırılacak üye.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const targetUser = interaction.options.getUser("target");
    const targetGuildMember = interaction.guild.members.cache.get(
      targetUser.id
    );
    const muteRoleId = process.env.MUTE_ROLE_ID;
    const muteRole = interaction.guild.roles.cache.get(muteRoleId);

    if (!targetGuildMember) return interaction.reply("Böyle bir üye yok."); // There's not a such member.

    if (!targetGuildMember.roles.cache.some((role) => role.name === "Muted"))
      return interaction.reply("Susturma zaten kaldırılmış."); // Already unmuted.

    targetGuildMember.roles.remove(muteRole);
    interaction.user.createDM().then((dmChannel) => {
      dmChannel.send(
        `Artık **${interaction.guild.name}** sunucusunda susturulu değilsiniz.`
      ); // You are no longer muted in ${interaction.guild.name}
    });
    return interaction.reply(`${targetUser} susturması kaldırıldı.`); // Unmuted ${targetUser}
  },
};
