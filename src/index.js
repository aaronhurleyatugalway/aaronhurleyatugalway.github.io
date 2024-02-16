let basket = JSON.parse(localStorage.getItem("data")) || [];

/* this calculates and updates the total number of items in the basket*/
let calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((z) => z.item).reduce((x, y) => x + y, 0);
}

calculate();