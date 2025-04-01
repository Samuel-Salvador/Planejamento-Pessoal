import {loggedUserId} from "./login.js";

export let transactionUrl = `https://planejamento-pessoal-17b194180e9e.herokuapp.com/transactions/${loggedUserId}`;
export let userUrl = `https://planejamento-pessoal-17b194180e9e.herokuapp.com/users/${loggedUserId}`;


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

export function getNumberOutOfCurrencyString(numberString){
	const lastTwoDigitsNumber = numberString.charAt(numberString.length-1)+numberString.charAt(numberString.length-2);
	//if numberString != "0" i need to get rid of the dirty
	if(numberString){
		numberString = numberString.slice(0,numberString.length-3);
		return numberString = Number(numberString.replace(/\D/g,'')+'.'+lastTwoDigitsNumber);
	}else{
		//if not, it'll transform it to 0 automatically.
		return numberString = Number(numberString);
	}
}