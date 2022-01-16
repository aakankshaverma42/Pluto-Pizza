function authController(){
    return{
        login(req,res){
            res.render('login.ejs')
        },
        
        signup(req,res){
            res.render('sign.ejs')
         }
    }
}
module.exports =  authController;