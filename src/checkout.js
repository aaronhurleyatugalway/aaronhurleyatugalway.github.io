let basket = JSON.parse(localStorage.getItem("data")) || [];
let CheckoutRows = document.getElementById("checkout-cart-rows")
let formOutput = JSON.parse(localStorage.getItem("formFields")) || [];

/* Function to generate checkout items on the page */ 
let generateCheckoutItems = () => {
    if (basket.length !== 0) {
        return (CheckoutRows.innerHTML = basket.map((x) => {
            let { id, item } = x; /*deconstruct x*/
            let search = shopItemsData.find((y) => y.id === id) || [];
            return `
            <tr><td>${search.name}</td><td>${item}</td>
            <td>€${search.price}</td><td>€${search.price * item}</td></tr>
            `;
        }).join(''));
    }
    else {
        CheckoutRows.innerHTML = ``;
    }
}

generateCheckoutItems();


/* calculate shipping */
let calculateShipping = (cost, numberOfItems) => {
    if (cost > 250) {
        return 0;
    }
    else {
        return (numberOfItems * 2);
    }

}

/* this calculates and updates the total number of items in the basket*/
/* And final cost */
let calculate = () => {
    let cartIcon = document.getElementById("cartAmount");
    let noOfItems = basket.map((z) => z.item).reduce((x, y) => x + y, 0);
    cartIcon.innerHTML = noOfItems;

    /* Calculate the Cost of Items */
    let costOfItems = basket.map((x) => {
        let { item, id } = x; /*deconstruct x*/

        let search = shopItemsData.find((y) => y.id === id) || [];

        return item * search.price;
    })
        .reduce((x, y) => x + y, 0);

    /* For the Subtotal */
    let stotal = document.getElementById("stotal");
    stotal.innerHTML = "€" + costOfItems;

    /* For the Shipping Costs */
    let shippingCost = calculateShipping(costOfItems, noOfItems);
    let shipping = document.getElementById("sshipping");
    shipping.innerHTML = "€" + shippingCost;

    /* Add Item Cost to Shipping Cost */
    let totalCost = costOfItems + shippingCost;
    let total = document.getElementById("ftotal");
    total.innerHTML = "€" + totalCost;

}

/* run calculate when page first appears or refreshes*/
calculate();

/* Function to force selection of particular value on dropdown menu */
let setSelectedIndex = (s, valsearch) => {
    // Loop through all the items in drop down list
    for (i = 0; i < s.options.length; i++) {
        if (s.options[i].value == valsearch) {
            s.options[i].selected = true;
            break;
        }
    }

    return;

}

/* Function to initialise form fields from local storage "formOutput" */
let getFormFields = () => {
    if (formOutput.length != 0) {
        document.getElementById('nname').setAttribute('value', formOutput.billing.name);
        document.getElementById('email').setAttribute('value', formOutput.billing.email);
        document.getElementById('city').setAttribute('value', formOutput.billing.city);
        document.getElementById('address').setAttribute('value', formOutput.billing.address);
        document.getElementById('zip').setAttribute('value', formOutput.billing.zip);
        setSelectedIndex(document.getElementById("country"), formOutput.billing.country);

        document.getElementById('cname').setAttribute('value', formOutput.payment.name);
        document.getElementById('ccnum').setAttribute('value', formOutput.payment.ccnum);
        document.getElementById('expmonth').setAttribute('value', formOutput.payment.expmonth);
        document.getElementById('expyear').setAttribute('value', formOutput.payment.expyear);
        document.getElementById('cvv').setAttribute('value', formOutput.payment.cvv);

        document.getElementById('sname').setAttribute('value', formOutput.shipping.name);
        document.getElementById('semail').setAttribute('value', formOutput.shipping.email);
        document.getElementById('scity').setAttribute('value', formOutput.shipping.city);
        document.getElementById('saddress').setAttribute('value', formOutput.shipping.address);
        document.getElementById('szip').setAttribute('value', formOutput.shipping.zip);
        setSelectedIndex(document.getElementById("scountry"), formOutput.shipping.country);
    }
}

getFormFields();

/* Set the values of the form fields into local storage */
let setFormFields = () => {
    let nname = document.getElementById('nname').value;
    let email = document.getElementById('email').value;
    let city = document.getElementById('city').value;
    let address = document.getElementById('address').value;
    let zip = document.getElementById('zip').value;
    let country = document.getElementById('country').value;

    let cname = document.getElementById('cname').value;
    let ccnum = document.getElementById('ccnum').value;
    let expmonth = document.getElementById('expmonth').value;
    let expyear = document.getElementById('expyear').value;
    let cvv = document.getElementById('cvv').value;

    let snname = document.getElementById('sname').value;
    let semail = document.getElementById('semail').value;
    let scity = document.getElementById('scity').value;
    let saddress = document.getElementById('saddress').value;
    let szip = document.getElementById('szip').value;
    let scountry = document.getElementById('scountry').value;

    let formfields = {
        billing: {
            name: nname,
            email: email,
            city: city,
            address: address,
            zip: zip,
            country: country
        },
        shipping: {
            name: snname,
            email: semail,
            city: scity,
            address: saddress,
            zip: szip,
            country: scountry
        },
        payment: {
            name: cname,
            ccnum: ccnum,
            expmonth: expmonth,
            expyear: expyear,
            cvv: cvv
        }
    }

    localStorage.setItem("formFields", JSON.stringify(formfields));
};


