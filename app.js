const transactionsArray = JSON.parse(localStorage.getItem("transactionsArray")) || [];
const incomeArray = JSON.parse(localStorage.getItem("incomeArray")) || [];
const expenseArray = JSON.parse(localStorage.getItem("expenseArray")) || [];

const balanceSpanEl = document.querySelector(".balance-span")
const incomeSpanEl = document.querySelector(".income-span")
const expenseSpanEl = document.querySelector(".expense-span")
const descriptionInputEl = document.querySelector(".description-input")
const amountInputEl = document.querySelector(".amount-input")
const formEl = document.querySelector(".form")
const transactionsList = document.querySelector(".transactions-list")
const button = document.querySelector(".button")
let deleteButtons = document.querySelectorAll(".cross")

const transactionName = document.querySelector(".transaction-name")
const transactionAmount = document.querySelector(".transaction-amount")

const incomeSpan = incomeSpanEl.value;
const expenseSpan = expenseSpanEl.value;
const balanceSpan = balanceSpanEl.value;

checkBackground()
//background image checker
function checkBackground(){
if (transactionsArray.length != 0){
transactionsList.style.backgroundImage = "none";
}
else{
    transactionsList.style.backgroundImage = "url('piggy.png')";
}}

//if condition for starting to push array 
if (transactionsArray != []){
    transactionsArray.forEach((element,index) => {
        createStorageLi(element);

    });
}
if (incomeArray != []){
    updateDashboard();

    }
if (expenseArray != []){
    updateDashboard();

    }

//creating local storage's li and prepending them
function createStorageLi(element){
   const newLi = document.createElement("li");

   const dateSpan = document.createElement("span");
   dateSpan.classList.add("transaction-date-span");
   dateSpan.innerText = element.formatedDate;

   const transactionName = document.createElement("span");
   transactionName.classList.add("transaction-name");
   transactionName.innerText = element.desvalue;

   const transactionAmount = document.createElement("span")
   transactionAmount.classList.add("transaction-amount");
   transactionAmount.innerText = element.transamt;

   const crossspan = document.createElement("span")
   crossspan.classList.add("cross")
   crossspan.innerText = "x"

    newLi.appendChild(dateSpan);
   newLi.appendChild(transactionName);
   newLi.appendChild(transactionAmount);
   newLi.appendChild(crossspan)
   transactionsList.prepend(newLi); 
 }

// form button click

formEl.addEventListener("submit" , function(event){
    event.preventDefault();
    if(descriptionInputEl.value != "" && amountInputEl.value != ""){
    const descriptionInput = descriptionInputEl.value;
    const amountInput = amountInputEl.value;

    createLi()
    setInputEmpty()
  updateDashboard()
  checkBackground()

}
})

//setting input fields empty on button click
function setInputEmpty(){
    descriptionInputEl.value = "";
    amountInputEl.value = "";
}


//creating new Li and appending to li container and pushing array
function createLi(){
   const newLi = document.createElement("li");
   if (parseFloat(amountInputEl.value) >= 0){
    newLi.style.borderColor = "green";
   }
   else{
    newLi.style.borderColor = "red";
   }
   const dateSpan = document.createElement("span");
   dateSpan.classList.add("transaction-date-span");
   const currentDate = new Date();
   const month = currentDate.toLocaleDateString('en-US', {month:'short'}) // Months are zero-based, so we add 1
    const day = currentDate.getDate();
    console.log(month)
    console.log(day)
    let formatedDate = `${month} ${day}`;
    dateSpan.innerText = formatedDate;

   const transactionName = document.createElement("span");
   transactionName.classList.add("transaction-name");
   transactionName.innerText = descriptionInputEl.value;
   let desvalue = descriptionInputEl.value;

   const transactionAmount = document.createElement("span")
   transactionAmount.classList.add("transaction-amount");
   transactionAmount.innerText = `$${parseFloat(amountInputEl.value).toFixed(2)}`;
   let transamt = parseFloat(amountInputEl.value).toFixed(2);
 
   const crossspan = document.createElement("span")
   crossspan.classList.add("cross")
   crossspan.innerText = "x"

   newLi.appendChild(dateSpan);
   newLi.appendChild(transactionName);
   newLi.appendChild(transactionAmount);
   newLi.appendChild(crossspan)
   transactionsList.prepend(newLi);  

   transactionsArray.unshift({desvalue, transamt, formatedDate});
   localStorage.setItem("transactionsArray", JSON.stringify(transactionsArray));
   
}

//removing the li
transactionsList.addEventListener("click", function(e){
     if (e.target.classList.contains("cross")){
        const parentli = e.target.parentElement;
        const lilistArray = Array.from(transactionsList.querySelectorAll("li"));
        const index = lilistArray.indexOf(parentli)
        console.log(index)
        parentli.remove();
        transactionsArray.splice(index,1);
        localStorage.setItem("transactionsArray", JSON.stringify(transactionsArray));
        updateDashboard();

     }
    checkBackground()
})

// Add this below your variable declarations
amountInputEl.addEventListener("input", function() {
    // This looks at what was typed and removes everything except numbers, dots, and minus signs
    this.value = this.value.replace(/[^-0-9.]/g, '');
});
//calculate Balance
function updateDashboard(){
function updateincome(){const incomeArray = transactionsArray.filter(t => parseFloat(t.transamt)>0)
        const finalincome = incomeArray.reduce((acc, curr) => acc + parseFloat(curr.transamt), 0)
        incomeSpanEl.innerText = `$ ${finalincome.toFixed(2)}`

}
function updateexpenses(){const expenseArray = transactionsArray.filter(t => parseFloat(t.transamt)<0)
    const finalexpenses = expenseArray.reduce((acc, curr) => acc + parseFloat(curr.transamt), 0)
    expenseSpanEl.innerText = `$ ${finalexpenses.toFixed(2)}`

}

function updatebalance(){
    const finalbalance = transactionsArray.reduce((acc, curr) => acc + parseFloat(curr.transamt),0)
    balanceSpanEl.innerText = `$ ${finalbalance.toFixed(2)}`;

}
    updateincome();
    updateexpenses();
    updatebalance();

    localStorage.setItem("incomeArray", JSON.stringify(incomeArray));
    localStorage.setItem("expenseArray", JSON.stringify(expenseArray));
}

