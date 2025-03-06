import * as global from './global.js';

const balanceSPAN = document.querySelector(".balance span");

export let userData = {};

export async function initHeader(){
	
	const userName = document.querySelector(".user_name");
	const balanceVisibilityImg = document.querySelector(".balance_visibility_img");
	
	await fetchUser();
	
	userName.innerHTML = userData.username;
	updateBalanceHeader();
	
	global.userClickEvents.forEach((userEvent)=>{
		balanceVisibilityImg.addEventListener(userEvent,changeVisibilityBalance);	
		})
}

export async function fetchUser(){
	userData = await fetch(global.userUrl).then((r)=>r.json());
}

export async function updateBalanceHeader(){
	
	
	await fetchUser();
	
	if(userData.balance==null){
		balanceSPAN.innerHTML = 'R$ 0,00';
	}else{
		balanceSPAN.innerHTML = global.formattedPrice(userData.balance);
	}
}

function changeVisibilityBalance(){
	
	const containerBalance = document.querySelector(".container_balance");
	const currentImg = containerBalance.querySelector("img");
		
	const visibilityOn = document.createElement("img");
	visibilityOn.setAttribute("src","../img/visibility_on.png");
	visibilityOn.setAttribute("class","balance_visibility_img");
	visibilityOn.setAttribute("img_visibility_on","");
		
	const visibilityOff = document.createElement("img");
	visibilityOff.setAttribute("src","../img/visibility_off.png");
	visibilityOff.setAttribute("class","balance_visibility_img");
	visibilityOff.setAttribute("img_visibility_off","");

	global.userClickEvents.forEach((userEvent)=>{
		visibilityOn.addEventListener(userEvent,changeVisibilityBalance);	
		visibilityOff.addEventListener(userEvent,changeVisibilityBalance);
	})
		
	if(currentImg.hasAttribute("img_visibility_on")){
		containerBalance.removeChild(currentImg);
		containerBalance.appendChild(visibilityOff);
		balanceSPAN.innerHTML = "•••••••••";
	}else{
		containerBalance.removeChild(currentImg);
		containerBalance.appendChild(visibilityOn);
		balanceSPAN.innerHTML = global.formattedPrice(userData.balance);
	}
		
		
}