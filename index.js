//default display
const display = document.getElementById("display")

// Random acess memory
// Registers : float point numbers, only 8 digits or less are avaliable
// flag : String
const memory = { flag:null, xRegister:0, yRegister:0, displayLimit:999,

    getFlag: () => memory.flag,
    setFlag: flag => memory.flag = flag,
    getX: () => memory.xRegister,
    setX: newX => memory.xRegister = newX,
    getY: () => memory.yRegister,
    setY: newY => memory.yRegister = newY,
    clear:() => {
        memory.flag = null
        memory. xRegister = 0
        memory.yRegister = 0
    },
    getDisplayLimit: () => memory.displayLimit,
    setDisplayLimit: newDisplayLimit => displayLimit = newDisplayLimit
    
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
    memoryStatus: () => [!!memory.getFlag(),!!memory.getX(),!!memory.getY()],
    memoryUsage: () => [parseInt(!!memory.getFlag()), memory.getX().toString().length, memory.getY().toString().length],

    // arithimetic operations
    plus:(firstNum=0,secondNum=0) => firstNum + secondNum,
    minimus: (firstNum=0,secondNum=0) => firstNum - secondNum,
    mult: (firstNum=1,secondNum=1) => firstNum * secondNum,
    divide: (firstNum=1,secondNum=1) => firstNum / secondNum,
    
    //memory input
    inputNumber: number => {
        let memoryStatus = operations.memoryStatus()
        if (memory.getFlag() == "clear") {
            memory.clear()
        } 
        //verify the need of a shift (xRegister to yRegister)
        if( memoryStatus[0] && !memoryStatus[2] ) {
            memory.setY(memory.getX())
            memory.setX(0)
        } 
        let xRegisterString = memory.getX().toString()
        xRegisterString = xRegisterString.concat(number)
        newXRegister = parseFloat(xRegisterString)

        //verify  if there is room for a new input
        if (newXRegister.toString().length <= memory.getDisplayLimit()){
            memory.setX(newXRegister)
        }
    },
    inputFlag: flag => {
        //verify is there is other flag set, and if so, 
        let memoryStatus = operations.memoryStatus()
        if(memoryStatus[0] && memoryStatus[2]) {
            operations.equals()
        }
        memory.setFlag(flag)
    },
    
    // equals
    equals:() => {
        let temp = memory.setX(memory.getFlag() ? operations[memory.getFlag()](memory.getY(),memory.getX()) : memory.getX())
        memory.clear()
        temp = temp.toString()
        if (temp.length <= memory.getDisplayLimit()) {
            operations.inputNumber(temp.toString())
            memory.setFlag("clear")
        } else {//erro
        }
    },
    // clear
    clear:() => memory.clear(),
    
    // backspace
    backspace: () => {
        let temp = memory.getX().toString()

        if( (temp.length != 0 && !memory.getFlag()) || (memory.getY() != 0 && memory.getFlag()) ) {
            temp = temp.substring(0,temp.length-1)
            memory.setX(0)
            operations.inputNumber(temp)
        }  
    },
    
    // invert
    invert: () => {
        let temp = memory.getX() * -1
        memory.setX(temp)
    },
    
    // dot (.) operator
    decimal: () => {
        //not implemented yet
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
