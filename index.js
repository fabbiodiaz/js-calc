// catch the button elements and set a function to the event 'onclick'
inputButtons = [...document.getElementsByClassName('input')]
inputButtons.forEach(button => button.onclick = event => {
    memory.inputData(button.id)
    updateDisplay(memory.xRegister)
})
// set the same event to the decimal button, but with a literal '.' as parameter
decimalButton = document.getElementById('decimal')
decimalButton.onclick = event => {
    memory.inputData('.')
    updateDisplay(memory.xRegister)
}
// set the function memory.clear() to the 'CE' button
clearButton = document.getElementById('clear')
clearButton.onclick = event => {
    memory.clear()
    updateDisplay(memory.xRegister)
}
// set the function memory.backspace() to the 'backspace' button
clearButton = document.getElementById('backspace')
clearButton.onclick = event => {
    memory.backspace()
    updateDisplay(memory.xRegister)
}
commandButtons = [...document.getElementsByClassName('command')]
commandButtons.forEach(button => button.onclick = event => {
    memory[button.id](memory.xRegister)
    updateDisplay(memory.xRegister)
})
operationButtons = [...document.getElementsByClassName('operation')]
operationButtons.forEach(button => button.onclick = event => {
    memory.InputFlag(button.id)
    updateDisplay(memory.xRegister)
})

//set default display
const display = document.getElementById("display")

//display update function
const updateDisplay = input => {
    // if the value is a empty string value, or any error value, display '0'
    let finalInput = input == '' || !input ? '0' : input
    if (memory.countDigits(finalInput) > memory.memoryLimit) {
        finalInput = 'err'
        memory.clear()
    }
    display.innerHTML = finalInput
}

const memory = {
    xRegister:'',
    yRegister:'',
    flag:'',
    memoryLimit:8,
    neutralElements:{
        plus:0,
        minimus:0,
        mult:1,
        divide:1,
    },
    // aux functions
    
    // verify if a input number string is a representation of a decimal value (if it have a decimal dot '.')
    isDecimal:(numberStr) => numberStr.split('').filter(char => char == '.').length > 0 ,
    // returns the cont of numeral digits in a number string (ignores '-' and '.')
    countDigits:(numberStr) => numberStr.split('').filter(char => char != '.' && char != '-').length ,
    // decides if the input is a null number ('0', '0.' '0.0...0' or '.0...0')
    isNullValue:(numberStr) => numberStr.split('.').filter(value => parseInt(value) != 0 && value !='' && value != '-').length == 0 ,
    stringParser:string => parseFloat(string == '' || !string ? '0' : string),
    // operations solver
    solve:(flag,xVal,yVal) => memory.removeZeros(
        memory[flag](
            memory.stringParser(xVal),
            memory.stringParser(yVal)
            ).toFixed(3)),
    // remove nom significant zeros at the ond of the number
    removeZeros: numberStr => {
        // search for non-significant zeros at the ond of the number
        for (let i=numberStr.length-1 ; i !=0 ; i--) {
            if(numberStr.substring(i,numberStr.length) == '0') {
                numberStr = numberStr.substring(0,numberStr.length-1)
            } else {break}
        }
        // if it ends with a '.', remove it
        if (numberStr.substring(numberStr.length-1,numberStr.length) == '.') {
            numberStr = numberStr.substring(0,numberStr.length -1)
        }
        return numberStr
    },
    // operation for menage the data shifting
    dataShift: () => {
        // 
        if (memory.flag != '' && memory.yRegister == '') {
            memory.yRegister = memory.xRegister
            memory.xRegister = ''
        }
    },
    
    // default input data function
    inputData: (data) => {
        // if the number is a result of a previous operation, ignore the input
        if (memory.flag == 'equals') return
        // verify data shifting
        memory.dataShift()
        // if the input is a decimal dot and the number already have one decimal dot, just ignore
        if (data == '.' && memory.isDecimal(memory.xRegister)) return
        // if the resultant input is zero, ignore tne input 
        // (it will not apply with zeros at the right of a decimal dot)
        if (!memory.isDecimal(memory.xRegister) && memory.isNullValue(memory.xRegister.concat(data)) && data == '0') return 
        // Case xRegister is zero ('') and 'decimal' is pressed, the input mut be with a '0' before it
        if (memory.xRegister == '' && data == '.') data = '0.'
        // if the number of digits of the stored number is equals to the memory limit, ignore the entry
        if (memory.countDigits(memory.xRegister) == memory.memoryLimit) return
        // if everythig's alright, concat the input data with the stored value
        memory.xRegister = memory.xRegister.concat(data)
    },
    
    // command buttons functions
    clear:() => [memory.xRegister,memory.yRegister,memory.flag] = ['','',''],
    
    backspace: () => {
        // if the xRegister is the result of a previous operation, ignore
        if (memory.flag == 'equals') return
        // if xRegister is null, don't do anything
        if (memory.xRegister.length == 0) return 
        // backspace
        memory.xRegister = memory.xRegister.substring(0,memory.xRegister.length-1)
        // if the resulting xRegister is '-', erease it
        if (memory.xRegister == '-') {memory.xRegister = ''}
        // if the resulting xRegister is '-0.' or '0.', erease it
        if (memory.xRegister == '-0.' || memory.xRegister == '0.') {memory.xRegister = ''}
    },
    
    invert: () => {
        // if xRegister is null, don't do anything
        if (memory.isNullValue(memory.xRegister)) return 
        // if it already is a negative number, remove it. if not, add a '-' in the beggining of the string
        memory.xRegister.split('').indexOf('-') == 0 ? 
        memory.xRegister = memory.xRegister.substring(1,memory.xRegister.length) :
        memory.xRegister = '-'.concat(memory.xRegister)
    },
    
    equals: () => {
        memory.dataShift()
        if (memory.xRegister == '') {
            memory.xRegister = memory.neutralElements[memory.flag]
        }
        if(memory.flag) {
            memory.xRegister = memory.solve(memory.flag,memory.xRegister,memory.yRegister)
            memory.flag = 'equals'
            memory.yRegister=''
        }

    },

    // operation functions ( called only by memory.equals() )
    plus:(xReg,yReg) => yReg + xReg,
    minimus:(xReg,yReg) => yReg - xReg,
    mult:(xReg,yReg) => yReg * xReg,
    divide:(xReg,yReg) => yReg / xReg,
    
    // operations common function
    InputFlag: (flag) => {
        if (memory.flag != 'equals' ) {memory.equals()}
        memory.flag = flag
    },
    
}

