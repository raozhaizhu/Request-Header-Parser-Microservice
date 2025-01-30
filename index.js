// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
    res.json({ greeting: 'hello API' });
});

// 对whoami之API的实现
app.get('/api/whoami', function (req, res) {
    // 获取用户IP地址,放在ipaddress键下
    const ipaddress = req.ip || req.headers['x-forwarded-for'];
    // 获取用户语言信息,放在language键下
    const language = req.headers['accept-language'].split(',')[0];
    // 获取用户操作系统和浏览器信息,放在software键下
    const software = req.headers['user-agent'];
    // 组装后,发送响应数据
    res.json({
        ipaddress: ipaddress,
        language: language,
        software: software,
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});

