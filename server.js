//서버용
const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const app = express();
const models = require('./models');
const sequelize = require('./models').sequelize;
sequelize.sync();
const fs = require('fs')
const bodyParser = require('body-parser');
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
    let re = require('./record.json')
    let re2 = require('./record2.json')

    let { transport, food, etc } = re;
    let { Pinmoney, Salary, etc2 } = re2;

    res.render('main', { transport: transport, food: food, etc: etc, Pinmoney : Pinmoney, Salary : Salary, etc2 : etc2 })
});

app.post('/sendExpend', (req, res) => {
    const { expend, type } = req.body;
    var re = require('./record.json')
    switch (type) {
        case 'transport':
            re.transport += Number(expend)
            break;
        case 'food':
            re.food += Number(expend)
            break;
        case 'etc':
            re.etc += Number(expend)
            break;
    }
    fs.writeFileSync('./record.json', JSON.stringify(re));
    res.redirect('/')
})

app.post('/sendIncome', (req, res) => {
    const { income, type2 } = req.body;
    var re2 = require('./record2.json')
    switch (type2) {
        case 'Pinmoney':
            re2.Pinmoney += Number(income)
            break;
        case 'Salary':
            re2.Salary += Number(income)
            break;
        case 'etc2':
            re2.etc2 += Number(income)
            break;
    }
    fs.writeFileSync('./record2.json', JSON.stringify(re2));
    res.redirect('/')
})




app.listen(3000, () => {
    console.log("Start main server")
})

