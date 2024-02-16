let basket = JSON.parse(localStorage.getItem("data")) || [];

/* this calculates and updates the total number of items in the basket*/
let calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((z) => z.item).reduce((x, y) => x + y, 0);
}

calculate();

let navbar2 = document.getElementById("navbar2");

navbar2.innerHTML = `<h2><a href="index.html"><img src="images/locologo.jpg" width="160px"></h2></a>
    <a href="shop.html" class="shoplink">SHOP <i class="bi bi-shop"></i></a>
`