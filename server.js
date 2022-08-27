import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());

const user = [];
const tweet = [];

server.post('/sign-up', (req, res) => {
    user.push(req.body);
    res.send(user);
});

server.listen(5000, () => console.log('server on'));