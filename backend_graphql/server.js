const express = require('express');
const mongoose = require('mongoose');

const typeDefs = require('./schema');
const resolvers = require('./resolver');

const {ApolloServer} = require('apollo-server-express');

const app = express();

//TODO - Replace you Connection String here
const DB_USER = 'sa';
const DB_USER_PASSWORD = 'UPDATE_YOUR_PASSWORD';
const DB_CLUSTER = 'cluster0.7wn4nmp.mongodb.net';
const DB_NAME = 'w2024_comp3133s';
const mongodb_atlas_url = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongodb_atlas_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(success => {
    console.log('Success Mongodb connection')
}).catch(err => {
    console.log('Error Mongodb connection')
});



async function startServer() {

    const server = new ApolloServer({ 
        typeDefs, 
        resolvers: [resolvers]
    });
    await server.start();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
}

startServer();

 