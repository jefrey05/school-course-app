const express =  require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2121;
require('dotenv').config();

let db,
dbConnectionString = process.env.DB_STRING,
dbName = 'courses-db';

MongoClient.connect(dbConnectionString,{useUnifiedTopology: true})
.then(client=>{
    console.log(`connected to ${dbName} Database`)
})

app.listen(process.env.PORT || PORT,()=>{
console.log(`Server is running on port ${PORT}`)
})