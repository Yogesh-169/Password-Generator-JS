const inputSlider = document.querySelector("[data-length-display]"); 
const lengthDisplay= document.querySelector("[Data-Length]"); 
const passwordDisplay =document.querySelector("[data-passwordDisplay]"); 
const copyBtn = document.querySelector(" [data-copy]"); 
const copyMsg = document.querySelector("[Copy-Data]"); 
const uppercaseCheck =document.querySelector("#uppercase"); 
const lowercaseCheck= document.querySelector("#lowercase"); 
const numbersCheck = document.querySelector("#numbers"); 
const symbolsCheck = document.querySelector("#symbols"); 
const indicator= document.querySelector("[data-indicator]"); 
const generateBtn = document.querySelector("#generat"); 
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?/~`-=\\";

let password="";
let passwordLength=10;
let checkCount=1;
handleSlider();


// set password Length
function handleSlider(){
    inputSlider.value =passwordLength; 
    lengthDisplay.innerText=passwordLength;
}

function  setIndicator(color){
    indicator.style.backgroundColor=color;
}

function getrndint(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber(){
    return getrndint(0,9);
}

function generateLowerCAse(){
    return String.fromCharCode(getrndint(97,123));
}
function generateUpperCAse(){
    return String.fromCharCode(getrndint(65,91));
}
function generateSymbol(){
    const randNum= getrndint(0,symbols.length);
    return symbols.charAt(randNum);

}


function clcStrength(){
    let hasUpper = false; 
let hasLower = false; 
let hasNum = false; 
let hasSym = false; 
if (uppercaseCheck.checked) hasUpper = true; 
if (lowercaseCheck.checked) hasLower = true; 
if (numbersCheck.checked) hasNum = true; 
if (symbolsCheck.checked) hasSym = true; 
if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) { 
setIndicator("#0f0"); 
} 
else if ( (hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6 ) 
{ 
setIndicator("#ff0"); 
} 
else { 
setIndicator("#f00");
}
}


async function copyContent(){
    await navigator.clipboard.writeText(passwordDisplay.value)
    .then(() => {
        copyMsg.textContent = "Copied!";
        setTimeout(() => {
            copyMsg.textContent = "";
        }, 2000);
    })
    .catch(() => {
        copyMsg.textContent = "Failed to Copy!";
    });
    copyMsg.classList.add("active");

}


inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    copyContent();
})

function handleCheckBox(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
        
    })

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("change",handleCheckBox)
    });


generateBtn.addEventListener("click",(e)=>{
    generatePassword();
})

function shufflePassword(array){
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;

}

function generatePassword(){
    
    if(checkCount==0) return;

    if(passwordLength<checkCount){
        passwordLength=checkCount
        handleSlider()
    }
    
    password="";

    // if(uppercaseCheck.checked){
    //     password+=generateUpperCAse();
    // }
    // if(lowercaseCheck.checked){
    //     password+=generateLowerCAse();
    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password+=generateSymbol();
    // }

    let funcArr=[];
    
    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCAse);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCAse);
    }
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }
    

    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    
    for(let i=0; i < passwordLength - funcArr.length; i++){
        let randomIndex = getrndint(0, funcArr.length);
        password += funcArr[randomIndex]();
    }
    

    password = shufflePassword(Array.from(password)).join("");


    passwordDisplay.value=password;
    console.log(password);
    

    clcStrength();

}