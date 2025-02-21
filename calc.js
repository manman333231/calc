const box = document.querySelector("#box");
box.setAttribute("style", "display: flex; justify-content: center; align-items: center; ");
const container = document.querySelector("#container");
container.setAttribute("style", "font-family: Andale Mono, monospace; font-size: 30px; border: 3px solid white; height: 700px; width 400px;");
const display = document.createElement("div");
display.setAttribute("style", "font-size: 60px; background-color: violet; height: 200px; width: 400px;");
container.appendChild(display);
const blocks = [];
const containers = [];
const symbols = [".", "0", "<", "=", "+", "-", "*", "/", "+/-", "%", "C"]
let num1 = "", num2 = null, operator1 = "", operator2 = "";

const addition = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const devide = (num1, num2) => num1 / num2;

const operate = (num1, num2, operator) => {
  switch(operator) {
    case "+":
      return addition(num1, num2);
      break;
    case "-":
      return subtract(num1, num2);
      break;
    case "*":
      return multiply(num1, num2);
      break;
    case "/":
      return devide(num1, num2);
      break;
    default:
      console.log("how");
  }
}

const opHandler = (num) => {
  if (operator1 === "") {
    num1 += num;
    display.textContent = num1;
  } else if (num2 === null) {
    num2 = num;
    display.textContent = num2;
  } else if (operator2 === "") {
    num2 += "";
    num2 += num;
    display.textContent = num2;
  } else {
    num1 = String(operate(Number(num1), Number(num2), operator1));
    num2 = num;
    operator1 = operator2;
    operator2 = "";
    display.textContent = num1;
  }
}

const eqHandler = () => {
  if(num2 === null){
    display.textContent = num1;
  } else if(operator2 === "") {
    num1 = String(operate(Number(num1), Number(num2), operator1));
    operator1 = "";
    num2 = null;
    display.textContent = num1;
  } else {
    num1 = String(operate(Number(num1), Number(num2), operator2));
    num2 === null;
    operator1 = operator2;
    operator2 = "";
    display.textContent = num1;
  }
}

const createGrid = () => {
  for(let i = 0; i <= 4; i++){
    containers[i] = document.createElement("div");
    containers[i].setAttribute("style", "display: flex; height: 100px; width: 400px;");
    for(let j = 0; j <= 3; j++){
      blocks[j + i*4] = document.createElement("div");
      blocks[j + i*4].setAttribute("style", "outline: 3px solid white; display: flex; align-items: center; justify-content: center; background-color: dodgerblue; height: 100px; width: 100px;");
      containers[i].appendChild(blocks[j + i*4]);
    }
    container.appendChild(containers[i]);
  }
}

const addText = () => {
  display.textContent = "0";
  for(let i = 3; i >= 1; i--){
    for(let j = 0; j <= 2; j++){
      blocks[i*4 + j].textContent = j + 1 + (3-i)*3;
    }
  }
  for(let i = 0; i <= 3; i++){
    blocks[i + 16].textContent = symbols[i];
  }
  for(let i = 0; i <= 3; i++){
    blocks[i].textContent = symbols[10 - i];
  } 
  for(let i = 0; i <= 2; i++){
    blocks[15 - i*4].textContent = symbols[4 + i];
  } 
}

const hoverEffect = () => {
  blocks.forEach((block) => {
    block.addEventListener("mouseover", () => {
      block.style.backgroundColor = "grey";
    });
    block.addEventListener("mouseout", () => {
      block.style.backgroundColor = "dodgerblue";
    });
  });
}

const addFunctionality = () => {
  for(let i = 3; i >= 1; i--){
    for(let j = 0; j <= 2; j++){
      blocks[i*4 + j].addEventListener("click", () => {
        opHandler(j + 1 + (3-i)*3);
      });
    }
  }

  blocks[0].addEventListener("click", () => {
    num1 = "";
    num2 = null;
    operator1 = "";
    operator2 = "";
    display.textContent = 0;
  });

  for(let i = 0; i <= 2; i++){
    blocks[15 - i*4].addEventListener("click", () => {
      if (operator1 === "") {
        operator1 = symbols[4 +i]; 
      } else {
        operator2 = symbols[4 +i]; 
      }
    });
  }
  blocks[19].addEventListener("click", () => {
    eqHandler();
  });
}

createGrid();
addText();
hoverEffect();
addFunctionality();
