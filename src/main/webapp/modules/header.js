import * as global from './global.js';

export default function initHeader(){
	
	const balanceSPAN = document.querySelector(".balance span");
	const userName = document.querySelector(".user_name");
	fetch(global.userUrl)
		.then((r)=>r.json()).then((body)=>{
			userName.innerHTML = body.name;
			if(body.id.balance==null){
				balanceSPAN.innerHTML = 'R$ 0,00';
			}else{
				balanceSPAN.innerHTML = global.formattedPrice(body.balance);
			}
		}		
)};
