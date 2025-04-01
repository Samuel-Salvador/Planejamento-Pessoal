import {formValidated} from "./global.js";


if(location.toString()=="https://planejamento-pessoal-17b194180e9e.herokuapp.com/html/register.html"){
	const confirmButton = document.querySelector(".confirm");
	const backButton = document.querySelector(".back");

	confirmButton.addEventListener("click",()=>{
		register();
	})
	
	document.addEventListener("keydown",(event)=>{
		if(event.key==="Enter"){
			register();
		}
	})
	
	backButton.addEventListener("click",()=>{
		location.assign("https://planejamento-pessoal-17b194180e9e.herokuapp.com/");
	})
	
}

function register(){
	const userFullName = document.forms.register.fullname.value;
	const userNickname = document.forms.register.login.value;
	const userBirthday = document.forms.register.birthday.value;
	const userEmail = document.forms.register.email.value;

	const userPassword = document.forms.register.password.value;
	const userConfirmPassword = document.forms.register.password_confirm.value;
	if(	formValidated(userFullName) &&
		formValidated(userNickname) &&
		formValidated(userBirthday) &&
		formValidated(userEmail) &&
		formValidated(userPassword) &&
		formValidated(userConfirmPassword) &&
		userPassword===userConfirmPassword){
			const options = {
			method: "POST",
			headers: {
					"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({
						name: userFullName,
						username: userNickname,
						birthday: userBirthday,
						email: userEmail,
						password: userPassword})
			};
			fetch("http://127.0.0.1:3030/users", options).then(()=>location.assign("https://planejamento-pessoal-17b194180e9e.herokuapp.com/"));
	}
}