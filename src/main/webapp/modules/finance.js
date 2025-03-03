import * as global from './global.js';
import * as removeTransaction from "./removeModal.js";
import {openAdditionModal} from "./addModal.js";

let monthInvoice = 	new Date().getDate()>5 ? new Date().getMonth()+1 : new Date().getMonth();
let yearInvoice = new Date().getFullYear();

export let urlMonthInvoice = global.transactionUrl.concat(`/${monthInvoice}-${yearInvoice}`);

const leftArrow = document.querySelector(".left_arrow");
const rightArrow = document.querySelector(".right_arrow");
const monthTitle = document.querySelector(".current_month");
const yearTitle = document.querySelector(".current_year");
const invoiceTotal = document.querySelector(".total span");

const removeTransactionButton = document.querySelector(".container_remove");
const addTransactionButton = document.querySelector(".container_add");

export let transactionsArray = [];

//sets the correct month and year string title
function setCorrectTitle(){
	const dataString = "2025-0"+monthInvoice+"-29";
	const monthString = new Date(dataString)
						.toLocaleDateString("pt-BR",{"month":"long"});
					
	monthTitle.innerHTML = monthString.replace(monthString.charAt(0),
									monthString.charAt(0).toUpperCase());
	
	yearTitle.innerHTML = yearInvoice;	
}

//sums the price of each transaction and  modifies the total_div dynamically
export function setTotal(monthTransactions){
	
	if(monthTransactions.length){
		
		const arrayPrice = monthTransactions.map((transaction)=>transaction.price);
		let previousTotal = Number(invoiceTotal.innerText.replace(/^\D+/g, '').replace(',','.'));
		const nextTotal = arrayPrice.reduce((accumulator,current)=>accumulator+current);

		if(previousTotal<nextTotal){
			const timer = setInterval(()=>{
				previousTotal+=1;
				invoiceTotal.innerHTML = previousTotal.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});
				if(previousTotal>nextTotal){
					invoiceTotal.innerHTML = nextTotal.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});								
					clearInterval(timer);
				}	
			},0);
			
		}if(previousTotal>nextTotal){
			const timer = setInterval(()=>{
				previousTotal-=1;
				invoiceTotal.innerHTML = previousTotal.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});
				if(previousTotal<nextTotal){
					invoiceTotal.innerHTML = nextTotal.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});				
					clearInterval(timer);
				}		
			},0);
		}	
	}else{
		invoiceTotal.innerHTML = "R$ 0,00"}
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

export default function initFinance() {
			
	setCorrectTitle();
	addAllTransactions();

	//changes to the previous month
	leftArrow.addEventListener("click",(event)=>{
		event.preventDefault();
		
		if(monthInvoice>1){
			monthInvoice--;
		} else
		if(monthInvoice==1) {
			yearInvoice--;
			monthInvoice=12;
		}
	
		urlMonthInvoice = global.transactionUrl.concat(`/${monthInvoice}-${yearInvoice}`);
		clearAllTransactions();
		
		setCorrectTitle();
												
		addAllTransactions();

		removeTransaction.resetRemovalModal();
		
	})
	
	//changes to the next month
	rightArrow.addEventListener("click",(event)=>{
		event.preventDefault();
				
		if(monthInvoice<12){
			monthInvoice++;
		}else 
		if(monthInvoice==12){
			yearInvoice++;
			monthInvoice=1;
		}
		
		urlMonthInvoice = global.transactionUrl.concat(`/${monthInvoice}-${yearInvoice}`);
		clearAllTransactions()
		
		setCorrectTitle();

		addAllTransactions();
		
		removeTransaction.resetRemovalModal();	
	})
	
	//opens add transaction modal
	addTransactionButton.addEventListener("click", (event) => {
	    event.preventDefault();
		openAdditionModal();
	});
	
	//opens remove transaction modal
	removeTransactionButton.addEventListener("click", (event) => {
		event.preventDefault();
		removeTransaction.openRemovalModal();
	});
	
	
}