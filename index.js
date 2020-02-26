//default display
const display = document.getElementById("display")

//default arithimetic operations
operations = {
    plus:(firstNum=0,secondNum=0) => firstNum + secondNum,
    minimus: (firstNum=0,secondNum=0) => firstNum - secondNum,
    mult: (firstNum=1,secondNum=1) => firstNum * secondNum,
    divide: (firstNum=1,secondNum=1) => firstNum / secondNum,
    equals:(flag,firstNum,secondNum) => operations[flag](firstNum,secondNum).toString().length > 8 ? null : operations[flag](firstNum,secondNum)
}

// Random acess memory and its methods
const memory = { flag:"", xRegister:"", yRegister:"",

inputNumber:data => {
    
    if (memory.flag && !memory.yRegister) {
        memory.yRegister=memory.xRegister
        memory.xRegister=""
    }

    if (memory.xRegister.toString().length < 8) {
        data = memory.xRegister.toString().concat(data)
            memory.xRegister = parseInt(data)
        }
    },

    inputFlag:data => {
        if (memory.flag) {
            memory.xRegister = operations.equals(memory.flag,memory.yRegister,memory.xRegister)
            memory.yRegister = ""
            memory.flag=""
        }
        if(data!="equals") {
            memory.flag=data
        }
        
    },

    memoryInput:(data,type) => {
        if (type == "number") {
            memory.inputNumber(data)
        }
        if (type == "operation") {
            memory.inputFlag(data)
        }
        if (type == "command") {
            memory.command (data)
        }

        displayInput(memory.xRegister,display)
    }
}


const displayInput = (input, display) => {
    display.innerHTML = input
}

keys = document.querySelectorAll(".number, .command, .operation")

keys.forEach(key => {
    key.onclick = event => {
        memory.memoryInput(key.id,key.className)
    }
})
