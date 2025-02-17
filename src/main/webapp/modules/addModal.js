import { httpPostTransaction } from "./transactionFetchData.js";

const botao_adicionar_transicao = document.querySelector(".container_adicionar");
const botao_remover_transicao = document.querySelector(".container_remover");

export const modalElementAdd = document.querySelector(".adicionar_transacao");
const modalElementRemove = document.querySelector(".remover_transacao");

const botaoFecharAdd = document.querySelector(".x_add");
const botaoFecharRemove = document.querySelector(".x_removal");

const modalConfirmButton = document.querySelector(".modal button");

export function initModal() {
  	botao_adicionar_transicao.addEventListener("click", (event) => {
    	event.preventDefault();
    	modalElementAdd.classList.add("flex");
  	});

 	botaoFecharAdd.addEventListener("click", (event) => {
    	event.preventDefault();
    	modalElementAdd.classList.remove("flex");
  	});
  
  	botao_remover_transicao.addEventListener("click", (event) => {
		event.preventDefault();
		modalElementRemove.classList.add("flex");
    });
	
	botaoFecharRemove.addEventListener("click", (event) => {
	    event.preventDefault();
	    modalElementRemove.classList.remove("flex");
	});
	
	modalConfirmButton.addEventListener('click', () => {
			httpPostTransaction();
	});
		
	modalElementAdd.addEventListener('keydown', (event) => {
		if(event.keyCode === 13){
			httpPostTransaction();
		}
	});
	
		
}
