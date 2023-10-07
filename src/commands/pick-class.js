const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pick-class")
    .setNameLocalization("tr", "sınıf-seç")
    .setDescription("Gives the role of your class grade")
    .setDescriptionLocalization("tr", "Sınıf derecenize ait rolü verir")
    .addIntegerOption((option) =>
      option
        .setName("grade")
        .setNameLocalization("tr", "sınıf")
        .setDescription("Grade")
        .setDescriptionLocalization("tr", "Sınıf seviyeniz")
        .setRequired(true)
    ),
  async execute(interaction) {
    const userId = interaction.user.id;
    const member = interaction.guild.members.cache.get(userId);
    const memberPermissions = member.permissions.toArray();
    const grade = interaction.options.getInteger("grade");
    const classRole = interaction.guild.roles.cache.find(
      (role) => role.name === `${grade}. sınıf`
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
