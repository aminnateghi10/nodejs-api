const app = require('express')();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
global.config = require('./modules/config');

// Connect to DB
mongoose.connect('mongodb://localhost:27017/nodejs-api');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, required:true}
});

const userModel = mongoose.model('User', UserSchema);

new userModel({
    name: "amin"
}).save();
//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({type: "application/json"}));
// app.use(validationResult());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(function (req, res) {
//     res.setHeader('Content-Type', 'text/plain')
//     res.write('you posted:\n')
//     res.end(JSON.stringify(req.body, null, 2))
// })
const apiRouter = require('./modules/routes/api');


app.use('/api', apiRouter);

app.listen(config.port, () => {
    console.log(`Server running at port ${config.port}`);
})
