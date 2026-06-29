// MKANGA-ULIMI MOBILE MENU


const menuIcon = document.querySelector(".menu-icon");

const navbar = document.querySelector("#navbar");


if(menuIcon && navbar){


menuIcon.addEventListener("click",()=>{


navbar.classList.toggle("active");


});


}
