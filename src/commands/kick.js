const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kicks members.")
    .setDescriptionLocalization("tr", "Üyeleri kickler.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setNameLocalization("tr", "hedef")
        .setDescription("The member to be kicked.")
        .setDescriptionLocalization("tr", "Kicklenecek üye.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setNameLocalization("tr", "sebep")
        .setDescription("The reason why you kick.")
        .setDescriptionLocalization("tr", "Kicklemenizin sebebi.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.user.username;
    const targetUser = interaction.options.getUser("target");
    const targetGuildMember = interaction.guild.members.cache.get(
      targetUser.id
    );
    const reason = interaction.options.getString("reason");

    if (!targetGuildMember) {
      return interaction.reply("Böyle bir üye yok."); // There's not a such member.
    } else if (targetUser.username === user) {
      return interaction.reply("Kendinizi kickleyemezsiniz."); // You can't kick yourself.
    } else if (!targetGuildMember.kickable) {
      return interaction.reply("Bu üyeyi kickleyemezsiniz."); // You can't kick this member.
    }

    targetGuildMember.kick(reason);
    return interaction.reply(`${targetUser} kicklendi.`); // Kicked ${targetUser}
  },
};
