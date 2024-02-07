let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

/* this calculates and updates the total number of items in the basket*/
let calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((z) => z.item).reduce((x, y) => x + y, 0);
}

/* run the calculate when page first appears or refreshes*/
calculate();

let generateCartItems = () => {
    if (basket.length !== 0){
        return (ShoppingCart.innerHTML = basket.map ((x) => {
            let{id,item} = x; /*deconstruct x*/
            let search = shopItemsData.find((y)=>y.id === id) || [];
            return `
            <div class="cart-item">
            <img width="100" src="${search.img}">
                <div class = "details">
                   <div class="title-price-x">
                        <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class="cart-item-price">€${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                   </div>

                   <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                   </div>

                   <h3>€ ${item * search.price}</h3>
                </div>
            </div>
            `;
        }).join(''));
    }
    else{
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }
}

generateCartItems();

/* this is called when a plus sign is pressed */
let increment = (div_with_id) => {

    let item_id = div_with_id.id;
    let search = basket.find((x) => x.id === item_id);

    /*  number = Number(document.getElementById("cartAmount").innerHTML) + 1;
        document.getElementById("cartAmount").innerHTML = number; */
    if (search === undefined) {
        basket.push({
            id: item_id,
            item: 1
        });
    }
    else {
        search.item += 1;
    }

    update(item_id);

    generateCartItems();

    localStorage.setItem("data", JSON.stringify(basket));
}


/* this is called when a minus sign is pressed */
let decrement = (div_with_id) => {
    let item_id = div_with_id.id;

    let search = basket.find((x) => x.id === item_id);

    /* if a minus button is pressed when the quantity is 0, search is undefined */
    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        if (search.item > 0) { search.item -= 1 };
    }

    update(item_id);

    /*remove products from basket with 0 items chosen*/
    basket = basket.filter((x) => x.item !== 0);

    /*regenerate cards, to remove unnecessary data*/
    generateCartItems();

    /*put the basket into local storage, to be available on refresh*/
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search === undefined) {
        document.getElementById(id).innerHTML = 0;
    }
    else {
        document.getElementById(id).innerHTML = search.item;
    }
    
    totalAmount();
    /* then we add up how many are in the basket */
    calculate();
}

let removeItem = (div_id) => {
    let selectedId = div_id.id;

    basket = basket.filter((x) => x.id != selectedId);
    generateCartItems();

    totalAmount();

    calculate();

    localStorage.setItem("data", JSON.stringify(basket));
}

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculate();
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
    if(basket.length !== 0){
        let totalAmount = 0;
        let amount = basket.map((x) => {
            let {item,id} = x; /*deconstruct x*/
        
            let search = shopItemsData.find((y)=>y.id === id) || [];
        
            return item * search.price;
        })
        .reduce((x,y)=>x + y, 0);
        label.innerHTML = `
        <h2>Total Cost of Items : € ${amount}</h2>
        <a href="checkout.html"><button class="checkout">Checkout</button></a>
        <button onClick="clearCart()" class="removeAll">Clear Cart</button>
        `
    }
    else return;
}

totalAmount();