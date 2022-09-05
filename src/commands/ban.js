const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans users.")
    .setDescriptionLocalization("tr", "Kullanıcıları yasaklar.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setNameLocalization("tr", "hedef")
        .setDescription("The user to be banned.")
        .setDescriptionLocalization("tr", "Yasaklanacak kullanıcı.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setNameLocalization("tr", "sebep")
        .setDescription("The reason why you ban.")
        .setDescriptionLocalization("tr", "Yasaklamanızın sebebi.")
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
      return interaction.reply("Kendinizi yasaklayamazsınız."); // You can't ban yourself.
    }

    interaction.guild.bans.fetch().then((banned) => {
      const banList = banned.map((bannedUser) => bannedUser.user.id);

      if (banList.includes(targetUser.id)) {
        return interaction.reply(
          "Zaten yasaklı olduğu için bu kullanıcıyı yasaklayamazsınız." // You can't ban this user since it's already banned.
        );
      } else if (!targetGuildMember.bannable)
        return interaction.reply("Bu üyeyi yasaklayamazsınız."); // You can't ban this member.

      interaction.guild.members.ban(targetUser.id, { reason: reason });
      return interaction.reply(`${targetUser} yasaklandı.`); // Banned ${targetUser}
    });
  },
};
