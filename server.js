const express = require('express')
const mongoose = require('mongoose')
const app = express()
const ejs = require('ejs')
const path = require('path')
// const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3300

//Assert
app.use(express.static('public '))
const url = "mongodb://localhost:27017/pizza"
mongoose.connect(url);
mongoose.connection.on("connection",() =>{
    console.log("connected to mongodb");

});
//set template engine
// app.use(expressLayout)
app.set('views',path.join(__dirname ,'views'))
app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.urlencoded({extended : false}))

app.get('/',(req,res)=> { 
    res.render('home.ejs')
})

app.get('/card',(req,res)=>{
    res.render('customers/card')
}) 

app.get('/login',(req,res)=>{
    res.render('login.ejs')
})

app.get('/signup',(req,res)=>{
    res.render('sign.ejs')
})

app.post('/login',(req,res) =>{ 
    res.render('login.ejs')
})

app.post('/signup',(req,res) =>{ 
    res.render('signup.ejs')
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