const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors=require('cors')
const schema = require("./schema/schema");
const DB_Connection = require('./config/db')

const app = express();

app.use(cors())
DB_Connection()
app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running ${PORT}`);
});