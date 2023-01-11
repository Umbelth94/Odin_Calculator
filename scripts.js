const display = document.querySelector('#display');
const numButtons = document.querySelectorAll('.numbutt');

numButtons.forEach(button => {
    button.addEventListener('click',() => {
        console.log(button.textContent);
    })
});

function displayNumber(number){
    display.textContent = number;
}


function add(a,b){
    console.log('add ' + a + '+' + b + '=' + a+b);
    return a + b;
}

function subtract(a,b){
    console.log('subtract ' + a + '-' + b + '=' + a-b);
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
    return operator(a,b);
}