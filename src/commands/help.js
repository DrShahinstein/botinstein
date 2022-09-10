const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setNameLocalization("tr", "yardım")
    .setDescription("Replies with a menu of commands.")
    .setDescriptionLocalization("tr", "Bir komut menüsüyle cevap verir.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("admin")
        .setDescription("Shows the list of only-staff commands")
        .setDescriptionLocalization(
          "tr",
          "Sadece yöneticilerin kullanabileceği komutların listesini gösterir."
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("everyone")
        .setNameLocalization("tr", "herkes")
        .setDescription("Shows the list of commands anyone can use.")
        .setDescriptionLocalization(
          "tr",
          "Herkesin kullanabileceği komutların listesini gösterir."
        )
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "admin") {
      const embed = new EmbedBuilder()
        .setTitle("Komutlar")
        .setDescription("Sadece yöneticilerin kullanabileceği komutlar.")
        .setColor(0x09dde8)
        .addFields(
          {
            name: "/say | /söyle",
            value: "Verilen texte göre bir mesaj gönderir.",
          },
          {
            name: "/purge | /temizle",
            value: "99'a kadar mesaj temizleyebilir.",
          },
          { name: "/kick", value: "Üyeleri kickler." },
          { name: "/ban", value: "Kullanıcıları banlar." },
          { name: "/unban", value: "Kullanıcıların yasağını kaldırır." },
          { name: "/mute", value: "Üyeleri susturur." },
          { name: "/unmute", value: "Üyelerin susturmasını kaldırır." },
          {
            name: "/add-class | /sınıf-ekle",
            value: "Belirlediğiniz üyeye bir sınıf rolü verir.",
          },
          {
            name: "/remove-class | /sınıf-kaldır",
            value: "Belirlediğiniz üyenin bir sınıf rolünü kaldırır.",
          },
          {
            name: "/update-classes | /sınıfları-güncelle",
            value: "Sınıfların derecesini yükseltir.",
          }
        );

      return interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "everyone") {
      const embed = new EmbedBuilder()
        .setTitle("Komutlar")
        .setDescription("Herkesin kullanabileceği komutlar.")
        .setColor(0x09dde8)
        .addFields(
          {
            name: "/ping",
            value: "\"Pong!\" ile cevap verir.",
          },
          {
            name: "/beep",
            value: "\"Boop!\" ile cevap verir.",
          },
          { name: "/members", value: "Bu sunucudaki üye sayısını gösterir." },
          {
            name: "/roll-dice | zar-at",
            value: "1-6 arasında bir sayı döndürür.",
          },
          { name: "/github", value: "Botinstein'ın Github linkini verir." },
          { name: "/report", value: "Bir üyeyi yöneticilere report eder." },
          {
            name: "/pick-class | /sınıf-seç",
            value: "Size bir sınıf rolü seçer.",
          }
        );
      return interaction.reply({ embeds: [embed] });
    }
  },
};
