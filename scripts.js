//TO DO LIST
    //ADD FUNCTIONAL DELETE BUTTON THAT ONLY DELETES ONE DIGIT AT A TIME
    //ADD A DISPLAY TO SHOW EQUATION (OPERAND LOGIC MAY MAKE THIS TRICKY)
    //ADD HOVER/CLIK FUNCTIONALITY TO BUTTONS
    //ADD FLOATING NUMBERS RESTRICTION SO THEY DON'T OVERFLOW

const display = document.querySelector('#display');
const numButtons = document.querySelectorAll('.numbutt');
const clearButton = document.querySelector('#clear');
const operandButtons = document.querySelectorAll('.operand');
const equalsButton = document.querySelector('#equals');

let operandOn = false;
let operatorPressed = '';
let firstNum =''; //Attempt to make firstNum a string that can be turned into a number later.
let secondNum='';
let storedSecondNum = '';
let isFirst = true;
let result = 0;

//combine all number button listeners into one eventListener function
numButtons.forEach(button => {
    button.addEventListener('click',() => {
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
            }})});

//Combine all of the operating buttons except for = into one eventlistener 
operandButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (isFirst){
            firstNum = +firstNum; //converts first numberstring to number
            display.textContent = ''; //blanks out display
            isFirst = false; //Sets the next number input to be the second number
            console.log(button.id);
            if (button.id == 'add'){
                operatorPressed = 'add';
            } else if (button.id =='subtract'){
                operatorPressed = 'subtract';
            } else if (button.id == 'multiply'){
                operatorPressed = 'multiply';
            } else if (button.id == 'divide'){
                operatorPressed = 'divide';
            }
        }
        else if (!isFirst){ //If the second number has been entered
            console.log(button.id);
            if (button.id == 'add'){
                solveWithOperator('add');
            } else if (button.id =='subtract'){
                solveWithOperator('subtract');
            } else if (button.id == 'multiply'){
                solveWithOperator('multiply');
            } else if (button.id == 'divide'){
                solveWithOperator('divide');
            }
        }
})});

function solveWithOperator(op){
    firstNum = operate(operatorPressed, +firstNum, +secondNum); //calculates using the PREVIOUSLY PRESSED operator
    operatorPressed = op; //updates the next operator to be used
    secondNum ='';
    display.textContent = firstNum;
    operandOn = true;
}

function displayNumber(number){
    display.textContent = number;
};



// = button
equalsButton.addEventListener('click', () => {
    if(secondNum != ''){
        result = operate(operatorPressed,+firstNum,+secondNum);
        console.log(result);
        firstNum = result; //Set the result to the first number so that the next input is always the second number variable
        storedSecondNum = +secondNum;
        secondNum = ''; //"reset" second number variable.  
        display.textContent = result;   
        isFirst = true;
    } else if(secondNum == ''){
        result = operate(operatorPressed,+firstNum,storedSecondNum);
        firstNum = result;
        display.textContent = result;
    }
});

//Clear all function
function clearAll(){
    display.textContent = '';
    firstNum = '';
    secondNum ='';
    isFirst = true;
    result = 0;
    operandOn = false;
    storedSecondNum = '';
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
    console.log('multiply ' + a + 'x' + b + '=' + a*b);
    return a * b;
}

function divide(a,b){
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