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
    .addUserOption((option) => {
      return option
        .setName("member")
        .setDescription("The member you want to report.")
        .setRequired(true);
    })
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason why you reported this member.")
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
        content: "Not a valid member.",
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
                `Your report has been seen by administrators in ${interaction.guild.name}`
              );
            });
          }
        });
      });

    return interaction.reply({
      content: `${targetUser} was successfully reported.`,
      ephemeral: true,
    });
  },
};
