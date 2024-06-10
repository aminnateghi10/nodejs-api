const express = require('express');
const axios = require("axios");
var bodyParser = require('body-parser');
const qs = require('qs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));

app.get('/', (req, res) => {
    res.send({ name: 'amin', age: 22, lastName: 'nateghi' });
});

app.post('/login', async (req, res) => {
    let data = qs.stringify({
        'username': 'jksalk;jfaewk#$%^&**(',
        'password': '&*&^%&^JHEFGewygfouifaljkhshddf'
    });

    try {
        let clientData = await axios.post('https://goldenv.bbbbbsdf.cfd/sd-jklad-mcs-sasdew/login', data);
        res.json(clientData.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/addClient', async (req, res) => {
    let myData = req.body;
    const axios = require('axios');
    const FormData = require('form-data');
    let data = new FormData();
    data.append('id', myData.id);
    data.append('settings', myData.settings);

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://goldenv.bbbbbsdf.cfd/sd-jklad-mcs-sasdew/xui/inbound/addClient',
        headers: {
            'Cookie': 'session=MTcxNzI3MTg5N3xEWDhFQVFMX2dBQUJFQUVRQUFCbF80QUFBUVp6ZEhKcGJtY01EQUFLVEU5SFNVNWZWVk5GVWhoNExYVnBMMlJoZEdGaVlYTmxMMjF2WkdWc0xsVnpaWExfZ1FNQkFRUlZjMlZ5QWYtQ0FBRURBUUpKWkFFRUFBRUlWWE5sY201aGJXVUJEQUFCQ0ZCaGMzTjNiM0prQVF3QUFBQS1fNEk3QVFJQkZXcHJjMkZzYXp0cVptRmxkMnNqSkNWZUppb3FLQUVmSmlvbVhpVW1Ya3BJUlVaSFpYZDVaMlp2ZFdsbVlXeHFhMmh6YUdSa1pnQT18d1GvvxTv-6KIEyaqBfmVpbCh6EXFkevBl_oOvWPmXyg=',
        },
        data: data
    };

    try {
        let response = await axios.request(config);
        console.log(JSON.stringify(response.data));
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

const TelegramBot = require('node-telegram-bot-api');

// Telegram bot token
const token = '6793107890:AAG5cYgfFA-KDNGFRutNPxEn0utID-azMZU';

// List of chat IDs
const chatIds = ['6083550027', '6616187800', '5205253618']; // Add more chat IDs as needed
const urlToPing = 'https://goldenv.bbbbbsdf.cfd/sd-jklad-mcs-sasdew/xui/'; // URL to ping

const bot = new TelegramBot(token, { polling: true });

// Function to ping the site
const pingSite = async () => {
    try {
        const response = await axios.get(urlToPing);
        console.log(`Site is up. Status: ${response?.status}`);
    } catch (error) {
        console.log('Site is down');
        chatIds.forEach(chatId => {
            bot.sendMessage(chatId, 'سایت شما از کار افتاده است لطفا سریعتر اقدام کنید.');
        });
    }
};

// Ping the site every 5 minutes
setInterval(pingSite, 300000); // 300000 ms = 5 minutes

// Welcome message to confirm the bot is running
bot.onText(/\/start/, (msg) => {
    chatIds.forEach(chatId => {
        bot.sendMessage(chatId, 'Monitoring started.');
    });
});

console.log('Bot is running...');

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
