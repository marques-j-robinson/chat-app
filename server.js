const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const messages = [
    {name: "Tim", message: "yo"},
    {name: "Pam", message: "hi"}
]

app.get('/messages', (req, res) => {
    res.send(messages);
})

app.post('/message', (req, res) => {
    messages.push(req.body);
    res.sendStatus(200);
})

io.on('connection', () => {
    console.log('a user connected');
});

const server = http.listen(3000, () => {
    const {port} = server.address();
    console.log(`Listening on port ${port}`);
});
