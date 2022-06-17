const express =  require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2121;
require('dotenv').config();
const cors = require('cors');
const { restart } = require('nodemon');
app.use(cors())

let db,
dbConnectionString = process.env.DB_STRING,
dbName = 'courses-db';

MongoClient.connect(dbConnectionString,{useUnifiedTopology: true})
.then(client=>{
    console.log(`connected to ${dbName} Database`);
    db = client.db(dbName);
})

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.render('index.ejs')
})

app.get('/add',(req,res)=>{
    res.render('add.ejs')
})

app.get('/fetch',(req,res)=>{
    db.collection('courses').find().sort({id: 1}).toArray()
    .then(data=>{
        res.render('fetch.ejs',{courses:data})
    })
    .catch(error=>console.error(error))
})

app.get('/update',(req,res)=>{
    res.render('update.ejs');
})

app.get('/delete',(req,res)=>{
    res.render('delete.ejs')
})
app.post('/addCourse',(req,res)=>{
    db.collection('courses').insertOne({id:req.body.id,name:req.body.name,description: req.body.description,amount: req.body.amount})
    .then(result=>{
        console.log('Course Added')
        res.redirect('/add')
    })
})

app.put('/update',(req,res)=>{
    db.collection('courses').updateOne({id:req.body.id},{
        $set:{
            amount:req.body.amount
        }
    },{
        sort:{ _id: -1},
        upsert: true,
    })
    .then(result=>{
        //console.log('Updated amount')
        res.json('Updated amount');
    })
    .catch(error=> console.error(error))
})

app.delete('/delete',(req,res)=>{
    console.log(req.body)
    res.json("deleted")
})



app.listen(process.env.PORT || PORT,()=>{
console.log(`Server is running on port ${PORT}`)
})