//TO DO LIST
    //Clean up numButton listener (priority)
        //Does the "display.textContent" functionality need to be tucked in it's own code or can it be moved to where the operations go?
        //Try to make a function to contain the conditions for the decimal check
    //Take a final look at code to see what I can rename/refactor and simplify.
    //Run some tests utilizing negative number functionality to make sure it works properly
    

    //New background for page(image, perhaps), 
//KNOWN BUGS
    //Fix the operand displaying incorrectly when stringing different operations together

//Some of these id's are named after the corresponding keyboard button that activates the buttons
const display = document.querySelector('#display');
const numButtons = document.querySelectorAll('.numbutt');
const clearButton = document.querySelector('#Clear');
const operandButtons = document.querySelectorAll('.operand');
const equalsButton = document.querySelector('#Enter');
const equationDisplayOne = document.querySelector('#equationdisplayone');
const equationDisplayTwo = document.querySelector('#equationdisplaytwo')
const posnegButton = document.querySelector('#Control');
const deleteButton = document.querySelector('#Backspace');
const decimalButton = document.querySelector('.decimal');
const allButtons = document.querySelectorAll('button'); 

equationDisplayOne.textContent = '';
equationDisplayTwo.textContent = '';
let lastOperandSymbol = '';
let operandOn = false; //A toggle to make sure there is a second input after hitting an operand
let operatorPressed = '';
let firstNum =''; 
let firstNumString ='';
let secondNum='';
let secondNumString = '';
let storedSecondNum = '';
let isFirst = true; 
let result = 0;
let postDisplay = false; //Checks if the number on the display is the result of an equation.
let isPositive = true; //A check that is mostly used for the positive/negative button


let isFirstDecimalUsed = false;
let isSecondDecimalUsed = false;

// let displayWidth = document.getElementById('display').offsetWidth;
// let sizeString = document.getElementById('display').style.fontSize;
function numberInputShrink(){
    let displayWidth = document.getElementById('display').offsetWidth;
    if (displayWidth >= 270){
            let sizeString = document.getElementById('display').style.fontSize;
            let size = sizeString.replace('px','');
            size = Number(size);
            if(size > 20){
                size -= 5;
                document.getElementById('display').style.fontSize = `${size}px`
            } else {
                return
    }}};

function numberInputGrow(){
    let displayWidth = document.getElementById('display').offsetWidth;
    if (displayWidth <= 260){
        console.log('display width' + displayWidth);
        let sizeString = document.getElementById('display').style.fontSize;
        let size = sizeString.replace('px','');
        size = Number(size);
        if (size < 50){
            console.log('should be growing');
            size += 5;
            document.getElementById('display').style.fontSize = `${size}px`;
        }
    } else {
        return;
    }
}

function getResultSize(){
    let resultWidth = document.getElementById('display').offsetWidth;
    console.log('getResultSize > resultWidth = ' + resultWidth);
    let totalDisplayWidth = document.getElementById('displaycontainer').offsetWidth;
    console.log('getREsultSize > totalDisplayWidth = ' + totalDisplayWidth);
    if (resultWidth > 280){
        let inputSizeString = document.getElementById('display').style.fontSize;
        let inputSize = inputSizeString.replace('px','');
        console.log(inputSize);
        inputSize = Number(inputSize);
        console.log(inputSize);
        while(resultWidth > 280){
            inputSize -= 5;
            document.getElementById('display').style.fontSize = `${inputSize}px`;
            resultWidth = document.getElementById('display').offsetWidth;
        }
    }
}

function numberInputSizeReset(){
    document.getElementById('display').style.fontSize = '50px';
    console.log('input size reset');
};


function checkForDecimal(){
    //Create a function here to cut down on the clutter in the numButtons function
};


function faceSwitch(bmoFace,opacity){
    document.getElementById('displaycontainer').style.background = `linear-gradient(rgba(128, 229, 209, ${opacity}),rgba(128, 229, 209, ${opacity})),url(./images/${bmoFace}.jpeg)`
    document.getElementById('displaycontainer').style.backgroundSize = '300px';
}

//Event listener for all buttons so that they can revert back to unpressed m
allButtons.forEach(button => button.addEventListener('transitionend',removeTransition))

function removeTransition(e,){
    if(e.propertyName !== 'transform') return;
    this.classList.remove('pressed');
}


window.addEventListener('keydown',(event) =>{
    let keyPressed = event.key;
    if (event.key == 'Delete'){
        document.getElementById('Clear').click();
    } else {
        document.getElementById(keyPressed).classList.add('pressed');
        document.getElementById(keyPressed).click();
    }
   });

