const express = require('express');

const axios = require("axios");
var bodyParser = require('body-parser');

const qs = require('qs');
const app = express();
const port = 3000;

app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: "application/json"}));
// app.use(validationResult());

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({name: 'amin', age: 22, lastName: 'nateghi'});
});

app.post('/login', async (req, res) => {
    let data = qs.stringify({
        'username': 'jksalk;jfaewk#$%^&**(',
        'password': '&*&^%&^JHEFGewygfouifaljkhshddf'
    });

    let clientData = await axios.post('https://goldenv.bbbbbsdf.cfd/sd-jklad-mcs-sasdew/login', data);
    res.json(clientData.data);
});

app.post('/addClient', async (req, res) => {
    let myData = req.body;
    const axios = require('axios');
    // const FormData = require('form-data');
    let data = new FormData();
    data.append('id', myData.id);
    console.log(data, 'data')
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

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res.json(response.data)
        })
        .catch((error) => {
            console.log(error);
            res.json(error)
        });
});


const TelegramBot = require('node-telegram-bot-api');

// توکن ربات تلگرام خود را جایگزین کنید
const token = '6793107890:AAG5cYgfFA-KDNGFRutNPxEn0utID-azMZU';
const chatId = '6083550027'; // شناسه چت کاربری که میخواهید پیام بگیرد
const urlToPing = 'https://goldenv.bbbbbsdf.cfd/sd-jklad-mcs-sasdew/xui/'; // آدرس سایت برای پینگ

const bot = new TelegramBot(token, {polling: true});

// تابع برای پینگ گرفتن از سایت
const pingSite = async () => {
    try {
        const response = await axios.get(urlToPing);
        console.log(`Site is up. Status: ${response?.status}`);
    } catch (error) {
        console.log('Site is down');
        bot.sendMessage(chatId, 'The site is down!');
    }
};

// پینگ گرفتن هر ۵ دقیقه یک بار
setInterval(pingSite, 5 * 60 * 1000);

// پیام خوش آمدگویی برای تایید فعال بودن ربات
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(chatId, 'Monitoring started.');
});

console.log('Bot is running...');


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
