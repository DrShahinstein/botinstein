const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Bans users.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to be banned.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason why you ban.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.user.username;
    const targetUser = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason");

    if (targetUser.username === user) {
      return interaction.reply("**You can't ban yourself.**");
    }

    interaction.guild.bans.fetch().then((banned) => {
      const banList = banned.map((bannedUser) => bannedUser.user.id);

      if (banList.includes(targetUser.id)) {
        return interaction.reply(
          "**You can't ban this user since it's already banned.**"
        );
      }
      interaction.guild.members.ban(targetUser.id, { reason: reason });
      return interaction.reply(`**Banned ${targetUser}**`);
    });
  },
};
