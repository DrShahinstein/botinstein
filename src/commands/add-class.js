const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-class")
    .setNameLocalization("tr", "sınıf-ekle")
    .setDescription("Adds a class role to a member you indicate.")
    .setDescriptionLocalization(
      "tr",
      "Belirlediğiniz üyeye bir sınıf rolü verir"
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
        .setDescription("The member which you want to add class role to.")
        .setDescriptionLocalization("tr", "Sınıf rolü eklemek istediğiniz üye.")
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
      member.roles.cache.some((role) => role.name === classRole.name)
    ) {
      return interaction.reply({
        content: `${member} zaten bu sınıfta.`, // ${member} is already in this class.
        ephemeral: true,
      });
    }

    await member.roles.add(classRole);
    return interaction.reply(
      `${member} adlı öğrenci ${classRole} sınıfına eklendi.` // ${member} was added to ${classRole} class.
    );
  },
};
