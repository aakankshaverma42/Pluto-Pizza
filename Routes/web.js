const homeController =require("../app/Controllers/homeController")//importing the controllers
const authController =require("../app/Controllers/authController")
const cardController = require("../app/Controllers/cardController")
function initRoutes(app){
app.get('/',homeController().index)
    //res.render('home.ejs')


app.get('/card',cardController().card)
    // res.render('card.ejs')


app.get('/login',authController().login)
    // res.render('login.ejs')

app.get('/signup',authController().signup)
    // res.render('sign.ejs')
}
module.exports =initRoutes