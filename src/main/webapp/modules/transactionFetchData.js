import * as global from './global.js';
import { selectionForRemoval , resetRemovalModal } from "./removeModal.js";
import { modalElementAdd } from './addModal.js';

let monthInvoice = 	new Date().getDate()>5 ? new Date().getMonth()+1 : new Date().getMonth();
let yearInvoice = new Date().getFullYear();

let urlMonthInvoice = global.url.concat(`/date/${monthInvoice}-${yearInvoice}`);

const leftArrow = document.querySelector(".seta_esquerda");
const rightArrow = document.querySelector(".seta_direita");
const monthTitle = document.querySelector(".mes_atual");
const yearTitle = document.querySelector(".ano_atual");
const invoiceTotal = document.querySelector(".total span");
const gasTotal = document.querySelector(".combustivel_ap span");

// array of all the transactions
export let transactions = [];

//sets the correct month and year string title
function setCorrectTitle(){
	const dataString = "2025-0"+monthInvoice+"-29";
	const monthString = new Date(dataString)
						.toLocaleDateString("pt-BR",{"month":"long"});
					
	monthTitle.innerHTML = monthString.replace(monthString.charAt(0),
									monthString.charAt(0).toUpperCase());
	
	yearTitle.innerHTML = yearInvoice;	
}

//sums the price of each transaction and return the total
function setTotal(body){
	if(body.length){
		const arrayPrecos = body.map((i)=>i.preco);
		return arrayPrecos.reduce((acumulador,atual)=>acumulador+atual)
			.toLocaleString("pt-BR",{style: 'currency', currency: 'BRL'});
	}else{
		return "R$ 0,00"}
}

//sets the total of gas spent in that month
function setTotalGasSpent(){
	fetch(urlMonthInvoice.concat(`/category/Posto`))
		.then((r) => r.json())
		.then((body) =>{
			gasTotal.innerHTML = setTotal(body);
	})
}

function clearTransactions(){
	document.getElementById("transacoes_nome").innerHTML =
		`<p class="transacoes_titulo">Nome</p>`;
	document.getElementById("transacoes_data").innerHTML =	
		`<p class="transacoes_titulo">Data</p>`;
	document.getElementById("transacoes_tipo").innerHTML =	
		`<p class="transacoes_titulo">Tipo</p>`;
	document.getElementById("transacoes_categoria").innerHTML =	
		`<p class="transacoes_titulo">Categoria</p>`;
	document.getElementById("transacoes_parcelas").innerHTML =
		`<p class="transacoes_titulo">Parcelas</p>`;
	document.getElementById("transacoes_preco").innerHTML =	
		`<p class="transacoes_titulo">Preço</p>`;
	
		
	selectionForRemoval.innerHTML=``;
}

//adds the month transactions to the transactions tab and sets the total for that month
function addTransactionsFromDb() {
	
	fetch(urlMonthInvoice)
	    	.then((r) => r.json())
	    	.then((body) => {
				
	      		for (let i = 0; i < body.length; i++) {
					document.getElementById("transacoes_nome")
							.innerHTML += `<div class="linha">${body[i].nome}</div>`;
							
					document.getElementById("transacoes_data")
					  		.innerHTML += `<div class="linha">
							${global.formattedDate(body[i].data)}</div>`;
							
					document.getElementById("transacoes_tipo")
							.innerHTML += `<div class="linha">
							${body[i].tipo}</div>`;
							
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
						option.setAttribute("date-data",
											`${global.formattedDate(body[i].data)}`);
						option.setAttribute("preco-data",`${body[i].preco}`)
						option.innerHTML = `${body[i].nome}`;
						selectionForRemoval.appendChild(option);
					
	     		}
				 
				invoiceTotal.innerHTML = setTotal(body);		
	   		});
}

export function httpPostTransaction(){
	const formValueNome = document.forms.transaction.nome.value;
	const formValueData = document.forms.transaction.data.value;
	const formValuePreco = document.forms.transaction.preco.value;
	const formValueParcelas = document.forms.transaction.parcelas.value;
	const formValueCategoria = document.forms.transaction.categoria.value;
	const formValueTipo = document.forms.transaction.tipo.value;

	console.log(formValueData);
	if(	global.formValidated(formValueNome) &&
		global.formValidated(formValueData) &&
		global.formValidated(formValuePreco) &&
		global.formValidated(formValueParcelas) &&
		global.formValidated(formValueCategoria) &&
		global.formValidated(formValueTipo)){
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
					    "categoria": "${formValueCategoria}",
						"tipo": "${formValueTipo}"
					    }`,
					};
			fetch(global.url, options).then(() => location.reload(true));
			modalElementAdd.classList.remove("flex");
	}
}

export default function initFetch() {
			
	setCorrectTitle();
	
	//adds all transactions to the array
	fetch(global.url)
		.then((r)=>r.json())
		.then((body)=>{
			transactions=transactions.concat(body);
	});

	addTransactionsFromDb();
	//setTotalGasSpent();
	
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
	
		urlMonthInvoice = global.url.concat(`/date/${monthInvoice}-${yearInvoice}`);
		clearTransactions();
		
		setCorrectTitle();
												
		addTransactionsFromDb();

		resetRemovalModal();
		//setTotalGasSpent();
		
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
		
		urlMonthInvoice = global.url.concat(`/date/${monthInvoice}-${yearInvoice}`);
		clearTransactions();
		
		setCorrectTitle();

		addTransactionsFromDb();
		
		resetRemovalModal();
		//setTotalGasSpent();	
	})
}