//combine all number button listeners into one eventListener function
numButtons.forEach(button => {
    button.addEventListener('click',() => {
        numberInputShrink();
        let displayWidth = document.getElementById('display').offsetWidth;
        if (displayWidth >= 278){ //If display tries going off screen, stop inputs
            alert('That numbers too big dude');
            return;
        } else {
        faceSwitch('bmoSurprised','0.7');
        if(postDisplay){ //If the last equation was just solved and you hit a new number
            clearAll();
            faceSwitch('bmoSurprised','0.7');
            postDisplay = false;
        }
        if(!operandOn){ //Clean up these operand buttons.  Maybe move "display.textcontent" to a different part of the function? 
            if ((button.textContent == '.' && isFirstDecimalUsed == true && isFirst) ||
                (button.textContent == '.' && isSecondDecimalUsed == true && !isFirst)){
                    console.log('should not be entering a decimal')
                    return;}
            else {
                display.textContent += button.textContent; //Display the number pressed
            }
        }
        else if(operandOn){
                if ((button.textContent == '.' && isFirstDecimalUsed == true) ||
                    (button.textContent == '.' && isSecondDecimalused == true)){
                        console.log('should not be entering a decimal')
                        return;
                } else {
                    display.textContent = '';
                    operandOn = false;
                    display.textContent += button.textContent;
                }}
        if (button.textContent =='.'){
            console.log('. button pushed');
            if(isFirst && firstNum.includes('.')){
                console.log('first should be returning');
                isFirstDecimalUsed = true;
                return;
            } else{
                if(isFirst){
                    isFirstDecimalUsed = true;
                    console.log('entering first number instead');
                    firstNum += button.textContent;
                    firstNumString += button.textContent;
                    console.log('first number ' + firstNum);
                } else if(!isFirst){
                    isSecondDecimalUsed = true;
                    console.log('entering second number instead');
                    secondNum += button.textContent;
                    secondNumString += button.textContent;
                    console.log('second number ' + secondNum);
                }
            }
            if(!isFirst &&secondNum.includes('.')){
                console.log('should be returning');
                isFirstDecimalUsed = true;
                return;} 
        }
        else {
            if(isFirst){
                    firstNum += button.textContent;
                    firstNumString += button.textContent
                    console.log('first number ' + firstNum);
            } else {
                    secondNum += button.textContent;
                    secondNumString += button.textContent
                    console.log('second number ' + secondNum);
                }

        }
                }})});
       

//Combine all of the operating buttons except for = into one eventlistener 
operandButtons.forEach(button => {
    button.addEventListener('click', () => {
        numberInputSizeReset();
        postDisplay = false;
        if ((firstNum == '' && isFirst) || (secondNum== '' && !isFirst)){
            return;
        }
        if (isFirst){
            faceSwitch('bmoSurprised','0.7')
            firstNum = +firstNum; //converts first numberstring to number
            display.textContent = ''; //blanks out display
            isFirst = false; //Sets the next number input to the second number
            isPositive = true;
            console.log(button.id);
            lastOperandSymbol = button.textContent;//stores the most recent operand symbol for use in the display
            equationDisplayOne.textContent = firstNum;
            equationDisplayTwo.textContent = lastOperandSymbol;
            if (button.id == '+'){
                operatorPressed = 'add';
            } else if (button.id =='-'){
                operatorPressed = 'subtract';
            } else if (button.id == '*'){
                operatorPressed = 'multiply';
            } else if (button.id == '/'){
                operatorPressed = 'divide';
            }
        } else if (!isFirst){ //If the second number has been entered
            console.log(button.id);
            lastOperandSymbol = button.textContent;
            faceSwitch('bmoProud','0.7');
            if (button.id == '+'){
                solveWithOperator('add');
            } else if (button.id =='-'){
                solveWithOperator('subtract');
            } else if (button.id == '*'){
                solveWithOperator('multiply');
            } else if (button.id == '/'){
                solveWithOperator('divide');
            }
        }
})});

//function that solves the equation upon pressing another operand instead of the equals button.
function solveWithOperator(op){
    firstNum = operate(operatorPressed, +firstNum, +secondNum); //calculates using the PREVIOUSLY PRESSED operator
    // lastOperandSymbol = this.textContent;
    operatorPressed = op; //updates the next operator to be used
    isSecondDecimalUsed = false;
    secondNum ='';
    display.textContent = '';
    equationDisplayOne.textContent = firstNum;
    equationDisplayTwo.textContent = lastOperandSymbol;

    operandOn = true;
    isPositive = true;
}

