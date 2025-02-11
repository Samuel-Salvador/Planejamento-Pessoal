let monthInvoice = 	new Date().getDate()>5 ? 
						new Date().getMonth()+1 : 
						new Date().getMonth();

const url = "http://127.0.0.1:8080/transactions";
let urlMonthInvoice = url.concat(`/month/${monthInvoice}`);

const modalConfirmButton = document.querySelector(".modal button");
const modalElement = document.querySelector(".adicionar_transacao");
const selectionForRemoval = document.getElementById("selection_transaction");
const modalRemovalDiv = document.querySelector(".dados_removal");
const removalButtonConfirm = document.querySelector(".removal_modal_button");
const removalModal = document.querySelector(".remover_transacao");
const leftArrow = document.querySelector(".seta_esquerda");
const rightArrow = document.querySelector(".seta_direita");
const monthTitle = document.querySelector(".titulo_mes h2 span");

const dateOptions = {
	day: 'numeric',
	month: 'numeric',
	year: 'numeric'
}

let transactions = [];

function cleanTransactions(){
	document.getElementById("transacoes_nome").innerHTML =
		`<p class="transacoes_titulo">Nome</p>`;
	document.getElementById("transacoes_data").innerHTML =	
		`<p class="transacoes_titulo">Data</p>`;
	document.getElementById("transacoes_categoria").innerHTML =	
		`<p class="transacoes_titulo">Categoria</p>`;
	document.getElementById("transacoes_parcelas").innerHTML =
		`<p class="transacoes_titulo">Parcelas</p>`;
	document.getElementById("transacoes_preco").innerHTML =	
		`<p class="transacoes_titulo">Preço</p>`;
		
	selectionForRemoval.innerHTML=``;
}


function addFromDb(body, i) {

	document.getElementById("transacoes_nome")
		.innerHTML += `<div class="linha">${body[i].nome}</div>`;
		
  	document.getElementById("transacoes_data")
  		.innerHTML += `<div class="linha">
		${formattedDate(body[i].data)}</div>`;
		
	document.getElementById("transacoes_categoria")
		.innerHTML += `<div class="linha">
		${body[i].categoria}</div>`;
		
	document.getElementById("transacoes_parcelas")
		.innerHTML += `<div class="linha">
		${body[i].parcelaAtual+"/"
		+body[i].parcelas}</div>`;	
		
  	document.getElementById("transacoes_preco")
  		.innerHTML += 
		`<div class="linha">${(body[i].preco)
		.toLocaleString("pt-BR",
  		{style: 'currency', currency: 'BRL'})}</div>`;
		
	const option = document.createElement("option");
	option.setAttribute("date-data",`${formattedDate(body[i].data)}`);
	option.setAttribute("preco-data",`${body[i].preco}`)
	option.innerHTML = `${body[i].nome}`;
	selectionForRemoval.appendChild(option);
}

//verifies if there's no empty values in the forms
function formValidated(validation) {
  if (validation == "") {
    alert("Todos os campos precisam ser preenchidos!");
    return false;
  }else return true;
}

//corrects the timezone and set date to dd/MM/yyyy
function formattedDate(date){
	
	const dateFormatted = new Date(new Date(date).getTime() 
		+ Math.abs(new Date(date).getTimezoneOffset()*60000))
		.toLocaleString("pt-BR",dateOptions);
	
	return dateFormatted;
}

function httpPostTransaction(){
	const formValueNome = document.forms.transaction.nome.value;
	const formValueData = document.forms.transaction.data.value;
	const formValuePreco = document.forms.transaction.preco.value;
	const formValueParcelas = document.forms.transaction.parcelas.value;
	const formValueCategoria = document.forms.transaction.categoria.value;

	if(	formValidated(formValueNome) &&
		formValidated(formValueData) &&
		formValidated(formValuePreco) &&
		formValidated(formValueParcelas) &&
		formValidated(formValueCategoria)){
			const options = {
					method: "POST",
					headers: {
						"Content-Type": "application/json; charset=utf-8",
					},
					body: `{
						"nome": "${formValueNome}",
						"data": "${formValueData}",
					    "preco": "${formValuePreco}",
					    "parcelas": "${formValueParcelas}",
					    "categoria": "${formValueCategoria}"
					    }`,
					};
			fetch(url, options).then(() => location.reload(true));
			modalElement.classList.remove("ativar");
	}
	
}

