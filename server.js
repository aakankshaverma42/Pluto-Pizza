//To acces the dotenv file
require('dotenv').config();

const express = require('express')

const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')

const PORT = process.env.PORT || 3300
 
const mongoose = require('mongoose')
const session = require('express-session');
const  flash = require('express-flash')
const MongoStore = require('connect-mongo'); //it is used to store the session in db


// Database connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB_NAME, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("Connection to MongoDb is successful");
}).catch((e) => {
    console.log("No connection");
});


//session store

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_DB_NAME  //(URI FROM.env file)
  })
}));

app.use(flash()); // remember without flash session request will not send to db

//Assert
app.use(express.static('public'))
app.use(express.json())


//Global middleware ---so that the session can be also defined in html page 
app.use((req,res,next) => {
  res.locals.session = req.session
  next();
})
//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname ,'/Resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)



// app.use(express.urlencoded({extended : false}))





// app.post("/signup", function (req, res) {
//     const signupSchema = signupModel({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
     
//     })
// })

app.listen(PORT,()=> {
    console.log(`Listening to port ${PORT}`)
})