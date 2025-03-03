import * as global from './global.js';

export default function initHeader(){
	
	const balance = document.querySelector(".saldo span");
	fetch(global.userUrl)
		.then((r)=>r.json()).then((body)=>{
			if(body.id.balance!=null){
				balance.innerHTML = global.formattedPrice(body.balance)
			}
		}		
)};
