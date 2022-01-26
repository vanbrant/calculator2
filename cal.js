let container = document.querySelector('#container')
let calculator = {
    firstValue :null,
    calculation : null,
    secValue : false,
    displayValue:'0',
}

function updateDisplay(){
    let display = document.querySelector('#display')
    display.textContent = calculator.displayValue
}
updateDisplay()

function decimal(input){
    if(input === '.' && calculator.displayValue.includes('.'))
    return;
    else{
        calculator.displayValue +='.'
    }
}

function input(num){
    if(calculator.secValue === true){
        calculator.displayValue = num;
        calculator.secValue = false
    } else{
        if(calculator.displayValue === '0'){
            calculator.displayValue = num
        } else{
            calculator.displayValue += num
        }
    }
}

function calculation(){
    let result;
    if(calculator.displayValue === '0')
    return;
    else if(calculator.firstValue !== null && calculator.calculation !== null){
        calculator.secValue = Number(calculator.displayValue)
        result = equal(Number(calculator.firstValue),calculator.calculation,calculator.secValue)
       calculator.firstValue= result
       calculator.displayValue = result
       calculator.secValue=true
    }
    else{
        calculator.firstValue = calculator.displayValue
        calculator.secValue = true
    }
}

function clear(){
    calculator.displayValue = ''
}

function reset(){
    calculator.displayValue = '0'
    calculator.firstValue = null;
    calculator.secValue = false;
    calculator.calculation = null
}

function backspace(){
calculator.displayValue = calculator.displayValue.slice(0,-1)
}

function equal(firstValue,calculation,secValue){
    if(calculation === '+'){
        return firstValue + secValue
    } else if( calculation ==='-' ){
        return firstValue - secValue
    } else if( calculation ==='*' ){
        return firstValue * secValue
    } else if( calculation ==='/' ){
        return firstValue / secValue
    } else{
        return secValue
    }
    }


container.addEventListener('click',(e)=>{
    if(!e.target.matches('button'))
    return;
    if (e.target.classList.contains('number')){
        input(e.target.textContent)
        updateDisplay();
        return;
    }
    if(e.target.classList.contains('calculation')){
        calculation()
        calculator.calculation = e.target.textContent
        updateDisplay();
        return;
    }
    if(e.target.classList.contains('decimal')){
        decimal(e.target.textContent)
        updateDisplay();
        return;
    }
    if(e.target.classList.contains('clear')){
        clear()
        updateDisplay();
        return;
    }
    if(e.target.classList.contains('reset')){
        reset()
        updateDisplay();
        return;
    }
    if(e.target.classList.contains('backspace')){
        backspace()
        updateDisplay();
        return;
    }
})
window.addEventListener('keydown',(e)=>{
    if(e.key.match(/\d/) && !/^F/.test(e.key)) {
        console.log(e.key)
        input(e.key)
        updateDisplay();
        return;
    } else if(e.key.match(/^[+\-*=/]$/)){
        console.log(e.key)
        calculation()
        calculator.calculation = e.key
        updateDisplay();
        return;
    } else if(e.key.match(/^[.]$/)){
        decimal(e.key)
        updateDisplay();
        return;
    }else if(e.key.match('Backspace')){
        backspace()
        updateDisplay();
        return;
    } else return;
})