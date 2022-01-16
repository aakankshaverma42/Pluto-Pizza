function cardController(){
    return{
        card(req,res){
            res.render('card.ejs')
        }
    }
}
module.exports =  cardController;