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


// COPY TO CLIPBOARD FUNCTION
function copyToClipboard(textId) {
  let textToCopy = document.getElementById(textId);

  textToCopy.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(textToCopy.value);
}

// CHANGE COPY ICON ON CLICK
document.querySelectorAll('.btn-copy').forEach( btnCopy => {
  btnCopy.addEventListener('click', function(clicked) {
    return function(){
      if(!clicked) {
        let copyIcon = this.innerHTML;
        /*Create checkmark icon*/
        let checkIcon = document.createElement('i');
        checkIcon.className = "fa-solid fa-check";
        
        this.innerHTML = "";
        this.appendChild(checkIcon);

        clicked = true;
        setTimeout(function() {
          this.innerHTML = copyIcon;
          clicked = false;
          }.bind(this), 800);
        }
    };
  }(false), this);
});

document.getElementById('btn-clear').addEventListener('click', function (event) {
  clearAllInputs();
});

function clearAllInputs(){
  numberFields[0].value = '';
  numberFields[1].value = '';
}