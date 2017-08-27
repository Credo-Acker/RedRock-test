const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var app = express();
app.listen(2333);

app.use(express.static(__dirname + '/build'));

app.use('/index.html', (req, res) => {
	res.sendFile(__dirname + '/build/index.html');
});

let jsonParser = bodyParser.json();
let urlJsonParser = bodyParser.urlencoded();

//1.连接数据库
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    post: 3306,
    password: '123456',
    database: 'test'
});

//2.查询数据库
db.query("SELECT * FROM data;", (erro, data) => {
    if (erro) {
        console.log(erro);
    }
    else {
		console.log(data);
        console.log("数据库连接成功！");
    }
});

//3.接受请求并发送数据
app.get('/forecast', (req, res) => {
    db.query("SELECT * FROM data;", (erro, data) => {
        res.send(data);
    });
});
