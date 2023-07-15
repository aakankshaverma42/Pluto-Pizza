const User = require('../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController(){

    //checking whether user role is admin or customer for hte purpose of visiting the page
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customers/orders'
    }

    return{
        login(req,res){
            return res.render('auth/login')
        },

        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message)
                    return next(err)
                }

                if(!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.login(user, (err) => {
                    if(err){
                      req.flash('error', info.message)
                      return next(err)  
                    }
//after login hi hme user to check krna hai ki woo admin h tho admin page pr jaa ske and nhi tho home page 
                  return res.redirect(_getRedirectUrl(req))
                    // return res.redirect('/')
                })
            })(req,res,next) //passport.authenticate return a function which we call at the end 
        },
        
        register(req,res){
           return  res.render('auth/register')
         },

         async postRegister(req,res) {
         const { name, email, password }  = req.body
         //Validator request
         if(!name || !email || !password){

            req.flash('error', 'All fields are required')
            req.flash('name', name)
            req.flash('email', email)

            return res.redirect('/register')
         }
         
         //Check if email exists

         User.exists({email: email}, (err, result) => {
            if(result) {
            req.flash('error', 'Email already taken') 
            req.flash('name', name)
            req.flash('email', email)

            return res.redirect('/register') //if responce will not be sended then the buffering will happen
            }
         })


         //Hash password
          const hashedPassword = await bcrypt.hash(password, 10)

         //create a user on db
         const user = new User({
            name,
            email,
            password: hashedPassword
           })

         user.save().then((user) => {
           //Login
            return res.redirect('/')
         }).catch(err => {
            req.flash('error', 'Something went wrong')
            return res.redirect('/register')
         })
         },


         //new
       logout(req,res){ 
         req.logout(function(err) {
            if (err) {
              // handle error
            } else {
                return res.redirect('/login')
              // handle successful logout
            }
          });
    }
}
}
module.exports =  authController;