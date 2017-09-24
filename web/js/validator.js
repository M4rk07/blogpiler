/**
 * Created by M4rk0 on 9/24/2017.
 */

function validateRegistrationForm () {

    var email = document.getElementById("rg_email");
    var password = document.getElementById("rg_password");
    var repeatedPassword = document.getElementById("rg_repeatedPassword");
    var firstName = document.getElementById("rg_firstName");
    var lastName = document.getElementById("rg_lastName");

    var ok = true;
    var messageDiv = document.getElementById("registrationFormMessage");
    messageDiv.innerHTML = "";

    resetColor(email);
    resetColor(password);
    resetColor(repeatedPassword);
    resetColor(firstName);
    resetColor(lastName);

    if(password.value.search(/^.{6,30}$/) < 0) {
        errorColor(password);
        messageDiv.innerHTML += errorMessage("Password needs to be at least 6 characters long.");
        ok = false;
    }

    if(password.value !== repeatedPassword.value) {
        errorColor(repeatedPassword);
        messageDiv.innerHTML += errorMessage("Passwords don't match.");
        ok = false;
    }

    if(firstName.value.search(/^[A-Za-z]{2,25}$/) < 0) {
        errorColor(firstName);
        messageDiv.innerHTML += errorMessage("First name is not valid.");
        ok = false;
    }

    if(lastName.value.search(/^[A-Za-z]{2,25}$/) < 0) {
        errorColor(lastName);
        messageDiv.innerHTML += errorMessage("Last name is not valid.");
        ok = false;
    }

    return ok;

}

function errorColor (field) {
    field.style.backgroundColor = "#fbc6c6";
}

function resetColor (field) {
    field.style.backgroundColor = "white";
}

function errorMessage(message) {
    return "<div class='alert alert-danger'>" + message + "</div>";
}