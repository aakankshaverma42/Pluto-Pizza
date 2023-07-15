import axios from 'axios' //here use of AJAX

//Noty module is added because hm chahte h ki jab koi bhi item add ho cart m tho 
//fir side m nodificationa bhi aata rhe 
//jis page m dekhna hota hai notification wala import krte h

import Noty from "noty";
import { initAdmin } from './admin';
import moment from 'moment'

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
        // console.log(pizza)
    })
})

//Remove alert message after x seconds

const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    },2000)
}

// Change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}

updateStatus(order);
// initAdmin() 


// Socket
let socket = io()
// initAdmin(socket) 

// // Join
if(order) {
    socket.emit('join', `order_${order._id}`)
}

// //to identify admin hai ya nhi
let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')) {
    initAdmin(socket)
    socket.emit('join', 'adminRoom')
}


socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }  //to copy the object in javascript we write( ...)
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    // console.log(data)
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
})   