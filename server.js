//To acces the dotenv file
require('dotenv').config();

const express = require('express')

const app = express()
// const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')

const PORT = process.env.PORT || 3300
 
const mongoose = require('mongoose')
const session = require('express-session');
const  flash = require('express-flash')
const MongoStore = require('connect-mongo'); //it is used to store the session in db
const passport = require('passport');
const Emitter = require('events')


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

//Event emitter
const eventEmitter = new Emitter()//emiter basically  help in the place where it is needed it get emitted
app.set('eventEmitter',eventEmitter )
// //session store

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_DB_NAME  //(URI FROM.env file)
  })
}));

//Passport config
const passportInit = require('./app/config/passport');
const order = require('./app/models/order');
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash()); // remember without flash session request will not send to db

//Assert
app.use(express.static('public'))
app.use(express.urlencoded({extended : false}))
app.use(express.json())


//Global middleware ---so that the session can be also defined in html page 
app.use((req,res,next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  next();
})
//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname ,'/Resources/views'))
app.set('view engine','ejs')

require('./routes/web')(app)
//for 404 handling 
app.use((req,res) => {
 res.status(404).render('errors/404.ejs')
})

 const server = app.listen(PORT,()=> {
    console.log(`Listening to port ${PORT}`)
})

// Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
//       // Join
// console.log(socket.id)
      socket.on('join', (orderId) => {
        // console.log(orderId)
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})