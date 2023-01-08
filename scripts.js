const allButtons = document.querySelectorAll('button'); //testing if querySelectorAll works



//Having trouble getting numbers to turn into an Array.  Start by at least getting the code to return the list of number buttons.
const numbers = document.querySelectorAll('.numbutt');
// numbers.forEach((button) => {});
    // button.addEventListener('click', () => {
    //     console.log(button);
    // })});

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