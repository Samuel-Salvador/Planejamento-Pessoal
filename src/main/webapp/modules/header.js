import * as global from './global.js';

export default function initHeader(){
	
	const balance = document.querySelector(".saldo span");
	fetch(global.url.replace("transactions","users"))
		.then((r)=>r.json()).then((body)=>
			balance.innerHTML = global.formattedPrice(body[0].balance)	
)};
