let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

/* https://www.freecodecamp.org/news/the-difference-between-arrow-functions-and-normal-functions/ */
/* https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/ */

/* Create Function to Display Shop Items */
let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, name, price, desc, img } = x; /* this avoids using x. when using variables below */
            let search = basket.find((x) => x.id === id) || [];
            return `
        <div id=product-id-${id} class="item">
                <img width="220" src=${img} alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>€${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined ? 0 : search.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    </div>
                </div>
            </div>`;
        }).join(""));
};

/* this is were the function is run to generate the shop items */
generateShop();


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

    /*put the basket into local storage, to be available on refresh*/
    localStorage.setItem("data", JSON.stringify(basket));
}


/* this updates the number between the plus and minus sign */
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    if (search === undefined) {
        document.getElementById(id).innerHTML = 0;
    }
    else {
        document.getElementById(id).innerHTML = search.item;
    }

    /* then we add up how many are in the basket */
    calculate();
}



/* this calculates and updates the total number of items in the basket*/
let calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((z) => z.item).reduce((x, y) => x + y, 0);
    /* https://www.w3schools.com/jsref/jsref_reduce.asp */
}



/* run the calculate when page first appears or refreshes*/
calculate();