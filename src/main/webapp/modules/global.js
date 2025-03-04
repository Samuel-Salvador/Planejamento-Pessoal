import {loggedUserId} from "./login.js";

export let transactionUrl = `http://127.0.0.1:3030/transactions/${loggedUserId}`;
export let userUrl = `http://127.0.0.1:3030/users/${loggedUserId}`;


export const dateOptions = {
	day: 'numeric',
	month: 'numeric',
	year: 'numeric'
}

export const userClickEvents = ['touchstart','click'];

//verifies if there's no empty values in the forms
export function formValidated(validation) {
  if (validation == "") {
    alert("Todos os campos precisam ser preenchidos!");
    return false;
  }else return true;
}

//corrects the timezone and set date to dd/MM/yyyy
export function formattedDate(date){
	
	const dateFormatted = new Date(new Date(date).getTime() 
		+ Math.abs(new Date(date).getTimezoneOffset()*60000))
		.toLocaleString("pt-BR",dateOptions);
	
	return dateFormatted;
}

export function formattedPrice(price){
	
	return price.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});

}