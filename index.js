import express from "express";
import redis from "redis";
import process from "process";

const app = express();
const client = redis.createClient({
    host: 'redis-server',
    port:6379
});
client.set('visits', 0);

app.get('/',  (req, res) => {
    client.get('visits', (err, visits) => {
        if(err){
            return res.status(500).send(`Erro: ${err.message}`);
        }
        res.send(`Number of visits is ${Number(visits)}`);
        client.set('visits', Number(visits) + 1);
        });
});

app.listen(8081, () => {
    console.log(`Listening on port 8081`);
})