// =========================================
// MKANGA-ULIMI MOBILE MENU
// =========================================

const menuIcon = document.querySelector(".menu-icon");
const navbar = document.querySelector("#navbar");

if (menuIcon && navbar) {
    menuIcon.addEventListener("click", () => {
        navbar.classList.toggle("active");
    });
}

// =========================================
// HERO SLIDER
// =========================================

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let currentSlide = 0;
let sliderInterval;

// Show Slide
function showSlide(index) {

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    currentSlide = index;
}

// Next Slide
function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);
}

// Previous Slide
function prevSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
}

// Start Slider
function startSlider() {

    sliderInterval = setInterval(() => {

        nextSlide();

    }, 5000);

}

// Stop Slider
function stopSlider() {

    clearInterval(sliderInterval);

}

// Buttons
if (nextBtn) {

    nextBtn.addEventListener("click", () => {

        nextSlide();

        stopSlider();
        startSlider();

    });

}

if (prevBtn) {

    prevBtn.addEventListener("click", () => {

        prevSlide();

        stopSlider();
        startSlider();

    });

}

// Dots
dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        showSlide(index);

        stopSlider();
        startSlider();

    });

});

// Pause On Hover
const heroSlider = document.querySelector(".hero-slider");

if (heroSlider) {

    heroSlider.addEventListener("mouseenter", stopSlider);

    heroSlider.addEventListener("mouseleave", startSlider);

}

// Mobile Swipe
let touchStartX = 0;
let touchEndX = 0;

if (heroSlider) {

    heroSlider.addEventListener("touchstart", e => {

        touchStartX = e.changedTouches[0].screenX;

    });

    heroSlider.addEventListener("touchend", e => {

        touchEndX = e.changedTouches[0].screenX;

        if (touchStartX - touchEndX > 50) {

            nextSlide();

        }

        if (touchEndX - touchStartX > 50) {

            prevSlide();

        }

        stopSlider();
        startSlider();

    });

}

// Keyboard Navigation
document.addEventListener("keydown", e => {

    if (e.key === "ArrowRight") {

        nextSlide();

        stopSlider();
        startSlider();

    }

    if (e.key === "ArrowLeft") {

        prevSlide();

        stopSlider();
        startSlider();

    }

});

// Initialize
if (slides.length > 0) {

    showSlide(0);

    startSlider();

}

// Sticky Header

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 80){

        header.classList.add("scrolled");

    }else{

        header.classList.remove("scrolled");

    }

});

/*==========================================
 SERVICES PAGE SLIDER
==========================================*/

const serviceSlides = document.querySelectorAll(".service-slide");
const serviceDots = document.querySelectorAll(".service-dot");
const servicePrev = document.querySelector(".service-prev");
const serviceNext = document.querySelector(".service-next");

if(serviceSlides.length > 0){

let currentService = 0;

function showServiceSlide(index){

    serviceSlides.forEach(slide=>{
        slide.classList.remove("active");
    });

    serviceDots.forEach(dot=>{
        dot.classList.remove("active");
    });

    serviceSlides[index].classList.add("active");
    serviceDots[index].classList.add("active");

}

function nextService(){

    currentService++;

    if(currentService >= serviceSlides.length){
        currentService = 0;
    }

    showServiceSlide(currentService);

}

function previousService(){

    currentService--;

    if(currentService < 0){
        currentService = serviceSlides.length - 1;
    }

    showServiceSlide(currentService);

}

serviceNext.addEventListener("click",()=>{

    nextService();

});

servicePrev.addEventListener("click",()=>{

    previousService();

});

serviceDots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentService = index;

        showServiceSlide(currentService);

    });

});

setInterval(()=>{

    nextService();

},5000);

}