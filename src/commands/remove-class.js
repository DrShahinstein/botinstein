const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-class")
    .setNameLocalization("tr", "sınıf-kaldır")
    .setDescription("Removes a class role from a member you indicate.")
    .setDescriptionLocalization(
      "tr",
      "Belirlediğiniz üyenin bir sınıf rolünü kaldırır."
    )
    .addIntegerOption((option) =>
      option
        .setName("grade")
        .setNameLocalization("tr", "sınıf")
        .setDescription("The grade of class.")
        .setDescriptionLocalization("tr", "Sınıf seviyesi.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("branch")
        .setNameLocalization("tr", "şube")
        .setDescription("The branch of class.")
        .setDescriptionLocalization("tr", "Sınıf şubeni")
        .setRequired(true)
    )
    .addUserOption((option) => {
      return option
        .setName("member")
        .setNameLocalization("tr", "üye")
        .setDescription("The member which you want to remove his class role.")
        .setDescriptionLocalization(
          "tr",
          "Sınıf rolünü kaldırmak istediğiniz üye."
        )
        .setRequired(true);
    }),
  async execute(interaction) {
    const roles = interaction.guild.roles;
    const targetUser = interaction.options.getUser("member");
    const member = interaction.guild.members.cache.get(targetUser.id);
    const grade = interaction.options.getInteger("grade");
    const branch = interaction.options.getString("branch");
    const classRole = roles.cache.find(
      (role) => role.name === `${grade}${branch}`.trim()
    );

    if (!classRole) {
      return interaction.reply({
        content: "Böyle bir sınıf yok.", // There's not a such class.
        ephemeral: true,
      });
    } else if (!member) {
      return interaction.reply({
        content: "Böyle bir üye yok.", // There's not a such member.
        ephemeral: true,
      });
    } else if (
      !member.roles.cache.some((role) => role.name === classRole.name)
    ) {
      return interaction.reply({
        content: "Zaten bu sınıfta değilsiniz.", // You're not already participating in this class.
        ephemeral: true,
      });
    }

    await member.roles.remove(classRole);
    return interaction.reply(
      `${member} adlı üyenin **${classRole}** rolü kaldırıldı.` // ${member}'s ${classRole} role has been removed.
    );
  },
};
