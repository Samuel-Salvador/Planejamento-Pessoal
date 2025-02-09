const url = "http://127.0.0.1:5050/transactions";

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
  	document.getElementById("transacoes_preco")
  		.innerHTML += 
		`<div class="linha">${(body[i].preco)
		.toLocaleString("pt-BR",
  			{style: 'currency', currency: 'BRL'})}</div>`;
  	document.getElementById("transacoes_parcelas")
		.innerHTML += `<div class="linha">
		${body[i].parcelaAtual+"/"
		+body[i].parcelas}</div>`;
  	document.getElementById("transacoes_categoria")
		.innerHTML += `<div class="linha">
		${body[i].categoria}</div>`;
}



export default function initFetch() {
  fetch(url)
    .then((r) => r.json())
    .then((body) => {
      for (let i = 0; i < body.length; i++) {
        addFromDb(body, i);
      }
    });
	
	const button = document.querySelector(".modal button");
	
  	button.addEventListener("click", () => {
    const modal = document.querySelector(".adicionar_transacao");

    const nome = document.forms.transaction.nome.value;
    const data = document.forms.transaction.data.value;
    const preco = document.forms.transaction.preco.value;
    const parcelas = document.forms.transaction.parcelas.value;
    const categoria = document.forms.transaction.categoria.value;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: `{
          "nome": "${nome}",
          "data": "${data}",
          "preco": "${preco}",
          "parcelas": "${parcelas}",
          "categoria": "${categoria}"
          }`,
    };
    fetch(url, options).then(() => location.reload(true));
    modal.classList.remove("ativar");
  });
}
