// const numbers = document.querySelectorAll('.number')
const buttons = document.querySelectorAll(".button");
const result = document.querySelector(".result");
const zero = document.querySelector(".zero");

let firstOperand = null;
let operator = null;
let isDisplayReset = true
let secondOperand = null
let keepResult = null

buttons.forEach((btn) => {
  btn.addEventListener("click",buttonClickEvent);
});


function buttonClickEvent(event){
    const value = event.target.value;
    const className = event.target.className;

    console.log(value);

    // operator
    if (className.includes("operator")) return operatorBtnClick(value)

    // reset
    if (className.includes("reset")) return resetBtnClick(value)

    // zero
    if (className.includes("zero")) return zeroBtnClick(value)

    // number
    if (className.includes("number")) return numberBtnClick(value)

    // dot
    if (className.includes("dot")) return dotBtnClick(value)

    // equl
    if (className.includes('equal')) return equalBtnClick()
}

function resetBtnClick(){
  result.innerText = zero.value; // value를 매개변수로 가지고 올 필요없다.
  firstOperand = null;
  operator = null;
}

function zeroBtnClick(value){
  if (result.innerText === "0") return;
  result.innerText += value;
}

function numberBtnClick(value){
  if(isDisplayReset){
    result.innerText = value
    isDisplayReset = false
  }else if (result.innerText === "0") {
    result.innerText = value;
  } else {
    result.innerText += value;
  }
}

function dotBtnClick(value){
  if (!result.innerText.includes(".")) {
    result.innerText += value;
  }
}

function operatorBtnClick(value){    // 2+2+2
  if (firstOperand === null) {
      isDisplayReset = true
      firstOperand = result.innerText;
      operator = value;
      console.log(`First Operand : ${firstOperand}, Operator : ${operator}`); // 디버깅용
  }else{
    secondOperand = result.innerText
    console.log(`secondOperand : ${secondOperand}`)
    keepResult = circulateNumber(firstOperand,operator,secondOperand) // 이 값이 어딘가에 저장되어야 할것같은데
    console.log(`after click operator keepResult : ${keepResult}`)
    result.innerText = keepResult;
    firstOperand = keepResult;
    operator = value;
    isDisplayReset = true; // 초기화가 잘 됨?..콘솔로 확인
  }
}

function circulateNumber(firstOperand,operator,secondOperand){
  const num1 = parseFloat(firstOperand)
  const num2 = parseFloat(secondOperand)
  switch(operator){
    case '+': return num1 + num2
    case '-': return num1 - num2
    case '*': return num1 * num2
    case '/' : return num1 / num2
    default: console.log('error')
  }
}

function equalBtnClick(){
  secondOperand = result.innerText //secondOperand가 업데이트가 안되는거 같은데... --> 계산된걸 firstOperand로 할당???!!!!!!
  console.log(`equal result : ${firstOperand},${secondOperand}`)
  keepResult = circulateNumber(firstOperand,operator,secondOperand)
  result.innerText = keepResult
  console.log(`Final keepResult : ${keepResult}`)

  firstOperand = null
  secondOperand = null
  operator = null
  isDisplayReset = true
  console.log(`firstOperand : ${firstOperand}, secondOperand : ${secondOperand}`)
}

