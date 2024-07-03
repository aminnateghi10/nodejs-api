const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3000;

// Telegram bot token and chat IDs
const token = '7190281464:AAFO4AVUtDpHJQ8nCm57zHx_kQX43WtPlQY';
const chatIds = ['6083550027', '6616187800', '5205253618']; // Add more chat IDs as needed
const urlToPing = 'https://goldenvppntel.bbbbbsdf.cfd/xui/'; // URL to ping
const text = 'سایت هلند 1 شما از کار افتاده لطفا سریعتر اقدام کنید.'; // Send Err text

const bot = new TelegramBot(token, {polling: true});

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));

// Route setup
app.get('/', (req, res) => {
    res.send({test: 'test'});
});

// Function to ping the site
const pingSite = async () => {
    try {
        const response = await axios.get(urlToPing);
    } catch (error) {
        chatIds.forEach(chatId => {
            bot.sendMessage(chatId, text);
        });
    }
};

// Ping the site every 5 minutes
setInterval(pingSite, 300000); // 300000 ms = 5 minutes

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
