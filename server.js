const fs = require('fs');
const axios = require('axios');
const cron = require('node-cron');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3000;

const token = '6507821468:AAGdfeHWn3ZrnFtX1W4PDCxdHZ475moujuE';
const chatIds = ['6083550027','6616187800','5205253618'];

const servers = [
    {url: "https://goldenv.bbbbbsdf.cfd/sd-jklad-mcs-sasdew/xui/", name: "ایران 1"},
    {url: "https://goldenvppntel.bbbbbsdf.cfd/xui/", name: "هلند 1"},
    {url: "https://cruisevpn.bbbbbsdf.cfd/sd-jkgsfdsd-asdfs-sasfhaw/xui/", name: "ایران 2"},
    {url: "https://us.bbbbbsdf.cfd/asdfasfwe/xui", name: "آمریکا 2"},
]

const bot = new TelegramBot(token, {polling: true});

const downloadDbFile = async () => {
    try {
        const config = {
            headers: {
                'Accept': 'application/octet-stream',
                'Cookie': 'lang=fa-IR; x-ui=MTcyMDg4NTIwNHxEWDhFQVFMX2dBQUJFQUVRQUFCbF80QUFBUVp6ZEhKcGJtY01EQUFLVEU5SFNVNWZWVk5GVWhoNExYVnBMMlJoZEdGaVlYTmxMMjF2WkdWc0xsVnpaWExfZ1FNQkFRUlZjMlZ5QWYtQ0FBRURBUUpKWkFFRUFBRUlWWE5sY201aGJXVUJEQUFCQ0ZCaGMzTjNiM0prQVF3QUFBQXdfNEl0QVFJQkVtRnZhWE5tSXlRbFhpWmhiM1YzYVdWbWFRRVVZV2x2YUhWbGNtWmhiMmxsSkNWZUppb3FLQ01BfJoWHdCC-KF6fIfdiYrAqsAdpnYg-q2BVtK_sZiafDcN',
            },
            responseType: 'arraybuffer'
        };

        const response = await axios.get('https://cruisevpn.bbbbbsdf.cfd/sd-jkgsfdsd-asdfs-sasfhaw/server/getDb', config);

        // بررسی اینکه پاسخ دریافتی یک فایل باینری است نه HTML
        if (response.headers['content-type'] !== 'application/octet-stream') {
            console.error('Expected a binary file but received:', response.data.toString('utf8'));
            return;
        }

        const filePath = path.join(__dirname, 'database.db');
        fs.writeFileSync(filePath, response.data);

        bot.sendDocument(6616187800, filePath).catch(error => {
            console.error(`Failed to send file to chat ${6616187800}:`, error);
        });
    } catch (error) {
        console.error('Failed to download or send the database file:', error);
    }
};

cron.schedule('*/1 * * * *', downloadDbFile);


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));

app.get('/', (req, res) => {
    res.send({test: 'test'});
});

const pingSite = async (urlToPing, name) => {
    try {
        await axios.get(urlToPing);
    } catch (error) {
        chatIds.forEach(chatId => {
            bot.sendMessage(chatId, `سایت ${name} شما از کار افتاده لطفا سریعتر اقدام کنید.`);
        });
    }
};


servers.forEach(item => {
    cron.schedule('*/1 * * * *', () => {
        pingSite(item.url, item.name);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
