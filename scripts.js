//TO DO LIST
    //ADD HOVER/CLICK FUNCTIONALITY TO BUTTONS (priority)
    //ADD FLOATING NUMBERS RESTRICTION SO THEY DON'T OVERFLOW
    //Add button to turn off or change BMO's face.
    //Have BMO's face fade (or change) when numbers are on the screen
//KNOWN BUGS
    //BMO's face appears when entering a new number after an equation

//Some of these id's are named after the corresponding keyboard button that activates the buttons
const display = document.querySelector('#display');
const numButtons = document.querySelectorAll('.numbutt');
const clearButton = document.querySelector('#Clear');
const operandButtons = document.querySelectorAll('.operand');
const equalsButton = document.querySelector('#Enter');
const equationDisplay = document.querySelector('#equationdisplay');
const posnegButton = document.querySelector('#Control');
const deleteButton = document.querySelector('#Backspace');
const displayContainer = document.getElementById('displaycontainer').style.backgroundColor;

equationDisplay.textContent = '';
let lastOperandSymbol = '';
let operandOn = false; //A toggle to make sure there is a second input after hitting an operand
let operatorPressed = '';
let firstNum =''; 
let secondNum='';
let storedSecondNum = '';
let isFirst = true; 
let result = 0;
let postDisplay = false; //Checks if the number on the display is the result of an equation.
let isPositive = true; //A check that is mostly used for the positive/negative button

//event listener for number buttons
window.addEventListener('keydown',(event) =>{
    let keyPressed = event.key;
    console.log(keyPressed);
    document.getElementById(keyPressed).click();
   });

//combine all number button listeners into one eventListener function
numButtons.forEach(button => {
    button.addEventListener('click',() => {
        document.getElementById('displaycontainer').style.background = 'rgb(128,229,209)';
        if(postDisplay){
            clearAll();
            postDisplay = false;
        }
        if(!operandOn){
            display.textContent += button.textContent;
        }
        else if(operandOn){
            display.textContent = '';
            operandOn = false;
            display.textContent += button.textContent;
            }
        if(isFirst){
                firstNum += button.textContent;
                console.log('first number ' + firstNum);
            } else {
                secondNum += button.textContent;
                console.log('second number ' + secondNum);
            }
        })});

//Combine all of the operating buttons except for = into one eventlistener 
operandButtons.forEach(button => {
    button.addEventListener('click', () => {
        postDisplay = false;
        if (isFirst){ //If the first number has not been entered
            firstNum = +firstNum; //converts first numberstring to number
            display.textContent = ''; //blanks out display
            isFirst = false; //Sets the next number input to the second number
            isPositive = true;
            console.log(button.id);
            lastOperandSymbol = button.textContent;//stores the most recent operand symbol for use in the display
            equationDisplay.textContent = firstNum + lastOperandSymbol;
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
    secondNum ='';
    display.textContent = '';
    equationDisplay.textContent = firstNum + lastOperandSymbol;
    operandOn = true;
    isPositive = true;
}

function displayNumber(number){
    display.textContent = number;
};

// +/- button
posnegButton.addEventListener('click',()=> {
    //May need a function to check if the strings have an '-' already
    if ((isFirst && firstNum != '') || (!isFirst && secondNum != '')) //Checks if a number is entered (either first OR second)
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
    if(secondNum != ''){
        result = operate(operatorPressed,+firstNum,+secondNum);
        console.log(result);
        firstNum = result; //Set the result to the first number so that the next input is always the secondNum variable
        storedSecondNum = +secondNum; //Stores a number to be used as the second value, should one not be entered
        equationDisplay.textContent += secondNum + '= ';
        secondNum = ''; //"reset" second number variable.  
        display.textContent = result;   
        isFirst = true;
        postDisplay = true;
        isPositive = true;
    } else if(secondNum == ''){
        equationDisplay.textContent = firstNum + lastOperandSymbol + storedSecondNum + '= '; 
        result = operate(operatorPressed,+firstNum,storedSecondNum);//Calls the stored second number
        firstNum = result;
        display.textContent = result;
        postDisplay = true;
        isPositive = true;
    }
});

//Delete button
deleteButton.addEventListener('click',() => {
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
    document.getElementById('displaycontainer').style.background = 'url(./bmo9.jpeg)'
    document.getElementById('displaycontainer').style.backgroundSize = '300px';
    displayContainer.back
    equationDisplay.textContent = '';
    display.textContent = '';
    firstNum = '';
    secondNum ='';
    isFirst = true;
    result = 0;
    operandOn = false;
    storedSecondNum = '';
    isPositive = true;
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
    if (b == '0' || b == 0){
        console.log('nice try');
        postDisplay = true;
        return 'Nice try, wise guy';
    }
    console.log ('divide ' + a + '/' + b + '=' + a/b);
    return a / b;
}

function operate(operator, a, b){ 
    if (operator == 'add'){
        console.log('add' + a + '+' + b);
        return add(a,b);
    } else if (operator == 'subtract'){
        console.log('subtract' + a + b);
        return subtract(a,b);
    } else if (operator =='multiply'){
        console.log('multiply' + a + b);
        return multiply(a,b);
    } else if (operator =='divide'){
        console.log('divide' + a + b);
        return divide(a,b);
    }
};