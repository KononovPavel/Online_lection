const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');
const posts = require('./routes/posts');


const app = express();

const port = 3000;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);



app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
//подключение к базе данных
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log("Мы успешно подключились к БД");
});

mongoose.connection.on('error', (err) => {
  console.log("Мы не подключились к БД: " + err);
});

app.get('/', (req, res) => {
  res.send('Главная страница сайта!!!');
});
//переход по аккаунту, где открывается папка account
app.use('/account', account);


app.listen(port, () => {
  console.log("Сервер был запущен по порту: " + port);
});
app.use('/post', posts);