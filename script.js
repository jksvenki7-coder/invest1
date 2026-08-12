/* =========================================
   V3 GROUP OF BUSINESS
   INVESTMENT INTEREST FORM
========================================= */

const UNIT_PRICE = 99;

// V3 official WhatsApp number
const WHATSAPP_NUMBER = "919030868681";


/* =========================================
   ELEMENTS
========================================= */

const unitsInput = document.getElementById("units");
const totalUnits = document.getElementById("totalUnits");
const totalAmount = document.getElementById("totalAmount");

const mobileInput = document.getElementById("mobile");
const whatsappInput = document.getElementById("whatsapp");

const submitBtn = document.getElementById("submitBtn");


/* =========================================
   RUPEE FORMAT
========================================= */

function rupees(amount) {
    return "₹" + Number(amount).toLocaleString("en-IN");
}


/* =========================================
   UNIT CALCULATION
========================================= */

function calculateUnits() {

    let units = Number(unitsInput.value);

    if (!Number.isFinite(units) || units < 1) {
        units = 1;
    }

    units = Math.floor(units);

    unitsInput.value = units;

    const amount = units * UNIT_PRICE;

    totalUnits.textContent = units;
    totalAmount.textContent = rupees(amount);
}


/* =========================================
   MOBILE NUMBER
========================================= */

function cleanNumber(input) {

    input.value = input.value
        .replace(/\D/g, "")
        .substring(0, 10);
}


mobileInput.addEventListener("input", function () {
    cleanNumber(this);
});


whatsappInput.addEventListener("input", function () {
    cleanNumber(this);
});


/* =========================================
   UNIT EVENTS
========================================= */

unitsInput.addEventListener("input", calculateUnits);

unitsInput.addEventListener("change", calculateUnits);


/* =========================================
   VALID MOBILE
========================================= */

function validMobile(number) {

    return /^[6-9][0-9]{9}$/.test(number);

}


/* =========================================
   SELECTED BUSINESS CONCEPTS
========================================= */

function getBusinesses() {

    const checked =
        document.querySelectorAll(
            'input[name="business"]:checked'
        );

    const businesses = [];

    checked.forEach(function (item) {
        businesses.push(item.value);
    });

    return businesses.length
        ? businesses.join(", ")
        : "Not selected";

}


/* =========================================
   FORM DATA
========================================= */

function getData() {

    const units = Number(unitsInput.value);

    return {

        name:
            document.getElementById("fullName").value.trim(),

        mobile:
            mobileInput.value.trim(),

        whatsapp:
            whatsappInput.value.trim(),

        email:
            document.getElementById("email").value.trim(),

        city:
            document.getElementById("city").value.trim(),

        state:
            document.getElementById("state").value,

        address:
            document.getElementById("address").value.trim(),

        units: units,

        amount: units * UNIT_PRICE,

        referral:
            document.getElementById("referralCode").value.trim(),

        businesses:
            getBusinesses(),

        additional:
            document
                .getElementById("additionalConcept")
                .value
                .trim()

    };

}


/* =========================================
   VALIDATION
========================================= */

function validate(data) {

    if (!data.name) {

        alert("Please enter your full name.");

        document.getElementById("fullName").focus();

        return false;
    }


    if (!validMobile(data.mobile)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        mobileInput.focus();

        return false;
    }


    if (!validMobile(data.whatsapp)) {

        alert(
            "Please enter a valid 10-digit WhatsApp number."
        );

        whatsappInput.focus();

        return false;
    }


    if (!data.city) {

        alert("Please enter your city.");

        document.getElementById("city").focus();

        return false;
    }


    if (!data.state) {

        alert("Please select your state.");

        document.getElementById("state").focus();

        return false;
    }


    if (!data.address) {

        alert("Please enter your address.");

        document.getElementById("address").focus();

        return false;
    }


    const declaration =
        document.getElementById("declaration");


    if (!declaration.checked) {

        alert(
            "Please accept the declaration."
        );

        declaration.focus();

        return false;
    }


    return true;

}


/* =========================================
   WHATSAPP MESSAGE
========================================= */

function createMessage(data) {

    return `*V3 GROUP OF BUSINESS*
*ALL IN ONE APP*

*INVESTMENT INTEREST APPLICATION*

━━━━━━━━━━━━━━━━

*PERSONAL DETAILS*

Name: ${data.name}

Mobile: ${data.mobile}

WhatsApp: ${data.whatsapp}

Email: ${data.email || "Not provided"}

City: ${data.city}

State: ${data.state}

Address:
${data.address}

━━━━━━━━━━━━━━━━

*UNIT DETAILS*

1 Unit Price: ₹${UNIT_PRICE}

Number of Units: ${data.units}

Total Amount: ₹${data.amount}

━━━━━━━━━━━━━━━━

*REFERRAL DETAILS*

Referral Code:
${data.referral || "Not provided"}

━━━━━━━━━━━━━━━━

*BUSINESS OPPORTUNITIES*

${data.businesses}

━━━━━━━━━━━━━━━━

*ADDITIONAL CONCEPT*

${data.additional || "None"}

━━━━━━━━━━━━━━━━

*DECLARATION*

The applicant has confirmed that the
information provided is correct.

This is an expression of interest and
is subject to official terms and applicable
requirements.

━━━━━━━━━━━━━━━━

*V3 Group of Business*
*All in One App*`;

}


/* =========================================
   SEND TO WHATSAPP
========================================= */

function sendWhatsApp(message) {

    const encoded =
        encodeURIComponent(message);

    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encoded;


    window.location.href = url;

}


/* =========================================
   SUBMIT
========================================= */

submitBtn.addEventListener("click", function () {

    const data = getData();


    if (!validate(data)) {
        return;
    }


    const message =
        createMessage(data);


    sendWhatsApp(message);

});


/* =========================================
   INITIAL LOAD
========================================= */

calculateUnits();
