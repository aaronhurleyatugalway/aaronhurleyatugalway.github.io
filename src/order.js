let formOutput = JSON.parse(localStorage.getItem("formFields")) || [];
let confirmation = document.getElementById("confirmation");

// reset the payment details to blank, and basket data to empty
let resetFields = () => {
     for (const [key, value] of Object.entries(formOutput.payment)) {
         formOutput.payment[key] = "";
     }
     localStorage.setItem("formFields", JSON.stringify(formOutput));
     localStorage.setItem("data", JSON.stringify([]));
}

resetFields();


let printOutNameAndAddress = (x) => {
    let {name, email, address,city,zip, country} = x;
    confirmation.innerHTML = `<br><p> <b>Sending to :</b> <p><br>
    <p> ${name} <p> 
    <p> ${address} <p> 
    <p> ${city} <p> 
    <p> ${zip} <p> 
    <p> ${country} <p> <br>
    <p> You will receive a confirmation email, sent to <b>${email}</b> <p> 
    `
}

printOutNameAndAddress(formOutput.shipping);




