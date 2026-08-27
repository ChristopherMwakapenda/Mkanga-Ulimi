// CONTACT FORM HANDLER

const contactForm = document.querySelector("form");


if(contactForm){


contactForm.addEventListener("submit", function(e){


e.preventDefault();



// Get form values

let name = document.querySelector("input[type='text']").value;

let email = document.querySelector("input[type='email']").value;

let message = document.querySelector("textarea").value;




// Create WhatsApp message

let whatsappMessage =

"Hello Mkanga-Ulimi Farm,%0A%0A" +

"Name: " + name +

"%0AEmail: " + email +

"%0AMessage: " + message;





// Open WhatsApp


window.open(

"https://wa.me/265999826757?text=" + whatsappMessage

);



});



}