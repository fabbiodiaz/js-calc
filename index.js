const inputScreen = document.getElementById("input-screen")
const outputScreen = document.getElementById("output-screen")

operations = {
    plus:(firstNum,secondNum) => firstNum + secondNum,
    minimus: (firstNum,secondNum) => firstNum - secondNum,
    mult: (firstNum,secondNum) => firstNum * secondNum,
    divide: (firstNum,secondNum) => firstNum / secondNum,
    equals:(flag,firstNum,secondNum) => operations[flag](firstNum,secondNum)
    }

const memory = { flag:"", xRegister:"", yRegister:"",

    inputNumber:data => {
        
        if (memory.flag) {
            memory.yRegister=memory.xRegister
            memory.xRegister=""
        }
        data = memory.xRegister.toString().concat(data)
        memory.xRegister = parseInt(data)
        //screenInput(memory.xRegister,inputScreen)
    },

    inputFlag:data => {            
        if (memory.flag && memory.flag!="equals") {
            memory.xRegister = operations.equals(memory.flag,memory.yRegister,memory.xRegister)
            memory.yRegister = ""
        }
        memory.flag=data
        
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

        //screenInput(memory.xRegister,outputScreen)
    }
}


const screenInput = (input, screen) => {
    screen.innerHTML = input
}

keys = document.querySelectorAll(".number, .command, .operation")

keys.forEach(key => {
    key.onclick = event => {
        memory.memoryInput(key.id,key.className)
    }
})