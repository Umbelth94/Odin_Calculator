const display = document.querySelector('#display');
const numButtons = document.querySelectorAll('.numbutt');
const clearButton = document.querySelector('#clear');
const operandButtons = document.querySelectorAll('.operand');
const equalsButton = document.querySelector('#equals');

let operatorPressed = '';
let firstNum =''; //Attempt to make firstNum a string that can be turned into a number later.
let secondNum='';
let isFirst = true;
let result = 0;

//combine all number button listeners into one eventListener function
numButtons.forEach(button => {
    button.addEventListener('click',() => {
            display.textContent += button.textContent;
            if(isFirst){
                firstNum += button.textContent;
                console.log('first number ' + firstNum);
            } else {
                secondNum += button.textContent;
                console.log('second number ' + secondNum);
            }
    })
});

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
        //Order of operations:
            //
        else if (!isFirst){ //If the second number has been entered
            console.log(button.id);
            if (button.id == 'add'){
                operatorPressed = 'add';
                firstNum = operate(operatorPressed, +firstNum, +secondNum);
                secondNum = '';
                display.textContent = firstNum;
            } else if (button.id =='subtract'){
                operatorPressed = 'subtract';
            } else if (button.id == 'multiply'){
                operatorPressed = 'multiply';
            } else if (button.id == 'divide'){
                operatorPressed = 'divide';
            }
        }
})});

function displayNumber(number){
    display.textContent = number;
};



// = button
equalsButton.addEventListener('click', () => {
   result = operate(operatorPressed,+firstNum,+secondNum);
   console.log(result);
   firstNum = result; //Set the result to the first number so that the next input is always the second number variable
   secondNum = ''; //"reset" second number variable.  
   display.textContent = result;   
   isFirst = true;
});

//Clear all function
function clearAll(){
    display.textContent = '';
    firstNum = '';
    secondNum ='';
    isFirst = true;
    result = 0;
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