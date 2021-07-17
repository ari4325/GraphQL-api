const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { rootQuery } = require('./queries/bookQuery.js')
const connectDB = require('./connection');
const { login, register } = require('./routes/auth');
const verify = require('./verifyToken');

require('dotenv').config()

connectDB();

const app = express();
const port = process.env.port || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/user', login);
app.post('/user', register);
app.use('/root', verify, graphqlHTTP({
    schema: rootQuery,
    graphiql:true
}));

app.listen(port, () => {
    console.log('Listening on port '+port);
}); 
