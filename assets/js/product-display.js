const container =
document.getElementById("product-list");



products.forEach(product=>{


container.innerHTML += `


<div class="product-card">


<img src="${product.image}"
alt="${product.name}">



<h3>

${product.name}

</h3>



<p>

${product.description}

</p>



<h4>

${product.price}

</h4>




<a href="https://wa.me/265999826757?text=Hello Mkanga-Ulimi, I want to order ${product.name}">


<button>

Order Now

</button>


</a>



</div>


`;



});