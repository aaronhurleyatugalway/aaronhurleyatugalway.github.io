let basket = JSON.parse(localStorage.getItem("data")) || [];
let formOutput = JSON.parse(localStorage.getItem("formFields")) || [];
let confirmation = document.getElementById("confirmation");



// reset the payment details to blank
let resetPayment = () => {
     for (const [key, value] of Object.entries(formOutput.payment)) {
         formOutput.payment[key] = "";
     }

     localStorage.setItem("formFields", JSON.stringify(formOutput));
 }

resetPayment();


let printOutNameAndAddress = (x) => {
    let {name, email, address,city,zip, country} = x;
    confirmation.innerHTML = `<br><p> Sent to : <p><br>
    <p> ${name} <p> 
    <p> ${address} <p> 
    <p> ${city} <p> 
    <p> ${zip} <p> 
    <p> ${country} <p> <br>
    <p> You will receive a confirmation email, sent to ${email} <p> 
    `
}

printOutNameAndAddress(formOutput.shipping);




