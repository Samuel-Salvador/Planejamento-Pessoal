const url = "http://127.0.0.1:9090/transactions";

const modalConfirmButton = document.querySelector(".modal button");
const modalElement = document.querySelector(".adicionar_transacao");
const selectionForRemoval = document.getElementById("selection_transaction");
const modalRemovalDiv = document.querySelector(".dados_removal");
	

const dateOptions = {
	day: 'numeric',
	month: 'numeric',
	year: 'numeric'
}

function addFromDb(body, i) {
	const dataFromDb = new Date(body[i].data);
	const dataCerta = new Date(dataFromDb.getTime() 
			+ Math.abs(dataFromDb.getTimezoneOffset()*60000)).
			toLocaleString("pt-BR",dateOptions);
	
	document.getElementById("transacoes_nome")
		.innerHTML += `<div class="linha">${body[i].nome}</div>`;
		
  	document.getElementById("transacoes_data")
  		.innerHTML += `<div class="linha">
		${dataCerta}</div>`;
		
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
	option.setAttribute("value",`${body[i].nome}`);
	option.innerHTML = `${body[i].nome}`;
	selectionForRemoval.appendChild(option);
}

function formValidated(validation) {
  if (validation == "") {
    alert("Todos os campos precisam ser preenchidos!");
    return false;
  }else return true;
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
  	fetch(url)
    	.then((r) => r.json())
    	.then((body) => {
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
	
	let removalId = 1;
	
	selectionForRemoval.addEventListener('change',()=>{
		
		const removalButton = document.querySelector(".removal_modal_button");
		removalButton.classList.add("block");
		
		for(let i=0;i<selectionForRemoval.children.length;i++){
			if(selectionForRemoval.value==selectionForRemoval[i].value){
				removalId=i;
			}
		}
		fetch(url).then((r)=> r.json().then((body)=>{
			const dataFromDb = new Date(body[removalId].data);
			const dataCerta = new Date(dataFromDb.getTime() 
						+ Math.abs(dataFromDb.getTimezoneOffset()*60000)).
						toLocaleString("pt-BR",dateOptions);
			
			
			modalRemovalDiv.innerHTML=`<div class="dados_removal_h3 margin"><h3>Dados da transação a ser removida: </h3></div>
					<div>Nome: ${body[removalId].nome}<br>
					Data: ${dataCerta}<br>
				 	Categoria: ${body[removalId].categoria}<br>
					Parcelas: ${body[removalId].parcelaAtual+"/"
						+body[removalId].parcelas}<br>
					Preço: ${body[removalId].preco											.toLocaleString("pt-BR",
						{style: 'currency', currency: 'BRL'})}<br>
					</div>`;
		}))
	});
	
}
