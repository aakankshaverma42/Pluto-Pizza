//this middleware we actually use for the situation when user is logout and still acesse the login and register  page 
//to overcome and avoid for access we will use the pssport auth logic function middleware

function guest(req,res, next) {
    //if not login then 
    if(!req.isAuthenticated()) {
        return next()
    } 
    //else back kr do home page pr
    return res.redirect('/')
}

module.exports = guest;