export default function initFetch() {
	
	
  	fetch(urlMonthInvoice)
    	.then((r) => r.json())
    	.then((body) => {
			
			//adds transactions to the array
			transactions=transactions.concat(body);
			
			//adds the transactions to the main frame
      		for (let i = 0; i < body.length; i++) {
        		addFromDb(body, i);
     		 }
		
   })
	
	
	modalConfirmButton.addEventListener('click', () => {
		httpPostTransaction();
	});
	
	modalElement.addEventListener('keydown', (event) => {
		if(event.keyCode === 13){
			httpPostTransaction();
		}
		
	
	});
	
	let removalIdDB=0;
	let removalCorrectArrayIndex=0;
	
	//checks the <select> tab for the removal in the removal modal
	selectionForRemoval.addEventListener('change',()=>{
		
		const removalButton = document.querySelector(".removal_modal_button");
		removalButton.classList.add("block");
		
		for(let i=0;i<transactions.length;i++){
			
			//Gets the correct id in DB and the array index for removal
			if(	selectionForRemoval.value == transactions[i].nome &&
				selectionForRemoval.options[selectionForRemoval.selectedIndex]
				.getAttribute("date-data") == formattedDate(transactions[i].data) &&
				selectionForRemoval.options[selectionForRemoval.selectedIndex]
				.getAttribute("preco-data") == transactions[i].preco){
					removalIdDB=transactions[i].id;
					removalCorrectArrayIndex = i;
			}
		}
			
		//adds the data from the selected transaction in the removal modal
		modalRemovalDiv.innerHTML=`<div class="dados_removal_h3 margin">
			<h3>Dados da transação a ser removida: </h3></div>
			<div>Nome: ${transactions[removalCorrectArrayIndex].nome}<br>
			Data: ${formattedDate(transactions[removalCorrectArrayIndex].data)}<br>
			Categoria: ${transactions[removalCorrectArrayIndex].categoria}<br>
			Parcelas: ${transactions[removalCorrectArrayIndex].parcelaAtual+"/"
				+transactions[removalCorrectArrayIndex].parcelas}<br>
			Preço: ${transactions[removalCorrectArrayIndex].preco.toLocaleString("pt-BR",
				{style: 'currency', currency: 'BRL'})}<br>
			</div>`;
		
	});
	
	
	
	removalButtonConfirm.addEventListener('click',()=>{
			
		fetch(url+"/"+removalIdDB,{method: "DELETE"})
		.then(location.reload(true));
		removalModal.classList.remove("ativar");
	})
	
	let dataString;

	leftArrow.addEventListener("click",(event)=>{
		event.preventDefault();
		
		monthInvoice--;
		
		dataString = "2025-0"+monthInvoice+"-29";
		const monthString = new Date(dataString)
							.toLocaleDateString("pt-BR",{"month":"long"});
				
		const monthStringCammelCase = monthString.replace(monthString.charAt(0),	
												monthString.charAt(0).toUpperCase());
		
		monthTitle.innerHTML = monthStringCammelCase;
												
		urlMonthInvoice = url.concat(`/month/${monthInvoice}`);
		cleanTransactions();
		
		fetch(urlMonthInvoice)
		    .then((r) => r.json())
		    .then((body) => {
				for (let i = 0; i < body.length; i++) {
		        	addFromDb(body, i);
		     	}	
		})
		
		
	})
	
	rightArrow.addEventListener("click",(event)=>{
		event.preventDefault();
				
		monthInvoice++;
		
		dataString = "2025-0"+monthInvoice+"-29";
		const monthString = new Date(dataString)
								.toLocaleDateString("pt-BR",{"month":"long"});
		
		const monthStringCammelCase = monthString.replace(monthString.charAt(0),	
											monthString.charAt(0).toUpperCase());
							
		
		monthTitle.innerHTML = monthStringCammelCase;

		urlMonthInvoice = url.concat(`/month/${monthInvoice}`);
		cleanTransactions();
				
		fetch(urlMonthInvoice)
			.then((r) => r.json())
			.then((body) => {
				for (let i = 0; i < body.length; i++) {
					addFromDb(body, i);
				}	
		})
		
		
					
	})
	
	
}
