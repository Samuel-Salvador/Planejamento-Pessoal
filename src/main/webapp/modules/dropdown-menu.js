import outsideClick from "./outsideClick.js";

export default function initDropdownMenu(){
	const userNameDiv = document.querySelector(".container_user_name");
	const dropdownMenu = document.querySelector(".dropdown-menu");
	const settingsDropdown = document.querySelector(".settings_dropdown");
	const signOutDropdown = document.querySelector(".logout");
	

	const userEvents = ['touchstart','click'];
	userEvents.forEach(userEvent =>{
		userNameDiv.addEventListener(userEvent, handleClickDropdownMenu);
		signOutDropdown.addEventListener(userEvent,handleClickSignOut);
	})
	
	function handleClickDropdownMenu(event){
		event.preventDefault();
		this.classList.add('active');
		
		outsideClick(this, userEvents, ()=>this.classList.remove('active'));
	}
	
	function handleClickSignOut(event){
		event.preventDefault();
		
		localStorage.removeItem("userId");
		sessionStorage.removeItem("userId");
		location.assign("http://127.0.0.1:3030/");
	}	
}

