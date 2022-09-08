const { v4: uuidv4 } = require("uuid");
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Reports a member to the admins.")
    .setDescriptionLocalization("tr", "Bir üyeyi yöneticilere report eder.")
    .addUserOption((option) => {
      return option
        .setName("member")
        .setNameLocalization("tr", "üye")
        .setDescription("The member you want to report.")
        .setDescriptionLocalization("tr", "Reportlamak istediğiniz üye.")
        .setRequired(true);
    })
    .addStringOption((option) =>
      option
        .setName("reason")
        .setNameLocalization("tr", "sebep")
        .setDescription("The reason why you reported this member.")
        .setDescriptionLocalization("tr", "Bu üyeyi reportlama sebebiniz.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const reporter = interaction.user;
    const targetUser = interaction.options.getUser("member");
    const reason = interaction.options.getString("reason");
    const reportChannelId = process.env.REPORT_CHANNEL_ID;
    const reportChannel = interaction.guild.channels.cache.get(reportChannelId);
    const isValidMember = interaction.guild.members.cache.get(targetUser.id);

    if (!isValidMember) {
      return interaction.reply({
        content: "Geçerli bir üye değil.", // Not a valid member.
        ephemeral: true,
      });
    }

    const uniqueID = uuidv4();
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(uniqueID)
        .setLabel("OK")
        .setStyle(ButtonStyle.Success)
    );

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Report")
      .setDescription(`${reporter} reported ${targetUser}`)
      .addFields({ name: "Reason:", value: reason })
      .setTimestamp();

    await reportChannel
      .send({ embeds: [embed], components: [row] })
      .then((message) => {
        const oneDay = 1000 * 3600 * 24;
        const filter = (m) => m.customId === uniqueID;
        const collector = message.createMessageComponentCollector({
          filter,
          time: oneDay,
        });
        collector.on("collect", async (i) => {
          i.deferUpdate();
          if (i.customId === uniqueID) {
            row.components[0].setDisabled(true);
            message.edit({
              components: [row],
            });
            reporter.createDM().then((dmChannel) => {
              dmChannel.send(
                `\`${reason}\` sebepli reportunuz yöneticiler tarafından görüldü.\n**${interaction.guild.name}**`
                // Your report for {reason} has been seen by administrators.
              );
            });
          }
        });
      });

    return interaction.reply({
      content: `${targetUser} başarılı bir şekilde yöneticilere bildirildi.`,
      // ${targetUser} was successfully reported to the admins.
      ephemeral: true,
    });
  },
};
