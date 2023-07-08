const homeController =require("../app/Controllers/homeController")
const authController =require("../app/Controllers/authController")
const cartController = require("../app/Controllers/cartController")
function initRoutes(app){

    app.get('/',homeController().index)
    //res.render('home.ejs')
    
    app.get('/cart',cartController().cart)
    
    
    app.get('/login',authController().login)
    
    app.get('/register',authController().register)

    app.post('/update-cart', cartController().update)

}
module.exports =initRoutes