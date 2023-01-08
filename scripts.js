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