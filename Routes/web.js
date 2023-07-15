const homeController =require("../app/Controllers/homeController")
const authController =require("../app/Controllers/authController")
const cartController = require("../app/Controllers/cartController")
const orderController = require('../app/Controllers/orderController')
const AdminOrderController = require('../app/Controllers/admin/orderController')
const statusController = require('../app/Controllers/admin/statusController')

// Middleware routes
const guest = require('../app/middlewares/guest')
const auth = require('../app/middlewares/Auth')
const admin = require('../app/middlewares/admin')


function initRoutes(app){

    app.get('/',homeController().index)
    //res.render('home.ejs')
    
    app.get('/login',guest,authController().login) //guest middleware use krke hm fir resist kr paynge ki user without logout login page and register page pr nah jaa paye bilki home page pr hi redirect ho jaye

    app.post('/login',authController().postLogin)
    
    app.get('/register',guest, authController().register)
    
    app.post('/register',authController().postRegister)

    app.post('/logout', authController().logout)

    app.get('/cart',cartController().cart)

    app.post('/update-cart', cartController().update)

    //Customer routes
    app.post('/orders',orderController().store)
    //this is used for fetching the data array of all orders from db
    app.get('/customers/orders',auth, orderController().index)
    app.get('/customers/orders/:id',auth, orderController().show)

    //Admin routes
    app.get('/admin/orders',admin,AdminOrderController().index)
    app.post('/admin/order/status',admin,statusController().update)

}

module.exports =initRoutes