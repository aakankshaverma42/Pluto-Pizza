const  populate  = require("../../models/order");
const order = require("../../models/order");
// const Order = require('../../models/order')

function orderController() {
    return {
        index(req,res){
         order.find({status: { $ne: 'completed'}}, null, {sort: {'createdAt': -1}}). // sort in the decending order
         populate('customerId', '-password').exec((err,orders) => { //populate function is used so that we use that customerId and inplace of the that we can display the details of the customers but not passwod
            //yaha hme ajax call krna parega
            if(req.xhr) {
                return res.json(orders)
            }else {
               return  res.render('admin/orders')
            }  
         })   
        }
    }
}

module.exports = orderController;