function displayNumber(number){
    display.textContent = number;
};

// +/- button
posnegButton.addEventListener('click',()=> {
    //May need a function to check if the strings have an '-' already
    if ((isFirst && firstNum != '') || (!isFirst && secondNum != '' && !postDisplay)) //Checks if a number is entered (either first OR second)
    { if (isPositive){
        if(isFirst){
            firstNum = '-' + firstNum;
            display.textContent = firstNum;
            isPositive = false;
            //append a '-' in front of the display that is first number
        } else {
            secondNum = '-' + secondNum;
            display.textContent = secondNum;
            isPositive = false;
            //append a '-' in front of the display that is the second number
        }
    } else {
        if(isFirst){
            firstNum = firstNum.slice(1);
            display.textContent = firstNum;
            isPositive = true;
        } else {
            secondNum = secondNum.slice(1);
            display.textContent = secondNum;
            isPositive = true;
        }}}});



// = button
equalsButton.addEventListener('click', () => {
    numberInputSizeReset();
    if((firstNum == '' && isFirst)|| (firstNum != '' && isFirst && storedSecondNum == '') || (!isFirst && secondNum == '')){
        return;
    }
    if(Number(secondNum) == 0 && operatorPressed == 'divide' && secondNum != ''){ //If divide by zero
        console.log('didthething');
        clearAll();
        faceSwitch('bmoMad','0');
        return;
    }
    if(secondNum != ''){
        isFirstDecimalUsed = false;
        isSecondDecimalUsed = false;
        faceSwitch('bmoProud','0.7');
        result = operate(operatorPressed,+firstNum,+secondNum);
        console.log(result);
        // equationDisplayOne.textContent += firstNum + lastOperandSymbol;
        equationDisplayTwo.textContent = lastOperandSymbol + secondNum + ' =';
        firstNum = result; //Set the result to the first number so that the next input is always the secondNum variable
        storedSecondNum = +secondNum; //Stores a number to be used as the second value, should one not be entered
        secondNum = ''; //"reset" second number variable.  
        display.textContent = result;   
        getResultSize();
        isFirst = true;
        postDisplay = true;
        isPositive = true;
    } else if(secondNum == ''){
        faceSwitch('bmoProud','0.7');
        equationDisplayOne.textContent = firstNum;
        equationDisplayTwo.textContent = lastOperandSymbol + storedSecondNum + ' = ';
        result = operate(operatorPressed,+firstNum,storedSecondNum);//Calls the stored second number
        firstNum = result;
        display.textContent = result;
        getResultSize();
        postDisplay = true;
        isPositive = true;
    }
});

//Delete button
deleteButton.addEventListener('click',() => {
    numberInputGrow();
    if(isFirst){
        firstNum = firstNum.slice(0,firstNum.length -1);
        display.textContent = firstNum;
    } else {
        secondNum = secondNum.slice(0,secondNum.length -1);
        display.textContent = secondNum;
    }
})

//Clear all function
function clearAll(){
    numberInputSizeReset();
    faceSwitch('bmoHappy','0');
    equationDisplayOne.textContent = '';
    equationDisplayTwo.textContent = '';
    display.textContent = '';
    firstNum = '';
    firstNumString = '';
    secondNum ='';
    secondNumString ='';
    isFirst = true;
    result = 0;
    operandOn = false;
    storedSecondNum = '';
    isPositive = true;
    isFirstDecimalUsed = false;
    isSecondDecimalUsed = false;

}

clearButton.addEventListener('click', () => {
    clearAll();
})

function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    // if (b == '0' || b == 0){
    //     faceSwitch('bmoMad','0');
    //     clearAll();
    //     postDisplay = true;
    //     return
    // }
    //^^Try to implement this code instead of using the divide by zero code earlier in the script
    console.log ('divide ' + a + '/' + b + '=' + a/b);
    return a / b;
}

function operate(operator, a, b){ 
    if (operator == 'add'){
        console.log('add' + a + '+' + b);
        return Math.round((add(a,b)) * 10000) / 10000;
    } else if (operator == 'subtract'){
        console.log('subtract' + a + b);
        return Math.round((subtract(a,b)) * 10000) / 10000;
    } else if (operator =='multiply'){
        console.log('multiply' + a + b);
        return Math.round((multiply(a,b)) * 10000) / 10000;
    } else if (operator =='divide'){
        console.log('divide' + a + b);
        return Math.round((divide(a,b)) * 10000) / 10000;
    }
};