const express = require('express')

const app = express()
const ejs = require('ejs')
const path = require('path')
const { connected } = require('process')

const PORT = process.env.PORT || 3300
const mongoose = require('mongoose')
//Database connection
mongoose.connect('mongodb://localhost:27017/pizza', {
    dbName: 'event_db',
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, err => err ? console.log(err) : console.log('Connected to database'));


//set template engine
app.set('views',path.join(__dirname ,'views'))
app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({extended : false}))
require('./routes/web')(app)

app.post('/login',(req,res) =>{ 
    res.render('login.ejs')
})

app.post('/signup',(req,res) =>{ 
    res.render('signup.ejs')
})

app.post('/card',(req,res) =>{ 
    res.render('card.ejs')
})

app.post("/signup", function (req, res) {
    const signupSchema = signupModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
     
    })
})

app.listen(PORT,()=> {
    console.log('Listening to port ${PORT}')
})