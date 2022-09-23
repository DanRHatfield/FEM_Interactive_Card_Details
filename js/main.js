let formElements = ["cardholder", "cardnum", "MM", "YY", "CVC"]
let formFields = ["cardholder_name", "card_number", "month", "year", "cvc"]
let checkFields = ["cardnum", "MM", "YY", "CVC"]
let warningAlerts = ["cardnum_warning", "month_warning", "year_warning", "cvc_warning"]
let hasErrors = false
let emtpyValues = []
let wrongFormat = []

document.getElementById("cardholder").addEventListener( 'focusout',updateHolder)
document.getElementById("cardnum").addEventListener('focusout',updateNumber)
document.getElementById("MM").addEventListener('focusout',updateMonth)
document.getElementById("YY").addEventListener('focusout',updateYear)
document.getElementById("CVC").addEventListener('focusout',updateCVC)
document.getElementById("confirm").addEventListener('click',validateForm)

function updateHolder () {
    if(hasErrors) { resetWarnings()}
    document.getElementById("cardholder_name").innerHTML = this.value
}

function updateNumber () {
    if(hasErrors) { resetWarnings()}
    document.getElementById("card_number").innerHTML = this.value
}

function updateMonth () {
    if(hasErrors) { resetWarnings()}
    document.getElementById("month").innerHTML = this.value
}

function updateYear () {
    if(hasErrors) { resetWarnings()}
    document.getElementById("year").innerHTML = this.value
}

function updateCVC () {
    if(hasErrors) { resetWarnings()}
    document.getElementById("cvc").innerHTML = this.value
}

function validateForm() {
    for(field of checkFields) {
        console.log(field)
        let tempVar = document.getElementById(field).value 
        console.log(tempVar)
        let arrIndex = checkFields.indexOf(field)
        // Test if field is empty
        tempVar = Number(tempVar.split('').sort().reverse().join(''))
        console.log(tempVar)
        if(tempVar === "") {
            document.querySelector('.'+warningAlerts[arrIndex]).classList.toggle("hidden")
            document.querySelector('.'+warningAlerts[arrIndex]).innerHTML = "Can't be blank"
            // update input border
            document.querySelector("#" +field).classList.toggle("error")
            hasErrors = true
            emtpyValues.push('.'+warningAlerts[arrIndex])
            wrongFormat.push("#" +field)
        }
        // Test if correct format
        else if (!Number(tempVar)) {
            console.log(`${tempVar} is not a number`)
            hasErrors = true
            // update input border
            document.querySelector("#" +field).classList.toggle("error")
            document.querySelector('.'+warningAlerts[arrIndex]).innerHTML = "Wrong format"
            document.querySelector('.'+warningAlerts[arrIndex]).classList.toggle("hidden")
            emtpyValues.push('.'+warningAlerts[arrIndex])
            wrongFormat.push("#" +field)
            if(warningAlerts[arrIndex] === 'cardnum_warning') {
                console.log("Made it in the loop!")
                document.querySelector('.cardnum_warning').innerHTML = "Wrong format, numbers only"
            }
        }
        else {
            document.querySelector('.theForm').classList.add("hidden")
            document.querySelector('.thankYou').classList.remove("hidden")
        }
    }    
}

function resetWarnings() {
    for(a of emtpyValues) {
        document.querySelector(a).classList.toggle("hidden")
    }
    for(b of wrongFormat) {
        document.querySelector(b).classList.toggle("error")
    }
    hasErrors = false;
}