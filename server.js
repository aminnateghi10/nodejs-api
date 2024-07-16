const fs = require('fs');
const axios = require('axios');
const cron = require('node-cron');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3000;

const token = '7190281464:AAFO4AVUtDpHJQ8nCm57zHx_kQX43WtPlQY';
const chatIds = ['6083550027'];

const servers = [
    {url: "https://goldenv.bbbbbsdf.cfd/sd-jklad-mcs-sasdew/xui/", name: "ایران 1"},
    {url: "https://cruisevpn.bbbbbsdf.cfd/sd-jkgsfdsd-asdfs-sasfhaw/xui/", name: "ایران 2"},
    {url: "https://goldenvppntel.bbbbbsdf.cfd/xui/", name: "هلند 1"},
]

const bot = new TelegramBot(token, {polling: true});

const downloadDbFile = async () => {
    try {
        const response = await axios.get('https://goldenv.bbbbbsdf.cfd/sd-jklad-mcs-sasdew/server/getDb', { responseType: 'arraybuffer' });

        // بررسی اینکه پاسخ دریافتی یک فایل باینری است نه HTML
        if (response.headers['content-type'] !== 'application/octet-stream') {
            console.error('Expected a binary file but received:', response.data.toString('utf8'));
            return;
        }

        const filePath = path.join(__dirname, 'database.db');
        fs.writeFileSync(filePath, response.data);

        chatIds.forEach(chatId => {
            bot.sendDocument(chatId, filePath).catch(error => {
                console.error(`Failed to send file to chat ${chatId}:`, error);
            });
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
    cron.schedule('*/3 * * * *', () => {
        pingSite(item.url, item.name);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



