import {formValidated} from "./global.js";
import {urlMonthInvoice,addTransaction,setTotal,transactionsArray} from "./finance.js";
import { loggedUserId } from "./login.js";

const addTransactionModal = document.querySelector(".add_transaction_modal");
const closeModalButton = document.querySelector(".x_add");
const modalConfirmButton = document.querySelector(".transaction_add_modal_button");

export function openAdditionModal(){
	addTransactionModal.classList.add("flex");
}

function closeAdditionModal(event){
	event.preventDefault();
	addTransactionModal.classList.remove("flex");
}

function clickOutsideModal(event){
	if(event.target==this){
		closeAdditionModal(event);
	}	
}

function resetFormValues(){
	document.forms.transaction_add_form.name.value = "";
	document.forms.transaction_add_form.date.value = "";
	document.forms.transaction_add_form.price.value = "";
	document.forms.transaction_add_form.installments.value = "";
	document.forms.transaction_add_form.category.value = "";
	document.forms.transaction_add_form.type.value = "";

}

async function postAndAddLastTransactionToArray(options){
	await fetch("http://127.0.0.1:3030/transactions",options);
	const monthTransactionResponse = await fetch(urlMonthInvoice);
	const monthTransactionJSON = await monthTransactionResponse.json();
	addTransaction(monthTransactionJSON[monthTransactionJSON.length-1]);
	setTotal(transactionsArray);
}

function httpPostTransaction(){
	const formValueName = document.forms.transaction_add_form.name.value;
	const formValueDate = document.forms.transaction_add_form.date.value;
	const formValuePrice = document.forms.transaction_add_form.price.value;
	const formValueInstallments = document.forms.transaction_add_form.installments.value;
	const formValueCategory = document.forms.transaction_add_form.category.value;
	const formValueType = document.forms.transaction_add_form.type.value;

	if(	formValidated(formValueName) &&
		formValidated(formValueDate) &&
		formValidated(formValuePrice) &&
		formValidated(formValueInstallments) &&
		formValidated(formValueCategory) &&
		formValidated(formValueType)){
			const options= {
				method: "POST",
				headers: {
					"Content-Type": "application/json; charset=utf-8",
				},
				body: JSON.stringify({	name: formValueName,
									    date: formValueDate,
									    price: formValuePrice,
									    installments: formValueInstallments,
									    category: formValueCategory,
									    type: formValueType,
										user: loggedUserId}),
				};
				postAndAddLastTransactionToArray(options);
				resetFormValues();
				closeAdditionModal(new Event("click"));
	}
}

export function initModal() {
  	
	closeModalButton.addEventListener("click",closeAdditionModal);
	addTransactionModal.addEventListener("click",clickOutsideModal);
	
	modalConfirmButton.addEventListener('click',httpPostTransaction);
		
	addTransactionModal.addEventListener('keydown', (event) => {
		if(event.key === "Enter"){
			httpPostTransaction();
		}
	});		
}