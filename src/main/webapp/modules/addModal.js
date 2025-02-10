const botao_adicionar_transicao = document.querySelector(".container_adicionar");
const botao_remover_transicao = document.querySelector(".container_remover");

const modalElementAdd = document.querySelector(".adicionar_transacao");
const modalElementRemove = document.querySelector(".remover_transacao");

const botaoFecharAdd = document.querySelector(".x_add");
const botaoFecharRemove = document.querySelector(".x_removal");

export default function initModal() {
  	botao_adicionar_transicao.addEventListener("click", (event) => {
    	event.preventDefault();
    	modalElementAdd.classList.add("ativar");
  	});

 	botaoFecharAdd.addEventListener("click", (event) => {
    	event.preventDefault();
    	modalElementAdd.classList.remove("ativar");
  	});
  
  	botao_remover_transicao.addEventListener("click", (event) => {
		event.preventDefault();
		modalElementRemove.classList.add("ativar");
    });
	
	botaoFecharRemove.addEventListener("click", (event) => {
	    event.preventDefault();
	    modalElementRemove.classList.remove("ativar");
	});
	
		
}
