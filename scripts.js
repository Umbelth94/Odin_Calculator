const display = document.querySelector('#display');
const numButtons = document.querySelectorAll('.numbutt');
const clearButton = document.querySelector('#clear');
const minusButton = document.querySelector('#subtract');
const plusButton = document.querySelector('#add');
const equalsButton = document.querySelector('#equals');

let operatorPressed = '';
let firstNum =''; //Attempt to make firstNum a string that can be turned into a number later.
let secondNum='';
let isFirst = true;
let result = 0;

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

function displayNumber(number){
    display.textContent = number;
};

// = button
equalsButton.addEventListener('click', () => {
   result = operate(operatorPressed,+firstNum,+secondNum);
   console.log(result);
   firstNum = result;
   secondNum = ''; //Attempt to reset so that you can continue to operate on more numbers
   display.textContent = result;   
});

// + button
plusButton.addEventListener('click', () => {
    firstNum = +firstNum; //converts number
    display.textContent = '';
    isFirst = false;
    operatorPressed = 'add';
});

// - button
minusButton.addEventListener('click',() => {
    firstNum = +firstNum;
    display.textContent ='';
    isFirst = false;
    operatorPressed = 'subtract'
})


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
        return add(a,b);
    } else if (operator == 'subtract')
    {
        return subtract(a,b);
    } else if (operator =='multiply'){
        return multiply(a,b)
    } else if (operator =='divide'){
        return divide(a,b);
    }
};