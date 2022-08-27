import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());

const user = [];
const tweets = [];
const pageTweets = [];

server.post('/sign-up', (req, res) => {
    user.push(req.body);
    res.send('OK');
});

server.get('/tweets', (req, res) => {
    let page = req.query.page;
    let tweetsOfPage = page * 10;

    if (page < 1){
        res.status(400).send('Informe uma página válida!');
    }

    for (let i = 0; i <= 10; i++){
        if (tweets[tweetsOfPage + i] != null){
            pageTweets.push(tweets[tweetsOfPage + i]); 
        }
    }
    console.log(pageTweets)
    res.send(pageTweets);
});

server.listen(5000, () => console.log('server on'));