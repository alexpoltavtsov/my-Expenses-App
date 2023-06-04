const LIMIT = 10000;
const STATUS_IN_LIMIT = "Всё хорошо";
const STATUS_OUT_OF_LIMIT = "Всё плохо";
const CHANGE_LIMIT_TEXT = "Новый лимит";
const STATUS_IN_LIMIT_CLASSNAME = "status_fine";
const STATUS_OUT_OF_LIMIT_CLASSNAME = "status_badly";

const inputNode = document.querySelector(".js-input");
const inputPopupNode = document.querySelector(".js-popup__input");
const textInputNode = document.querySelector(".js-textInput");
const buttonNode = document.querySelector(".js-button");
const resetButtonNode = document.querySelector(".js-reset-button");
const historyNode = document.querySelector(".js-history");
const sumNode = document.querySelector(".js-sum");
const statusNode = document.querySelector(".js-status");
const newLimitNode = document.querySelector(".js-popup__button");


const limitNode = document.querySelector(".js-limit");

let limit = parseInt(limitNode.innerText);

let expenses = [];

buttonNode.addEventListener("click", function(){
  const currentAmount = getExpenseFromUser();
  if (!currentAmount) {
    alert("Не заданна сумма");
    return;
  }

  const currentCategory = getSelectedCategory();

  if (currentCategory === "Категория") {
    alert("Не заданна категория");
    return;
  }

  const newExpense = { amount: currentAmount, category: currentCategory };

  expenses.push(newExpense);


  render();
  clearInput(inputNode);
});

function getTotal(expenses) {
  let sum = 0;
  expenses.forEach(function (expense) {
    sum += expense.amount;
  });

  return sum;
};

function renderStatus() {
  const total = getTotal(expenses);
  sumNode.innerHTML = total;

  if (total <= limit) {
    statusNode.innerText = STATUS_IN_LIMIT;
    statusNode.className = STATUS_IN_LIMIT_CLASSNAME;
  } else {
    statusNode.innerText = `${STATUS_OUT_OF_LIMIT} (${limit - total} руб)`;
    statusNode.className = STATUS_OUT_OF_LIMIT_CLASSNAME;
  }
}; 

function renderHistory() {
  historyNode.innerHTML = "";
  expenses.forEach(function (expense) {
    const historyItem = document.createElement("li");
    historyItem.className = "currency";
    historyItem.innerText = `${expense.category} - ${expense.amount}`;

    historyNode.appendChild(historyItem);
  });
}; 

const render = () => {
  renderStatus();
  renderHistory();
};

function getExpenseFromUser() {
  return parseInt(inputNode.value);
};

function getSelectedCategory() {
  return textInputNode.value;
};

const clearInput = function () {
  inputNode.value = "";
};

function resetButtonHandler() {
  expenses = [];
  render();
};


function newLimitHandler() {
  const newLimit = inputPopupNode.value;
  
  if(!newLimit) {
    return;
  }

  limitNode.innerText = newLimit;
  limit = newLimit;

  render();
  inputPopupNode.value = "";
}

resetButtonNode.addEventListener("click", resetButtonHandler);
newLimitNode.addEventListener("click", newLimitHandler);