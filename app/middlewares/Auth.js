//this middleware is only for the logined person who can visit not other guest can visit the order page

function Auth(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }

    return res.redirect('/login')
}

module.exports = Auth