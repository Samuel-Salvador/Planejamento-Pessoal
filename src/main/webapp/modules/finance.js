import * as global from './global.js';
import * as removeTransaction from "./removeModal.js";
import { createOptionSelectionGroup, openAdditionModal} from "./addModal.js";
import {openRemovalModal} from "./removeModal.js";
import { fetchUser, userData } from './header.js';

let monthInvoice = 	new Date().getDate()>5 ? new Date().getMonth()+1 : new Date().getMonth();
let yearInvoice = new Date().getFullYear();

export let urlMonthInvoice = global.transactionUrl.concat(`/${monthInvoice}/${yearInvoice}`);

const leftArrow = document.querySelector(".left_arrow");
const rightArrow = document.querySelector(".right_arrow");
let monthTitle = document.querySelector(".current_month");
let yearTitle = document.querySelector(".current_year");
export const invoiceTotal = document.querySelector(".total span");
export let invoiceNumber = global.getNumberOutOfCurrencyString(invoiceTotal.innerText);

const removeTransactionButton = document.querySelector(".container_remove");
const addTransactionButton = document.querySelector(".container_add");

export const financeTransactionGroupSelect = document.getElementById("transaction_group_main");

export let transactionsArray = [];

//sets the correct month and year title if not filtered
//if filtered, shows the filter title
function setCorrectTitle(){

	const title = document.querySelector(".container_text_nav_months h2");
	
	
	const dataString = "2025-0"+monthInvoice+"-29";
	const monthString = new Date(dataString)
						.toLocaleDateString("pt-BR",{"month":"long"});
						
	if(financeTransactionGroupSelect.value == "Dia a dia" || !financeTransactionGroupSelect.value){
		title.innerHTML = `Gastos <span class="current_month"></span>
							de
						<span class="current_year"></span>`;
						
		monthTitle = document.querySelector(".current_month");
		yearTitle = document.querySelector(".current_year");
		
		monthTitle.innerHTML = monthString.replace(monthString.charAt(0),
											monthString.charAt(0).toUpperCase());
		yearTitle.innerHTML = yearInvoice;
		
		rightArrow.removeAttribute("hidden");
		leftArrow.removeAttribute("hidden");
	}else{
		title.innerHTML = `Gastos <span class="current_group"></span>`;
		document.querySelector(".current_group").innerHTML = financeTransactionGroupSelect.value;
		leftArrow.setAttribute("hidden",true);
		rightArrow.setAttribute("hidden",true);
	}
	
	
		
}

//sums the price of each transaction and  modifies the invoiceTotal dynamically
export function setTotal(monthTransactions){
	
	//verifies if there's at least one transaction 
	if(monthTransactions.length){
		const arrayPrice = monthTransactions.map((transaction)=>transaction.price);
		
		const nextTotal = arrayPrice.reduce((accumulator,current)=>accumulator+current);
		const increment = Math.ceil(Math.abs(nextTotal-invoiceNumber)/100)+1;
		console.log(monthTransactions,nextTotal);
		
		//modifies the invoiceTotal in the DOM several times until it reaches the correct new Total
		if(invoiceNumber<nextTotal){
			const changeNumber = setInterval(()=>{
				
				invoiceNumber+=increment;
				invoiceTotal.innerHTML = invoiceNumber.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});
				if(invoiceNumber>nextTotal){
					invoiceTotal.innerHTML = nextTotal.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});								
					invoiceNumber = nextTotal;
					clearInterval(changeNumber);
				}	
			},5);
			
		}if(invoiceNumber>nextTotal){
			
			const changeNumber = setInterval(()=>{
				invoiceNumber-=increment;
				invoiceTotal.innerHTML = invoiceNumber.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});
				if(invoiceNumber<nextTotal){
					invoiceTotal.innerHTML = nextTotal.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});				
					invoiceNumber = nextTotal;
					clearInterval(changeNumber);
				}		
			},5);
		}if(invoiceNumber==nextTotal){
			invoiceTotal.innerHTML = nextTotal.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});
		}
	}else{
		//if there's no transactions in the month
		invoiceTotal.innerHTML = "R$ 0,00";
	}
}

function resetTotal(){
	invoiceTotal.innerHTML = "";
}

