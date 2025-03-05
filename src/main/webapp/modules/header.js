import * as global from './global.js';

export let userData = {};

export async function initHeader(){
	
	const balanceSPAN = document.querySelector(".balance span");
	const userName = document.querySelector(".user_name");
	
	await fetchUser();
	
	userName.innerHTML = userData.name;
		if(userData.balance==null){
			balanceSPAN.innerHTML = 'R$ 0,00';
		}else{
			balanceSPAN.innerHTML = global.formattedPrice(userData.balance);
		}
}

export async function fetchUser(){
	
	userData = await fetch(global.userUrl).then((r)=>r.json());
}