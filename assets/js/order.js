document.getElementById("orderForm")
.addEventListener("submit", function(e){


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
"Hello Mkanga-Ulimi Farm,%0A%0A" +

"I want to order: " + product +

"%0AQuantity: " + quantity +

"%0AName: " + name +

"%0APhone: " + phone +

"%0ADelivery Location: " + location;



window.open(

"https://wa.me/265XXXXXXXXX?text=" + message

);


});