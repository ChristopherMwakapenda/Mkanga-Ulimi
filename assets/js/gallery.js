// GALLERY IMAGE VIEWER


const galleryImages = document.querySelectorAll(".gallery-grid img");



galleryImages.forEach(image => {



image.addEventListener("click", function(){



// Open image in a new browser tab

window.open(image.src, "_blank");



});



});