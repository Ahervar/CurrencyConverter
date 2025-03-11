let dropDown = document.querySelectorAll(".dropdown select");
let countryImg = document.querySelectorAll(".dropdown img");
const btn = document.querySelector("button");
let Amnt = document.querySelectorAll(".converted-value input");
Amnt[1].readOnly = true;
let bashLink = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
let fromCurr = document.querySelector(".from select");
let tocurr = document.querySelector(".to select");
let text = document.querySelector(".btn p")


// to select countries for exchange

for(let select of dropDown){
    for(let countries in countryList){
        let newOption = document.createElement("option")
        newOption.innerText = countries;
        newOption.value = countries;
        if(select.name == "from" && countries == "USD"){
            newOption.selected = "selected";
        }else if(select.name == "to" && countries == "INR"){
            newOption.selected = "selected";

        }
        select.append(newOption);
    }
 
   
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);

    })
}

// to update FLAG of COUNTRY

const updateFlag = (element) =>{
    console.log(element)
    let countries = element.value;
    let countryCode = countryList[countries];
    let flagLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = flagLink;


}

// code for doing EXCHANGE CURRENCY

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let value1 = Amnt[0].value;
    let value2 = Amnt[1].value;
    if( value1 === "" || value1 < 1){
        value1 = 1;
        Amnt[0].value = "1"

    }


    let url =  `${bashLink}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let fromCurrency = fromCurr.value;
    let toCurrency = tocurr.value;
    let conversionRate = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
    let convertedValue = conversionRate * Amnt[0].value;
    Amnt[1].value = convertedValue
    
    text.innerText =  `${value1}${fromCurrency.toUpperCase()} = ${convertedValue}${toCurrency.toUpperCase()}`

})


// FROM to TO transfer butten

let countryTranferer = document.querySelector(".dropdown i")
countryTranferer.addEventListener("click", () => {
    if (dropDown.length === 2) {
        // Swap values between the two dropdowns
        let temp = dropDown[0].value;
        dropDown[0].value = dropDown[1].value;
        dropDown[1].value = temp;


        let flags = document.querySelectorAll("img");
        let tempFlag = flags[0].src;
        flags[0].src = flags[1].src;
        flags[1].src = tempFlag;
    }
    
})