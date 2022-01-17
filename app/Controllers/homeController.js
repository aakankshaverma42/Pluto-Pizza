const Menu = require('../../models/menu')

function homeController(){
    return{
      index(req,res){
        //  const pizzas = await Menu.find()
        //  console.log(pizzas)
        //  return res.render('home',{pizzas:pizzas })
            Menu.find({}).then(function(pizzas){
                console.log("homecontroller 10",pizzas)
                return res.render('home.ejs',{pizzas:pizzas})
           })
            
        }
    }
}

module.exports =  homeController;