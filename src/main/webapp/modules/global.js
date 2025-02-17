export const url = "http://127.0.0.1:8080/transactions";

export const dateOptions = {
	day: 'numeric',
	month: 'numeric',
	year: 'numeric'
}

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