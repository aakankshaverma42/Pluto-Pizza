const Order = require('../models/order')
const moment  = require('moment')

function orderController() {
    return {
        store(req,res) {
         const {phone, address} = req.body
         if(!phone || !address) {
            req.flash('error', 'All fields are required')
            return res.redirect('/cart')
         }

         const order = new Order({
           customerId: req.user._id,
           items: req.session.cart.items,
           phone,
           address 
         })

         order.save().then(result => {
            Order.populate(result, {path: 'customerId'}, (err, placedOrder) => {
               req.flash('success' , 'Order placed successfully')
               //cart delete ho jaye uske liye hm
               delete req.session.cart

                          //Emit 
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderPlaced',placedOrder )

            return res.redirect('/customers/orders')
         })
         }).catch(err => {
            req.flash('error' , 'Something went wrong')
            return res.redirect('/cart')
         })
        }, 
            
        // this function basically fetch the orders form the db 
        async index(req,res) {
         const orders = await Order.find({ customerId: req.user._id },
            null,
            //this line of code is written so that jab hm back button pr jaye tho hme koi cache nhi chahiye (like woo green wla bar jo order list page pr show hota hai customer k)
             {sort: { 'createdAt': -1 }})
             res.header('Cache-Contro', 'no-cache, private, no-store, must-revalidate, max-stale = 0, post-check = 0, pre-check = 0')
             res.render('customers/orders', {orders: orders,moment: moment})
         // console.log(orders)
        },

        //show 

        async show(req,res) {
         const order = await Order.findById(req.params.id)

         //Authorize user
         if(req.user._id.toString() === order.customerId.toString()) { //here we have use toString() method beacause we cannot coampre the two object of same type 
            return res.render('customers/singleOrder', { order })
         }
         return res.redirect('/')
         }
        }
    }

module.exports = orderController