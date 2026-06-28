const menu = document.querySelector(".menu-icon");

const navbar = document.querySelector("#navbar");


if(menu){

menu.onclick = () => {

navbar.classList.toggle("active");

}

}




// SCROLL REVEAL


const sections = document.querySelectorAll("section");


window.addEventListener("scroll",()=>{


sections.forEach(section=>{


const position = section.getBoundingClientRect().top;


if(position < window.innerHeight - 100){


section.classList.add("show");


}


});


});