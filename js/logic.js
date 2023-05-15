//declare conversion rules
const CONVERSION_TABLE = {
    "M": 1000,
    "CM": 900, "D": 500, "CD": 400, "C": 100,
    "XC": 90, "L": 50, "XL": 40, "X": 10,
    "IX": 9, "V": 5, "IV": 4, "I": 1
}

function decimalToRoman(num) {
  console.log("input: ", num);
  //the result will be a string
  let numInRoman;
  //obtain the keys from the conversion rules
  const romanNumerals = Object.keys(CONVERSION_TABLE);

  if( num > 0 && num < 4000 && isInteger(num)) {
    numInRoman = "";
    for(let i = 0; i < romanNumerals.length; ++i){
      let currValue = CONVERSION_TABLE[romanNumerals[i]];
      //if the number is greater than or equal to the evaluated
      //value from the conversion table, subtract this value
      //from the number and add the key to the string
      //repeat until the number is less than the evaluated numer to continue
      //the for loop for the other roman numerals
      while(num >= currValue)
      {
        num -= currValue;
        numInRoman += romanNumerals[i];
      }
    }
  } else {
    alert("Roman numerals are only defined for positive integers up to 3,999!");
    clearAllInputs();
  }
  //alert(numInRoman);+

  //console.log(numInRoman);
  return numInRoman;
}

function romanToDecimal(str){
    let decimal;
    str = str.toUpperCase();
    if(isValidRomanNumeral(str)){
      decimal = 0; //initialize decimal
      for(let i = 0; i < str.length; i++){
          //obtain the values from each roman numeral
          let char1 = CONVERSION_TABLE[str[i]];
          let char2 = char1;
          //to avoid string overflow
          if(i+1 < str.length){
              char2 = CONVERSION_TABLE[str[i+1]];
          }
          //compare each pair of consecutive values
          if(char1 >= char2){
              decimal += char1;
          } else {
              decimal += char2 - char1;
              i++;
          }
      }
    } else {
      alert("Not a valid roman numeral!");
      clearAllInputs(); //remove
    }
    //alert(decimal);
    //console.log(decimal);
    return decimal;
}
 

//  --- VALIDATIONS ---
function isValidRomanNumeral(str){
  let regex = new RegExp(/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/);

  return regex.test(str) && str !== null;
}

function isInteger(num){
  return num % 1 === 0;
}

// ... VALIDATIONS ...


// --- DISPLAY RESULTS ---
/*function displayRomanToDecimal(){
  let romanNumeral = document.getElementById("input-roman").value;
  document.getElementById('result-decimal').innerHTML = romanToDecimal(romanNumeral );
}

function displayDecimalToRoman(){
  let decimalNumber = document.getElementById("input-decimal").value;
  document.getElementById('result-roman').innerHTML = decimalToRoman(decimalNumber);
}*/

// ... DISPLAY RESULTS ...

// Display results on same line as inputs
let numberFields = [document.getElementById("roman-input"), document.getElementById("decimal-input")]

let input = null;
let output = null;

document.querySelector(".conversion-box").addEventListener("input", function(event){input = event.target;});

function convertOnButtonClick(){

  output = numberFields.indexOf(input) === 0 ? numberFields[1] : numberFields[0];

  if(input.id === "decimal-input"){
    output.value = decimalToRoman(input.value);
  } else {
    input.value = input.value.toUpperCase(); //
    output.value = romanToDecimal(input.value); //
  }
}

/*
function displayResult(input, resultTextId){
  document.getElementById(resultTextId).innerHTML = romanToDecimal(input);
}*/


/*let romanNumeral = document.getElementById("input-roman").value;
let decimalNumber = document.getElementById("input-decimal").value;*/

/*console.log(romanToDecimal(romanNumeral));
console.log(decimalToRoman(decimalNumber));*/

/*document.getElementById('btn-roman-to-decimal').onclick = (document.getElementById('result-decimal').innerHTML = romanToDecimal(romanNumeral)); */

/*document.getElementById('btn-roman-to-decimal').addEventListener("click" ,displayRomanToDecimal);

document.getElementById('btn-decimal-to-roman').addEventListener("click" ,displayDecimalToRoman);*/

// COPY TO CLIPBOARD FUNTION
function copyToClipboard(textId) {
  let textToCopy = document.getElementById(textId);

  textToCopy.select();
  textToCopy.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(textToCopy.value);

  autohideAlert("Copied to clipboard!", 1000);
}

function autohideAlert(msg, duration){

  document.querySelector(".btn-copy").style.color = "red";
  let alert = document.createElement("div");
  /*alert.setAttribute("style", "position:absolute;top:50%;left:50%;background-color:white;");*/
  alert.innerHTML = msg;
  setTimeout(function(){alert.parentNode.removeChild(alert); 

  document.querySelector(".btn-copy").style.color = "red";
  },duration);
  document.body.appendChild(alert);

}

document.getElementById('btn-clear').addEventListener('click', function (event) {
  clearAllInputs();
});

function clearAllInputs(){
  numberFields[0].value = '';
  numberFields[1].value = '';
}