const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pick-class")
    .setNameLocalization("tr", "sınıf-seç")
    .setDescription("Picks you a class role.")
    .setDescriptionLocalization("tr", "Size bir sınıf rolü seçer.")
    .addIntegerOption((option) =>
      option
        .setName("grade")
        .setNameLocalization("tr", "sınıf")
        .setDescription("Your grade of class.")
        .setDescriptionLocalization("tr", "Sınıf seviyeniz.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("branch")
        .setNameLocalization("tr", "şube")
        .setDescription("Your branch of class.")
        .setDescriptionLocalization("tr", "Sınıf şubeniz.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userId = interaction.user.id;
    const member = interaction.guild.members.cache.get(userId);
    const memberPermissions = member.permissions.toArray();
    const grade = interaction.options.getInteger("grade");
    const branch = interaction.options.getString("branch");
    const classRole = interaction.guild.roles.cache.find(
      (role) => role.name === `${grade}${branch}`.trim()
    );

    if (!classRole) {
      return interaction.reply({
        content: "Böyle bir sınıf yok.", // There's not a such class.
        ephemeral: true,
      });
    } else if (
      member.roles.cache.some((role) => role.name === classRole.name)
    ) {
      return interaction.reply({
        content: "Zaten bu sınıftasınız.",
        // You are already participating in this class.
        ephemeral: true,
      });
    } else if (
      memberPermissions.includes("Administrator") ||
      member.roles.cache.size === 1
    ) {
      await member.roles.add(classRole);
      return interaction.reply({
        content: `${classRole} sınıfına eklendiniz!`,
        // You were added to the class ${classRole}
        ephemeral: true,
      });
    }

    return interaction.reply({
      content:
        "Sınıf seçemezsiniz çünkü zaten seçtiniz. Sınıfınızı değiştirmek istiyorsanız yetkililerle görüşmelisiniz.",
      // You're unable to pick a class since you have already picked one before. If you want to change your class, you need to contact admins.
      ephemeral: true,
    });
  },
};
