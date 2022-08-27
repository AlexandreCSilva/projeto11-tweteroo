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
    console.log(page)

    if (page < 1){
        res.status(400).send('Informe uma página válida!');
    }

    for (let i = 10; i >= 0; i--){
        console.log(tweetsOfPage - i)
        if (tweets[tweetsOfPage - i] != null){
            pageTweets.push(tweets[tweetsOfPage - i]); 
        }
    }
    
    console.log(pageTweets)
    res.send(pageTweets);
});

server.post('/tweets', (req, res) => {
    let tweet = {
        user: req.headers.user,
        tweet: req.body.tweet
    }
    console.log(tweet)
    tweets.push(tweet);
    res.send('OK');
});

server.listen(5000, () => console.log('server on'));