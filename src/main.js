let shop = document.getElementById('shop');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let current_gallery = [];

/* https://www.freecodecamp.org/news/the-difference-between-arrow-functions-and-normal-functions/ */
/* https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/ */

/* Create Function to Display Shop Items */
let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, name, price, desc, img} = x; /* this avoids using x. when using variables below */
            let search = basket.find((x) => x.id === id) || [];
            return `
        <div id=product-id-${id} class="item">
                <img width="220" src=${img} onclick="showModal(${id}); currentSlide(1);" alt="">
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

let setGallery = (name) => {
    let search = shopItemsData.find((x) => x.id === name.id) || [];
    let head = "images/" + search.id + "/";
    let gallery = search.gallery;
    let galleryimages = [];
    gallery.forEach(element => {
        galleryimages.push(head + element)
    });
    localStorage.setItem("gallery", JSON.stringify(galleryimages));    
}


/* this is called when a plus sign is pressed */
let increment = (div_with_id) => {

    let item_id = div_with_id.id;
    let search = basket.find((x) => x.id === item_id);

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

/* Modal Picture Gallery Code */

var slideIndex = 1;

/* Close the picture gallery */
let closeModal = () => {
    document.getElementById("modal_front").style.display = "none";
    document.getElementById("backdrop").style.display = "none";
}

/*Show the picture gallery*/
let showModal = (name) => {
    let modal = document.getElementById("modal_front");
    modal.style.display = "block";
    document.getElementById("backdrop").style.display = "block";
  
    //find the gallery list
    let search = shopItemsData.find((x) => x.id === name.id) || [];
    let gallery = search.gallery; //get the list of images

    modal_header = `<span class="close cursor" onclick="closeModal()">&times;</span>
    <br>
    <div class="modal-content">`;

    modal_footer = ` <br>
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="next" onclick="plusSlides(1)">&#10095;</a>
    </div>`;

    let slideNumber = 0;
    let numberOfSlides = gallery.length;

    modal_center = gallery.map((x) => {
        slideNumber++;
        return ` 
    <div class="mySlides">
    <div class="numbertext">${slideNumber} / ${numberOfSlides}</div>
    <img src="/images/${name.id}/${x}" style="width:100%">
    </div>`;
    }).join("");

    modal.innerHTML = modal_header + modal_center + modal_footer;
}


/* switch slides +1 or -1 */
let plusSlides = (n) => {
  showSlides(slideIndex += n);
}

/* Show current slide - used for on loading modal */
let currentSlide = (n) => {
  showSlides(slideIndex = n);
}

/* function used for changing slides */
/* it hides all slides, and then shows the one */
let showSlides = (n) => {
    var i;
    var slides = document.getElementsByClassName("mySlides");

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}

    /* Hide each slide, unless it's the one you want to show */
    for (i = 0; i < slides.length; i++) {
        if (i != slideIndex - 1){
        slides.item(i).style.display = "none";
        }
        else {
        slides.item(i).style.display = "block";  
        }
    }
}




