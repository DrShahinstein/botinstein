const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mutes members.")
    .setDescriptionLocalization("tr", "Üyeleri susturur.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setNameLocalization("tr", "hedef")
        .setDescription("The member to be muted.")
        .setDescriptionLocalization("tr", "Susturulacak üye.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setNameLocalization("tr", "sebep")
        .setDescription("The reason why you mute.")
        .setDescriptionLocalization("tr", "Susturmanızın sebebi.")
    ),
  async execute(interaction) {
    const targetUser = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason");
    const targetGuildMember = interaction.guild.members.cache.get(
      targetUser.id
    );
    const muteRoleId = process.env.MUTE_ROLE_ID;
    const muteRole = interaction.guild.roles.cache.get(muteRoleId);

    if (!targetGuildMember) return interaction.reply("Böyle bir üye yok."); // There's not a such member.

    if (targetUser.username === interaction.user.username) {
      return interaction.reply(
        "Pekala, yöneticisiniz ve kendinizi susturmak mı istiyorsunuz?" // So, you literally ARE an administrator and you want to mute yourself?
      );
    }

    if (targetGuildMember.roles.cache.some((role) => role.name === "Muted"))
      return interaction.reply("Zaten susturulmuş."); // Already muted.

    targetGuildMember.roles.add(muteRole);
    if (reason) {
      interaction.user.createDM().then((dmChannel) => {
        dmChannel.send(reason);
      });
    }
    return interaction.reply(`${targetUser} susturuldu.`); // Muted ${targetUser}
  },
};