/* Call this On Submission of forms */
let formFields = (form) => {
    form.preventDefault();

    /*see function above setting the form fields to local storage */
    setFormFields();

    formOutput = JSON.parse(localStorage.getItem("formFields")) // update the variables in formOutput, so to be used in validation 

    isFormValid = validateForm(); // Go to a form validator

    if (isFormValid) {
        basket = [];
        formOutput = [];
        window.location.href = "order.html";
    }
}

let closeModal = () => {
    let modal = document.getElementById("modal_checkout");
    let backdrop = document.getElementById("backdrop");
    modal.style.display = 'none';
    backdrop.style.display = 'none';
}

let openModal = (message, modal, image) => {
    modal.innerHTML = `<p>Input Warning! 
    <button onclick="closeModal()" type="button" class="close"><span aria-hidden="true">&times;</span></button>
    <br></p> 
    <p><img width=100px src="/images/${image}"></p><br>
    <p>${message}</p>`;
    modal.style.display = 'block';
    let backdrop = document.getElementById("backdrop");
    backdrop.style.display = 'block';
}


/* Function to check pattern, takes in value of input, name of id of span and the pattern */
let checkPattern = (input_value, warningname, formPattern) => {

        var re = RegExp(formPattern);

        let keywarning = document.getElementById(warningname);
        
        /* If the input is invalid, then return a warning to screen */
        if(!re.test(input_value)){
            keywarning.innerHTML = "*invalid";
            keywarning.style.display = "inline-block";

            let modal = document.getElementById("modal_checkout");
            modal.style.border = 'green 6px solid';

            openModal("Credit Card Details are Invalid", modal, "cashmallow.jpg");
            
            return 0;
        }
        else {
            keywarning.style.display = "none";
            return 1;
        }

}

let validateForm = () => {


    if (basket.length === 0){
        let modal = document.getElementById("modal_checkout");
        modal.style.border = 'purple 6px solid';
        openModal("You have no items in your basket", modal, "clownmallow.jpg");
        return 0;
    }

    /* Check the billing part of the form */
    for (const [key, value] of Object.entries(formOutput.billing)) {

        if (value === "") {
            let modal = document.getElementById("modal_checkout");
            modal.style.border = 'pink 6px solid';
            openModal("All <b>Billing</b> Fields Must Be Completed", modal, "billmallow.jpg");
            return 0;
        }
    }

    
    isValid = 1;

    /* Check the payment part of the form */
    for (const [key, value] of Object.entries(formOutput.payment)) {
        
        if (formPatterns[key]) {
            
            let isPatternGood = checkPattern(value, key + "-warning", formPatterns[key]);
            
            if (!isPatternGood) {
                isValid = 0;
            }

        }

        if (value === "") {
            let modal = document.getElementById("modal_checkout");
            modal.style.border = 'green 6px solid';
            openModal("All <b>Payment</b> Fields Must Be Completed", modal, "cashmallow.jpg");
            return 0;
        }

    }

    /* Stops checking rest of form if invalid inputs in Payment */
    if(!isValid){
        return 0;
    }

    isValid = 1;

    /* Check the Shipping part of the form */
    for (const [key, value] of Object.entries(formOutput.shipping)) {

        let swarning = document.getElementById("s" + key + "-warning");

        if (value === "") {
            let modal = document.getElementById("modal_checkout");
            modal.style.border = 'cyan 6px solid';
            
            swarning.style.display = "inline-block";
            swarning.innerHTML = "*required"; 
            
            openModal("All <b>Shipping</b> Fields Must Be Completed", modal, "sailormallow.jpg");
            isValid = 0;
        }
        else {
            swarning.style.display = "none";
        }
    }

    if(!isValid){
        return 0;
    }

    return 1;
}


/* This calls the function formFields when submit is clicked */
document.getElementById('submit-order').addEventListener("click", formFields);

let clearForms = () => {
    localStorage.setItem("formFields", JSON.stringify([]));
    getFormFields();
}


/* If we click "Same as Billing", the shipping part of the form is filled out */
let fillInShippingForms = () => {

    sname.value = nname.value;
    semail.value = email.value;
    scity.value = city.value;
    saddress.value = address.value;
    szip.value = zip.value
    setSelectedIndex(document.getElementById("scountry"), country.value);

}

/* If we unclick "Same As Billing", do we want to clear the shipping form?? */
let clearShippingForms = () => {

    sname.value = "";
    semail.value = "";
    scity.value = "";
    saddress.value = "";
    szip.value = "";
    setSelectedIndex(document.getElementById("scountry"), "");

}

/* Take Action if Check Box is changed */

const checkbox = document.getElementById('same-as-billing')

checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        fillInShippingForms();
    } else {
        clearShippingForms();
    }
})
