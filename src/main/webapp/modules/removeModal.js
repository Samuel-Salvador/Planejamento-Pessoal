import {transactions} from "./transactionFetchData.js";
import {url, formattedDate } from "./global.js";

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
			<div>Nome: ${transactions[removalCorrectArrayIndex].nome}<br>
			Data: ${formattedDate(transactions[removalCorrectArrayIndex].data)}<br>
			Tipo: ${transactions[removalCorrectArrayIndex].tipo}<br>
			Categoria: ${transactions[removalCorrectArrayIndex].categoria}<br>
			Parcelas: ${transactions[removalCorrectArrayIndex].parcelaAtual+"/"
				+transactions[removalCorrectArrayIndex].parcelas}<br>
			Preço: ${transactions[removalCorrectArrayIndex].preco.toLocaleString("pt-BR",
				{style: 'currency', currency: 'BRL'})}<br>
			</div>`;
		
	});


	//http DELETE
	removalButtonConfirm.addEventListener('click',()=>{
			
		fetch(url+"/"+removalIdDB,{method: "DELETE"})
		.then(location.reload(true));
		removalModal.classList.remove("flex");
	})
}	
	
	