function clearAllTransactions(){
	document.getElementById("transactions_column_name").innerHTML =
		`<p class="transactions_column_title">Nome</p>`;
		
	document.getElementById("transactions_column_date").innerHTML =	
		`<p class="transactions_column_title">Data</p>`;
		
	document.getElementById("transactions_column_type").innerHTML =	
		`<p class="transactions_column_title">Tipo</p>`;
		
	document.getElementById("transactions_column_category").innerHTML =	
		`<p class="transactions_column_title">Categoria</p>`;
		
	document.getElementById("transactions_column_installments").innerHTML =
		`<p class="transactions_column_title">Parcelas</p>`;
		
	document.getElementById("transactions_column_price").innerHTML =	
		`<p class="transactions_column_title">Preço</p>`;
	
	removeTransaction.clearSelectElement();
	transactionsArray = [];		
}



export function addTransaction(transaction){
	document.getElementById("transactions_column_name")
		.innerHTML += `<div class="transaction">${transaction.name}</div>`;
								
	document.getElementById("transactions_column_date")
		.innerHTML += `<div class="transaction">
		${global.formattedDate(transaction.date)}</div>`;
								
	document.getElementById("transactions_column_type")
		.innerHTML += `<div class="transaction">
		${transaction.type}</div>`;
								
	document.getElementById("transactions_column_category")
		.innerHTML += `<div class="transaction">
		${transaction.category}</div>`;
								
	document.getElementById("transactions_column_installments")
		.innerHTML += `<div class="transaction">
		${transaction.currentInstallment+"/"
		+transaction.installments}</div>`;	
								
	document.getElementById("transactions_column_price")
		.innerHTML += `<div class="transaction">${(transaction.price)
		.toLocaleString("pt-BR",
		{style: 'currency', currency: 'BRL'})}</div>`;
								
	
	removeTransaction.addOptionToSelectForRemovalElement(transaction);
	
	transactionsArray.push(transaction);		
}

//adds the month transactions to the transactions tab and sets the total for that month
function addAllTransactions() {
	
	fetch(urlMonthInvoice)
	    	.then((r) => r.json())
	    	.then((body) => {
				
	      		for (let i = 0; i < body.length; i++) {
					addTransaction(body[i]);
	     		}
				 
				setTotal(body);		
	   		});
}

async function addGroupTransactionsToFilter(){
	
	
	await fetchUser();
	for(let i=0;i<userData.transactionGroups.length;i++){
		
		createOptionSelectionGroup(i,financeTransactionGroupSelect);
	}
}

export default function initFinance() {
			
	setCorrectTitle();
	addAllTransactions();

	addGroupTransactionsToFilter();
	
	global.userClickEvents.forEach((userEvent)=>{
			
	
		//changes to the previous month
		leftArrow.addEventListener(userEvent,(event)=>{
			event.preventDefault();
			
			if(monthInvoice>1){
				monthInvoice--;
			} else
			if(monthInvoice==1) {
				yearInvoice--;
				monthInvoice=12;
			}
		
			urlMonthInvoice = global.transactionUrl.concat(`/${monthInvoice}/${yearInvoice}`);
			clearAllTransactions();
			resetTotal();
			
			setCorrectTitle();
													
			addAllTransactions();
	
			removeTransaction.resetRemovalModal();
			
		})
		
		//changes to the next month
		rightArrow.addEventListener(userEvent,(event)=>{
			event.preventDefault();
					
			if(monthInvoice<12){
				monthInvoice++;
			}else 
			if(monthInvoice==12){
				yearInvoice++;
				monthInvoice=1;
			}
			
			urlMonthInvoice = global.transactionUrl.concat(`/${monthInvoice}/${yearInvoice}`);
			clearAllTransactions();
			resetTotal();
			
			setCorrectTitle();
	
			addAllTransactions();
			
			removeTransaction.resetRemovalModal();	
		})
		
		//opens add transaction modal
		addTransactionButton.addEventListener(userEvent, (event) => {
		    event.preventDefault();
			openAdditionModal();
		});
		
		//opens remove transaction modal
		removeTransactionButton.addEventListener(userEvent, (event) => {
			event.preventDefault();
			openRemovalModal();
		});	
		
	})
	
	financeTransactionGroupSelect.addEventListener("change",(event) => {
		event.preventDefault();
		urlMonthInvoice = global.transactionUrl.concat("/"+financeTransactionGroupSelect.value);
		if(urlMonthInvoice == global.transactionUrl.concat("/Dia a dia")){
			urlMonthInvoice= global.transactionUrl.concat(`/${monthInvoice}/${yearInvoice}`);
		}
		
		clearAllTransactions();
		resetTotal();
					
		setCorrectTitle();
															
		addAllTransactions();
			
		removeTransaction.resetRemovalModal();
	})
}