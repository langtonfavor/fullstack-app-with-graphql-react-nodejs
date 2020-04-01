const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolver/index')
const isAuth = require('./middleware/is-Auth');

const Booking = require('./models/booking');
const app =  express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if(req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use(
    '/graphql',
    graphqlHttp({
        schema:graphQlSchema,
        rootValue:graphQlResolvers,

    graphiql: true
    })
);
// connect to mongo atlas ......
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00-yiuox.mongodb.net:27017,cluster0-shard-00-01-yiuox.mongodb.net:27017,cluster0-shard-00-02-yiuox.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`).then(() => {
app.listen(3000);
// catch exception if connection failed
}).catch(err => {
    console.log(err);
});
