const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')
function init(passport){
 passport.use(new LocalStrategy({usernameField: 'email'}, async(email, password, done) => {
    //Login

    //Check if email exists
    const user = await User.findOne({email: email})
    if(!user) {
        return done(null, false, {message: 'No user with this email'})
    }

     bcrypt.compare(password,user.password).then(match => {
        if(match) {
            return done(null, user, {message: 'Logged in successfully'})
        }

        return done(null, false, {message: 'Wrong username or password'})
     }).catch(err => {
        return done(null,false, {message: 'Something went wrong'})
     })
 }))

 //this method is used to store any thing in session for verification  that whether the user is logined before or not which maybe id or something else
 //passport provide a chance of whatever we wish to store in session .
 passport.serializeUser((user, done) => {
    done(null, user._id)
 })

 //esmai hm jo store session m data h usko kis way m get krna hai ye hota hai
 //mean yaha hm receive krte hai data ko
 passport.deserializeUser((id,done) => {
    User.findById(id, (err,user) => {
       done(err,user)
    })
 })

}

module.exports = init