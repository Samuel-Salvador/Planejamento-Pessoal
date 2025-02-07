const url = "http://localhost:8080/transactions";

fetch(url)
  .then((r) => r.json())
  .then((body) => {
    for (let i = 0; i < body.length; i++) {
      document.getElementById(
        "transacoes_nome"
      ).innerHTML += `<div class="linha">${body[i].nome}</div>`;
      document.getElementById(
        "transacoes_data"
      ).innerHTML += `<div class="linha">${body[i].data}</div>`;
      document.getElementById(
        "transacoes_preco"
      ).innerHTML += `<div class="linha">${body[i].preco}</div>`;
      document.getElementById(
        "transacoes_parcelas"
      ).innerHTML += `<div class="linha">${body[i].parcelas}</div>`;
      document.getElementById(
        "transacoes_categoria"
      ).innerHTML += `<div class="linha">${body[i].categoria}</div>`;
    }
  });
