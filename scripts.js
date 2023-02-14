//TO DO LIST
    //Clean up numButton listener (priority)
        //Does the "display.textContent" functionality need to be tucked in it's own code or can it be moved to where the operations go?
    //Take a final look at code to see what I can rename/refactor and simplify.
    //Run some tests utilizing negative number functionality to make sure it works properly
    //New background for page(image, perhaps), 
    //Stylize page + watermark + Github Link
//KNOWN BUGS
    

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
let operandOn = false; //A toggle to make sure there is a second input after hitting an operand to solve equations, instead of equals button
let operatorPressed = '';
let firstNum =''; 
let secondNum='';
let storedSecondNum = '';
let isFirst = true; 
let result = 0;
let postDisplay = false; //Checks if the number on the display is the result of an equation.
let isPositive = true; //A check that is mostly used for the positive/negative button

function numberInputGrow(){
    let displayWidth = document.getElementById('display').offsetWidth;
    if (displayWidth <= 250){
        let sizeString = document.getElementById('display').style.fontSize;
        let size = Number(sizeString.replace('px',''));
        if (size < 50){
            size += 5;
            document.getElementById('display').style.fontSize = `${size}px`;
        }
    } else {
        return;
    }};

function setInputSize(){
    let resultWidth = document.getElementById('display').offsetWidth;
    let inputSizeString = document.getElementById('display').style.fontSize;
    let inputSize = Number(inputSizeString.replace('px',''));
    if (resultWidth > 265){
        while(resultWidth > 265 && inputSize >=23){
            inputSize -= 3;
            document.getElementById('display').style.fontSize = `${inputSize}px`;
            resultWidth = document.getElementById('display').offsetWidth;
        }}};

function numberInputSizeReset(){
    document.getElementById('display').style.fontSize = '50px';
    console.log('input size reset');
};

function faceSwitch(bmoFace,opacity){
    document.getElementById('displaycontainer').style.background = `linear-gradient(rgba(128, 229, 209, ${opacity}),rgba(128, 229, 209, ${opacity})),url(./images/${bmoFace}.jpeg)`
    document.getElementById('displaycontainer').style.backgroundSize = '300px';
}

//Adds 'pressed' class to buttons for effects 
window.addEventListener('keydown',(event) =>{
    let keyPressed = event.key;
    if (event.key == 'Delete'){
        document.getElementById('Clear').click();
    } else {
        document.getElementById(keyPressed).classList.add('pressed');
        document.getElementById(keyPressed).click();
    }
});

//Event listener for all buttons so that they can revert back to unpressed mode
allButtons.forEach(button => button.addEventListener('transitionend',removeTransition))
function removeTransition(e,){
    if(e.propertyName !== 'transform') return;
    this.classList.remove('pressed');
}

function checkForDecimal(button){
    let isFirstDecimalUsed = false;
    let isSecondDecimalUsed = false;
    if (button.textContent == '.'){
        if(isFirst && firstNum.includes('.')){
            isFirstDecimalUsed = true;
        } else {
            isFirstDecimalUsed = false;
        }
        if (!isFirst && secondNum.includes('.')){
            isSecondDecimalUsed = true;
        } else {
            isSecondDecimalUsed = false;
        }
    }
    if ((button.textContent == '.' && isFirstDecimalUsed && isFirst) ||
        (button.textContent == '.' && isSecondDecimalUsed && !isFirst)){
            console.log('should not be entering a decimal');
            return true;
        } else {
            return false;
        }
};

//combine all number button listeners into one eventListener function
numButtons.forEach(button => {
    button.addEventListener('click',() => {
        setInputSize();
        // numberInputShrink();
        let displayWidth = document.getElementById('display').offsetWidth;

        if (displayWidth >= 278){ //If display tries going off screen, stop inputs
            alert('That numbers too big dude');
            return;
        } 
        else {
            if (checkForDecimal(button)) { //If there is a decimal already entered, return
                return;
            } else {
                faceSwitch('bmoSurprised','0.7');

                //If the last equation was just solved and you hit a new number, clear screen
                if(postDisplay){ 
                    clearAll();
                    faceSwitch('bmoSurprised','0.7');
                    postDisplay = false;
                }

                //Display the button content depending on if it is post operand or not
                if(operandOn){
                    display.textContent = '';
                    operandOn = false;
                    display.textContent += button.textContent;
                } else if(!operandOn){
                    display.textContent += button.textContent; //Display the number pressed
                }

                //Assign the button content to firstNum or secondNum variables
                if(isFirst){ 
                    firstNum += button.textContent;
                    console.log('first number ' + firstNum);
                } else {
                    secondNum += button.textContent;
                    console.log('second number ' + secondNum);
                }}}})});


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
            firstNum = +firstNum; 
            display.textContent = ''; //blanks out display
            isFirst = false; //Sets the next number input to the second number
            isPositive = true; 
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
    operatorPressed = op; //updates the next operator to be used
    isSecondDecimalUsed = false;
    secondNum ='';
    display.textContent = '';
    equationDisplayOne.textContent = firstNum;
    equationDisplayTwo.textContent = lastOperandSymbol;
    operandOn = true; 
    isPositive = true;
}

// +/- button
posnegButton.addEventListener('click',()=> {
    setInputSize();
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

    //If certain inputs are blank, don't function
    if((firstNum == '' && isFirst)|| (firstNum != '' && isFirst && storedSecondNum == '') || (!isFirst && secondNum == '')){
        return;
    }

    //If divide by zero
    if(Number(secondNum) == 0 && operatorPressed == 'divide' && secondNum != ''){ //If divide by zero
        console.log('didthething');
        clearAll();
        faceSwitch('bmoMad','0');
        return;
    }

    //If there is a second number provided, operate regularle
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
        setInputSize();
        isFirst = true;
        postDisplay = true;
        isPositive = true;

    //If the second number has not been provided, operate based on most recent input
    } else if(secondNum == ''){
        faceSwitch('bmoProud','0.7');
        equationDisplayOne.textContent = firstNum;
        equationDisplayTwo.textContent = lastOperandSymbol + storedSecondNum + ' = ';
        result = operate(operatorPressed,+firstNum,storedSecondNum);//Calls the stored second number
        firstNum = result;
        display.textContent = result;
        setInputSize();
        postDisplay = true;
        isPositive = true;
    }
});

//Delete button
deleteButton.addEventListener('click',() => {
    if (postDisplay){
        clearAll();
        return;
    } else {
        numberInputGrow();
        if(isFirst){
            firstNum = firstNum.slice(0,firstNum.length -1);
            display.textContent = firstNum;
        } else {
            secondNum = secondNum.slice(0,secondNum.length -1);
            display.textContent = secondNum;
    }}
});

//Clear all function
function clearAll(){
    numberInputSizeReset();
    faceSwitch('bmoHappy','0');
    equationDisplayOne.textContent = '';
    equationDisplayTwo.textContent = '';
    display.textContent = '';
    firstNum = '';
    secondNum ='';
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