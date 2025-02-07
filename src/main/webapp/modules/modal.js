const botao_adicionar_transicao = document.querySelector(
  ".botao_adicionar_transicao"
);

const modal = document.querySelector(".adicionar_transacao");

const x = document.querySelector(".modal a");

export default function initModal() {
  botao_adicionar_transicao.addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.add("ativar");
  });

  x.addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.remove("ativar");
  });
}
