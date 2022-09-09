const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("update-classes")
    .setNameLocalization("tr", "sınıfları-güncelle")
    .setDescription("Upgrades the grade of classes.")
    .setDescriptionLocalization("tr", "Sınıfların derecesini yükseltir."),
  async execute(interaction) {
    const announcementChannelId = process.env.ANNOUNCEMENT_CHANNEL_ID;
    const isValid = (name) => /^\d/.test(name) && name.length <= 3;
    const getNextClass = (name) =>
      interaction.guild.roles.cache.find(
        (role) =>
          role.name === parseInt(name.match(/(\d+)/)) + 1 + name.slice(-1)
      );
    const allClassesWithName = [
      ...interaction.guild.roles.cache.filter((role) => isValid(role.name)),
    ].map((arr) => arr[1].name);

    interaction.guild.members.fetch().then((collection) => {
      collection.map(async (member) => {
        if (
          member.roles.cache.some((role) =>
            allClassesWithName.includes(role.name)
          )
        ) {
          const currentClass = member.roles.cache.find((role) =>
            isValid(role.name)
          );
          await member.roles.remove(currentClass);

          if (currentClass.name.startsWith("12")) {
            // If the class is 12th grade, this means there's not gonna be any grade greater than 12
            // so we need to kind of graduate these 12th grades and make them from now on a guest in this server.
            const guestRoleId = process.env.GUEST_ROLE_ID;
            const nextClass = interaction.guild.roles.cache.get(guestRoleId);
            await member.roles.add(nextClass);
          } else {
            const nextClass = getNextClass(currentClass.name);
            await member.roles.add(nextClass);
          }
        }
      });
    });

    await interaction.guild.channels.cache.get(announcementChannelId).send(
      "📢 Merhabalar, @everyone. Yeni dönem başlamıştır. Sınıf dereceleri yükseltildi."
      // 📢 | Hello, <@everyone>. The new term has begun. The grade of classes has been upgraded.
    );

    return interaction.reply({
      content: "Sınıf dereceleri başarılı bir şekilde yükseltildi.",
      // The grade of classes have succesffully been upgraded.
      ephemeral: true,
    });
  },
};
