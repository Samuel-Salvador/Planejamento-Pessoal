import {userClickEvents,formattedDate} from "./global.js";
import {userData,fetchUser} from "./header.js";

const settingsModal = document.querySelector(".user_settings_modal_section");
const settingsInnerContentElement = document.querySelector(".container_settings_inner_content");
const settingsInnerContentUserData = document.querySelector(".container_settings_inner_content").innerHTML;


export function openSettingsModal(){
	settingsModal.classList.add("flex");
}

function closeSettinsModal(event){
	event.preventDefault();
	settingsModal.classList.remove("flex");
}

function clickOutsideModal(event){
	if(event.target==this){
		closeSettinsModal(event);
	}	
}

function changeVisibilityPassword(){
	
	const containerPassword = document.querySelector(".container_password_settings");
	const dataSettingPasswordInput = document.getElementById("user_settings_password_input");
	const currentImg = containerPassword.querySelector("img");
	
	const visibilityOn = document.createElement("img");
	visibilityOn.setAttribute("src","../img/visibility_on.png");
	visibilityOn.setAttribute("class","settings_password_visibility");
	visibilityOn.setAttribute("img_visibility_on","");
	
	const visibilityOff = document.createElement("img");
	visibilityOff.setAttribute("src","../img/visibility_off.png");
	visibilityOff.setAttribute("class","settings_password_visibility");
	visibilityOff.setAttribute("img_visibility_off","");

	userClickEvents.forEach((userEvent)=>{
		visibilityOn.addEventListener(userEvent,changeVisibilityPassword);	
		visibilityOff.addEventListener(userEvent,changeVisibilityPassword);
	})
	
	if(currentImg.hasAttribute("img_visibility_on")){
		containerPassword.removeChild(currentImg);
		containerPassword.appendChild(visibilityOff);
		dataSettingPasswordInput.setAttribute("placeholder","••••••••••••");
	}else{
		containerPassword.removeChild(currentImg);
		containerPassword.appendChild(visibilityOn);
		dataSettingPasswordInput.setAttribute("placeholder",userData.password);

	}
	
	
}

export async function initSettingsModal(){
	
	const closeModalButton = document.querySelector(".x_settings");
	const menuItems = document.querySelectorAll(".settings_menu_list_item");
	
	userClickEvents.forEach((userEvent)=>{
		closeModalButton.addEventListener(userEvent,closeSettinsModal);
		settingsModal.addEventListener(userEvent,clickOutsideModal);
		
		menuItems.forEach((menuItem)=>menuItem.addEventListener(userEvent,()=>{
			changeCurrentMenuItem(menuItem);
		}));
	})
	changePlaceholdersUserData();
	
}

function changeCurrentMenuItem(menuItem){
	
	const rightArrowImg = document.querySelector(".active_option");
	const parentElementImg = rightArrowImg.parentElement;
	
	parentElementImg.removeChild(rightArrowImg);
	menuItem.appendChild(rightArrowImg);
	
	const settingsInnerContentDeleteAccount = 
	`<div class="settings_delete_account_data">
		<h3 class="settings_delete_account_title">Excluir conta de usuário</h3>
		<a class="x_settings x" href="">X</a>
		<p class="delete_account_question">Tem certeza que deseja <span>excluir</span> sua conta de usuário?
	<br> Esta ação NÃO pode ser desfeita.</p>
		<button class="settings_modal_button delete_account_button" type="button">Excluir</button>
	</div>`;
	
	if(menuItem.hasAttribute("delete_account")){
		settingsInnerContentElement.innerHTML = settingsInnerContentDeleteAccount;
	} else{
		settingsInnerContentElement.innerHTML = settingsInnerContentUserData;
		changePlaceholdersUserData();
	}
	 
}

async function changePlaceholdersUserData(){
	const passwordVisibility = document.querySelector(".settings_password_visibility");
		
	const dataSettingFullnameInput = document.getElementById("user_settings_fullname_input");
	const dataSettingUsernameInput = document.getElementById("user_settings_username_input");
	const dataSettingBirthdayInput = document.getElementById("user_settings_birthday_input");
	const dataSettingEmailInput = document.getElementById("user_settings_email_input");
		
	const dataSettingIncomeInput = document.getElementById("user_settings_income_input");
	const dataSettingBalanceInput = document.getElementById("user_settings_balance_input");
		
	await fetchUser();
		
	dataSettingFullnameInput.setAttribute("placeholder",userData.name);
	dataSettingUsernameInput.setAttribute("placeholder",userData.username);
	dataSettingBirthdayInput.setAttribute("placeholder",formattedDate(userData.birthday));
	dataSettingEmailInput.setAttribute("placeholder",userData.email);
	
	userClickEvents.forEach((userEvent)=>{
		passwordVisibility.addEventListener(userEvent,changeVisibilityPassword);
	});
	
		
}


