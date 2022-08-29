import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());

const user = [];
const tweets = [];
const pageTweets = [];
let avatar = '';

const isValidUrl = url=> {
    try { 
        return Boolean(new URL(url)); 
    }
    catch(e){ 
        return false; 
    }
}

server.post('/sign-up', (req, res) => {
    user.push(req.body);
    
    avatar = user[0].avatar;

    if (avatar.length === 0 || isValidUrl(avatar) === false || user[0].username.length === 0){
        res.sendStatus(400);
        console.log('Todos os campos são obrigatórios! Digite dados válidos!');
    } else {
        res.status(201).send('OK');
    }
});

server.get('/tweets', (req, res) => {
    let page = req.query.page;
    let tweetsPageStart = (page * 10) - 10;
    let tweetsPageEnd = page * 10;

    if (page < 1){
        res.sendStatus(400);
        console.log('Informe uma página válida!');
    }
    
    pageTweets.splice(0,pageTweets.length);

    for (let i = tweetsPageStart; i < tweetsPageEnd; i++){
        if (tweets[i] != null){
            pageTweets.push(tweets[i]); 
        }
    }
    
    res.send(pageTweets);
});


server.get('/tweets/:name', (req, res) => {
    let name = req.params.name;

    pageTweets.splice(0,pageTweets.length);

    for (let i = 0; i < tweets.length; i++){
        if (tweets[i].username === name){
            pageTweets.push(tweets[i]); 
        }
    }

    res.send(pageTweets);
});

server.post('/tweets', (req, res) => {
    let tweet = {};

    tweet = {
        username: req.headers.user,
        avatar: avatar,
        tweet: req.body.tweet
    }

    if (tweet.tweet === ''){
        res.sendStatus(400);
        console.log('O tweet não pode estar vazio!');
    } else {
        tweets.unshift(tweet);
        res.status(201).send('OK');
    }
});

server.listen(5000, () => console.log('server on'));