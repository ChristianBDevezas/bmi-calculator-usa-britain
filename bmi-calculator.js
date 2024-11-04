const container = document.querySelector("main");
const header = document.querySelector("header");
const idiom = document.querySelector('h2.idiom');
const heightLabel = document.querySelector('.bmi__input label[for="height"]');
const heightInput = document.querySelector('.bmi__input input[id="height"]');
const btnCalc = document.getElementById('btn-calc');
const bmiParagraphs = document.querySelectorAll(".bmi__table p");
const showBmi = document.getElementById('show-bmi');
let index = 0;

// event listeners
header.addEventListener('click', changeMetrics);
btnCalc.addEventListener('click', calcBmi);

function removeSelectedBmi() {
    bmiParagraphs.forEach((paragraph) => {
        paragraph.classList.remove("color");
    });
}

function changeMetrics(e) {
    const target = e.target;

    if(target.classList.contains('usa-flag')) {
        idiom.innerText = 'USA BMI';
        heightLabel.innerText = 'Height (feet)';
        heightInput.setAttribute('placeholder', 'height (in)');
        container.className = 'bmi usa-lang'
    }
    if(target.classList.contains('england-flag')) {
        idiom.innerText = 'Britain BMI';
        heightLabel.innerText = 'Height (inches)';
        heightInput.setAttribute('placeholder', 'height (lb)');
        container.className = 'bmi england-lang'
    }
}

function checkLanguage() {
    let language;

    if(container.classList.contains("usa-lang")) {
        language = 'usa';        
    }
    if(container.classList.contains("england-lang")) {
        language = 'eng';
    }

    return language;
}

function setFields(height, weight) {    
        if(height == "") {
            showBmi.textContent = "Fill the height field!";
        }
        if(weight == "") {
            showBmi.textContent = "Fill the weight field!";
        }
        if(height == "" && weight == "") {
            showBmi.textContent = "Fill the height and weight fields!"
        }    

    let langFormula = checkLanguage();
    let bmi;

    if(height != "") {
        height = height.replace(",", ".");
        weight = weight.replace(",", ".");
    }

    if(langFormula == 'eng') {
        // height in inches
        bmi = 703 * (weight / (Math.pow(height, 2)));
    }

    if(langFormula == 'usa') {
        height = height * 12;  // height in feet
        bmi = 703 * (weight / (Math.pow(height, 2)));
    }
    
    bmi = bmi.toFixed(2);
    return bmi;
}

function calcBmi() {
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    let bmiResult = setFields(height, weight);
    
    if(height != "" && weight != "") {
        showBmi.textContent = bmiResult;
        
            if(bmiResult < 18.5) {
                showBmi.textContent = `BMI is ${bmiResult} - Under weight`;
                index = 0;
            }
            else if(bmiResult >= 18.5 && bmiResult < 25) {
                showBmi.textContent = `BMI is ${bmiResult} - Normal weight`;
                index = 1;
            }
            else if(bmiResult >= 25 && bmiResult < 30) {
                showBmi.textContent = `BMI is ${bmiResult} - Overweight`;
                index = 2;
            }
            else if(bmiResult >= 30 && bmiResult < 35) {
                showBmi.textContent = `BMI is ${bmiResult} - Class 1 Obesity`;
                index = 3;
            }
            else if(bmiResult >= 35 && bmiResult < 40) {
                showBmi.textContent = `BMI is ${bmiResult} - Class 2 Obesity`;
                index = 4;
            }
            else if(bmiResult >= 40) {
                showBmi.textContent = `BMI is ${bmiResult} - Morbid Obesity`;
                index = 5;
            }      

        removeSelectedBmi();
        bmiParagraphs[index].classList.add("color");
    }
}