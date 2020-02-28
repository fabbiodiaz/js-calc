//default display
const display = document.getElementById("display")

// Random acess memory
// Registers : float point numbers, only 8 digits or less are avaliable
// flag : String
const memory = { flag:null, xRegister:"0", yRegister:"0", displayLimit:999, decimalInput:false,

    getFlag: () => memory.flag,
    setFlag: flag => memory.flag = flag,
    getX: () => memory.xRegister,
    setX: newX => memory.xRegister = newX,
    getY: () => memory.yRegister,
    setY: newY => memory.yRegister = newY,
    getDisplayLimit: () => memory.displayLimit,
    setDisplayLimit: newDisplayLimit => displayLimit = newDisplayLimit,
    getDecimalInput: () => memory.decimalInput,
    setDecimalInput: decimalInput => memory.decimalInput = decimalInput,
    clear:() => {
        memory.flag = null
        memory. xRegister = "0"
        memory.yRegister = "0"
    },

}

//default operations
operations = {
    
    // data reciever
    input:(data,type) => {
        if (type == "number") {
            operations.inputNumber(data)
        }
        if (type == "operation") {
            operations.inputFlag(data)
        }
        if (type == "command") {
            operations[data]()
        }
        operations.displayInput(memory.getX(),display)
    },
    
    // aux functions
    memoryStatus: () => [!!memory.getFlag(),!!parseInt(memory.getX()),!!parseInt(memory.getY())],
    memoryUsage: () => [!!memory.getFlag(), memory.getX().toString().length, memory.getY().toString().length],
    removeZeros: input => {
        let inputArr = input.split("")
        let firstSignificantDigitIndex = 0
        let lastSignificantDigitIndex = input.length
        let findSignificantZero = false
        for (let i=0 ; i < input.length ; i++) {
            if (inputArr[i] == ".") findSignificantZero = true
            if (inputArr[i] == "0") {
                firstSignificantDigitIndex = i+1
            } else {break}
        }
        for (let i=input.length-1 ; i != 0 ; i--) {
            if (inputArr[i] == "0" || inputArr[i] == "." && !findSignificantZero) {
                lastSignificantDigitIndex = i
            } else {break}
        }
        let output = input.substring(firstSignificantDigitIndex,lastSignificantDigitIndex)
        return findSignificantZero ? "0".concat(output) : output
        
    },

    
    // arithimetic operations
    plus:(firstNum,secondNum) => firstNum + secondNum,
    minimus: (firstNum,secondNum) => firstNum - secondNum,
    mult: (firstNum,secondNum) => firstNum * secondNum,
    divide: (firstNum,secondNum) => firstNum / secondNum,
    
    //memory input
    inputNumber: (number,acceptZero=false) => {
        //verify is there is some done operation result in memory
        if (memory.getFlag() == "clear") {
            memory.clear()
        } 
        //verify the need of a shift (xRegister to yRegister)
        let memoryStatus = operations.memoryStatus()
        if( memoryStatus[0] && !memoryStatus[2] && memory.getX() != "0.") {
            memory.setY(operations.removeZeros(memory.getX()))
            memory.setX("0")
        } 
        let xRegister = memory.getX()
        xRegister = xRegister.concat(number)

        //remove unecessary zeros
        xRegister = operations.removeZeros(xRegister)

        //verify  if there is room for a new input
        if (xRegister.length <= memory.getDisplayLimit()){
            memory.setX(xRegister)
        }
    },
    
    inputFlag: flag => {
        //verify is there is other flag set, and if so, erease it or solve the operation
        let memoryStatus = operations.memoryStatus()
        if(memoryStatus[0] && memoryStatus[2]) {
            operations.equals()
        }
        memory.setFlag(flag)
    },
    
    // equals
    equals:() => {
        let result = memory.setX(memory.getFlag() ? operations[memory.getFlag()](parseFloat(memory.getY()),parseFloat(memory.getX())) : parseFloat(memory.getX()))
        memory.clear()
        //converts the number to integer or to the shorterst (length) decimal
        result = result.toFixed(3)
        operations.inputNumber(operations.removeZeros(result))
        memory.setFlag("clear")
    },
    
    // clear
    clear:() => memory.clear(),
    
    // backspace
    backspace: () => {
        let number = memory.getX()
        
        if( (number.length != 0 && !memory.getFlag()) || (memory.getY() != 0 && memory.getFlag()) ) {
            number = number.substring(0,number.length-1)
            memory.setX("0")
            operations.inputNumber(number)
        }  
        if (memory.getFlag() == "clear") {operations.clear()}
    },
    
    // invert
    invert: () => {
        let number = memory.getX()
        number = number == "0" ? "0" : parseFloat(number) * -1
        memory.setX(number.toString())
    },
    
    // dot (.) operator
    decimal: () => {
        let memoryUsage = operations.memoryUsage()
        //define if it needs a additional zero input
        if ( !memoryUsage[0] && !memoryUsage[1] || memoryUsage[0] && !memoryUsage[2] || memory.getFlag() == "clear") {
            operations.inputNumber("0.")
        } else {
            operations.inputNumber(".")
        }
    },
    
    // screen printing
    displayInput:(input, display) => {
        display.innerHTML = input
    }
}



keys = document.querySelectorAll(".number, .command, .operation")
keys.forEach(key => {
    key.onclick = event => {
        operations.input(key.id,key.className)
    }
})