let displayElem = document.getElementsByClassName('display').item(0);
let numbersElem = document.getElementsByClassName('command is-number');

// 演算子：＋
let operatorAddElem = document.getElementsByClassName('command is-operator is-add').item(0);
// 演算子：-
let operatorSubElem = document.getElementsByClassName('command is-operator is-sub').item(0);
// 演算子：×
let operatorMultiElem = document.getElementsByClassName('command is-operator is-multi').item(0);
// 演算子：÷
let operatorDivisionElem = document.getElementsByClassName('command is-operator is-division').item(0);
//　演算子：%
let operatorRemainElem = document.getElementsByClassName('command is-operator is-remain').item(0);

let equalElem = document.getElementsByClassName('command is-equal').item(0);
let acElem = document.getElementsByClassName('command is-ac').item(0);

// デバッグ用のエレメント
let leftNumberElem = document.getElementById('leftNumber');
let inputOperatorElem = document.getElementById('inputOperator');
let rightNumberElem = document.getElementById('rightNumber');
let resultNumberElem = document.getElementById('resultNumber');

// 計算結果
let resultNumber;
// 計算式の左辺
let leftNumber;
// 計算式の右辺
let rightNumber;
// 入力した演算子
let inputOperator;

log();

// 数値をクリックした時
for (let i = 0; i < numbersElem.length; i++) {
  numbersElem.item(i).onclick = displayNumber;
}

// 演算子をクリックした時
operatorAddElem.addEventListener('click', saveAddOperator);
operatorAddElem.addEventListener('click', flashDisplay);
operatorSubElem.addEventListener('click', saveSubOperator);
operatorSubElem.addEventListener('click', flashDisplay);
operatorMultiElem.addEventListener('click', saveMultiOperator);
operatorMultiElem.addEventListener('click', flashDisplay);
operatorDivisionElem.addEventListener('click', saveDivisionOperator);
operatorDivisionElem.addEventListener('click', flashDisplay);
operatorRemainElem.addEventListener('click', saveRemainOperator);
operatorRemainElem.addEventListener('click', flashDisplay);

// イコールをクリックした時
equalElem.addEventListener('click', calculate);
equalElem.addEventListener('click', flashDisplay);

acElem.addEventListener('click', reset);
acElem.addEventListener('click', flashDisplay);

function reset() {
  resultNumber = undefined;
  leftNumber = undefined;
  rightNumber = undefined;
  inputOperator = undefined;
  displayElem.innerText = 0;
  log();
}

function calculate() {
  resultNumber = eval(leftNumber + inputOperator + rightNumber);
  displayElem.innerText = resultNumber;
  log();
}

function displayNumber() {
  if (resultNumber !== undefined) {
    reset();
  }
  if (rightNumber === undefined) {
    rightNumber = 0;
  }
  rightNumber = Number(rightNumber + this.innerText);
  displayElem.innerText = rightNumber;
  log();
}

function createCalculation() {
  if (rightNumber === undefined) {
    // 右辺がまだ入力されていない場合
    if (leftNumber === undefined) {
      // 左辺も決まっていない場合、左辺をゼロに決める
      leftNumber = 0;
    }
    return;
  }
  
  if (leftNumber === undefined) {
    // 左辺が決まっていない場合は右辺を左辺に移動
    leftNumber = rightNumber;
  } else {
    // 左辺が決まっている場合は計算実行
    calculate();
  }

  if (resultNumber !== undefined) {
    // 計算結果が出ている場合、計算結果に対して計算を続けるため、計算結果を左辺に移動
    leftNumber = resultNumber;
  }
  // 計算を続けるため、右辺と計算結果をundefinedに初期化する
  rightNumber = undefined;
  resultNumber = undefined;
  log();
}

function saveAddOperator() {
  createCalculation();
  inputOperator = '+';
  log();
}
function saveSubOperator() {
  createCalculation();
  inputOperator = '-';
  log();
}
function saveMultiOperator() {
  createCalculation();
  inputOperator = '*';
  log();
}
function saveDivisionOperator() {
  createCalculation();
  inputOperator = '/';
  log();
}
function saveRemainOperator() {
  createCalculation();
  inputOperator = '%';
  log();
}

function log() {
  leftNumberElem.innerText = leftNumber;
  inputOperatorElem.innerText = inputOperator;
  rightNumberElem.innerText = rightNumber;
  resultNumberElem.innerText = resultNumber;
}

function flashDisplay() {
  displayElem.classList.add('flashing');
  let remove = function(){
    displayElem.classList.remove('flashing');
  };
  setTimeout(remove, 100);
}