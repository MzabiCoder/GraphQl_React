const express = require('express')
const graphqlHTTP=require('express-graphql')
const app = express()

app.use("/graphql", graphqlHTTP({
    
}))








const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is up and running ${PORT}`);
    
})