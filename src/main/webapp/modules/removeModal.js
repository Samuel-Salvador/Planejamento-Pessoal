import {transactions} from "./transactionFetchData.js";
import {url, formattedDate,formattedPrice } from "./global.js";

const modalRemovalDiv = document.querySelector(".dados_removal");
const removalButtonConfirm = document.querySelector(".removal_modal_button");
const removalModal = document.querySelector(".remover_transacao");
export const selectionForRemoval = document.getElementById("selection_transaction");


let removalIdDB=0;
let removalCorrectArrayIndex=0;

// sets the data in removal modal to default
export function resetRemovalModal(){
	modalRemovalDiv.innerHTML = `<div class="dados_removal_h3">
									<h3> ← Selecione a transação a ser removida: </h3>
								</div>`;
										
	removalButtonConfirm.classList.remove("block");
			
	selectionForRemoval.innerHTML+= `<option value="" selected disabled hidden>
									Selecione</option>`;
			
}

export function initRemovalModal(){

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
		modalRemovalDiv.innerHTML=`<div class="dados_removal_h3 margin_bottom_20">
			<h3>Dados da transação a ser removida: </h3></div>
			<div>
			<p class="dados_removal_titulo">Nome:</p> 
				<p class="dados_removal_conteudo">${transactions[removalCorrectArrayIndex].nome}</p><br>
			<p class="dados_removal_titulo">Data:</p> 
				<p class="dados_removal_conteudo">${formattedDate(transactions[removalCorrectArrayIndex].data)}</p><br>
			<p class="dados_removal_titulo">Tipo:</p>  
				<p class="dados_removal_conteudo">${transactions[removalCorrectArrayIndex].tipo}</p><br>
			<p class="dados_removal_titulo">Categoria:</p> 
				<p class="dados_removal_conteudo">${transactions[removalCorrectArrayIndex].categoria}</p><br>
			<p class="dados_removal_titulo">Parcelas:</p> 
				<p class="dados_removal_conteudo">${transactions[removalCorrectArrayIndex].parcelaAtual+"/"
				+transactions[removalCorrectArrayIndex].parcelas}</p><br>
			<p class="dados_removal_titulo">Preço:</p>
				<p class="dados_removal_conteudo">${formattedPrice(transactions[removalCorrectArrayIndex].preco)}</p><br>
			</div>`;
		
	});


	//http DELETE
	removalButtonConfirm.addEventListener('click',()=>{
			
		fetch(url+"/"+removalIdDB,{method: "DELETE"})
		.then(location.reload(true));
		removalModal.classList.remove("flex");
	})
}	
	
	