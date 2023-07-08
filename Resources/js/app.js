import axios from 'axios' //here use of AJAX

//Noty module is added because hm chahte h ki jab koi bhi item add ho cart m tho 
//fir side m nodificationa bhi aata rhe 
//jis page m dekhna hota hai notification wala import krte h

import Noty from "noty";

let addToCart = document.querySelectorAll('.add-to-cart')

let cartCounter = document.querySelector('#cartCounter') //YAHA YE WOO CART K AAGE DISPLAY HOGA 
//AJAX call krne k liye ya tho hm fetch method ko use kr skte hai ya fir hm yaha ek library use kr rhe  axios 
function update(pizza){
    axios.post('/update-cart',pizza).then(res =>{
        //THIS CODE IS FOR ADDING THE ITEMS IN THE CART AND DISPLAY IN THE HOME SCRREN WALA CART IMG
        cartCounter.innerText = res.data.totalQty
        
        //hm chahte h ki add ho tab noti aaye
        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item added to cart",
            progressBar: false,
            //for chnge in direction of appreance
            // layout: 'topLeft'
          }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: "Something went wrong",
            progressBar: false,
            //for chnge in direction of appreance
            // layout: 'topLeft'
          }).show(); 
    })
} 

//event listening 

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) =>{
                //convert in object
        let pizza = JSON.parse(btn.dataset.pizza)
        update(pizza)
        console.log(pizza)
    })
})