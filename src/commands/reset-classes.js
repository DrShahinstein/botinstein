const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reset-classes")
    .setNameLocalization("tr", "sınıfları-sıfırla")
    .setDescription("Removes classes of all members")
    .setDescriptionLocalization("tr", "Tüm üyelerin sınıflarını kaldırır"),
  async execute(interaction) {
    const classesByName = ["9. sınıf", "10. sınıf", "11. sınıf", "12. sınıf"];

    interaction.guild.members.fetch().then((collection) => {
      collection.map(async (member) => {
        if (
          member.roles.cache.some((role) => classesByName.includes(role.name))
        ) {
          const currentClass = member.roles.cache.find((role) =>
            classesByName.map((availClass) => role.name === availClass)
          );

          await member.roles.remove(currentClass);
        }
      });
    });

    return interaction.reply({
      content: "Tüm üyelerin sınıf rolleri kaldırıldı.",
    });
  },
};
