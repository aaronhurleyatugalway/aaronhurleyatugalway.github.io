let basket = JSON.parse(localStorage.getItem("data")) || [];

/* this calculates and updates the total number of items in the basket*/
let calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    let cartIcon2 = document.getElementById("cartAmount2");
    let numberOfItems = basket.map((z) => z.item).reduce((x, y) => x + y, 0);
    cartIcon.innerHTML = numberOfItems;
    cartIcon2.innerHTML = numberOfItems;
}

calculate();