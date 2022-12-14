const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unbans users.")
    .setDescriptionLocalization("tr", "Kullanıcın yasağını kaldırır.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setNameLocalization("tr", "hedef")
        .setDescription("The user to be unbanned.")
        .setDescriptionLocalization("tr", "Yasağı kaldırılacak kullanıcı.")
        .setRequired(true)
    ),

  async execute(interaction) {
    const user = interaction.user.username;
    const targetUser = interaction.options.getUser("target");

    if (targetUser.username === user) {
      return interaction.reply(
        "Cidden kendi yasağını kaldırmaya mı çalışıyorsun?" // Are you seriously trying to unban yourself?
      );
    }

    interaction.guild.bans.fetch().then((banned) => {
      const banList = banned.map((bannedUser) => bannedUser.user.id);

      if (!banList.includes(targetUser.id)) {
        return interaction.reply(
          "Yasaklanmadığı için bu kullanıcının yasağını kaldıramazsınız." // You can't unban this user since it's not banned.
        );
      }
      interaction.guild.members.unban(targetUser.id);
      return interaction.reply(`${targetUser} yasağı kaldırıldı.`); // Unbanned ${targetUser}
    });
  },
};
