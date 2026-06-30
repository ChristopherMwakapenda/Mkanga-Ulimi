document
.getElementById("orderForm")
.addEventListener("submit",function(e){


e.preventDefault();



let product =
document.getElementById("product").value;


let quantity =
document.getElementById("quantity").value;


let name =
document.getElementById("name").value;


let phone =
document.getElementById("phone").value;


let location =
document.getElementById("location").value;




let message =

`Hello Mkanga-Ulimi Farm 🌱

I would like to order:

Product: ${product}

Quantity: ${quantity}

Customer: ${name}

Phone: ${phone}

Location: ${location}`;




let whatsapp =

"https://wa.me/265999826757?text="

+ encodeURIComponent(message);



window.open(whatsapp,"_blank");



});