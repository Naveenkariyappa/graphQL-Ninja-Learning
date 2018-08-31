const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema')
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

/// allow cross origin requests 
app.use(cors());

mongoose.connect("mongodb://naveenkariyappa:hellonaveen123@ds139722.mlab.com:39722/gql-ninja");
mongoose.connection.once('open',()=>{
    console.log("Connected to database successfully");
});
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true
    })
);

app.listen(4000, () => {
    console.log("Now listening at port 4000");
})