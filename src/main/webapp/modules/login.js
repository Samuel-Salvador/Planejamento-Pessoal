export let loggedUserId = sessionStorage.userId;



if(location.toString()=="http://127.0.0.1:3030/"){
	const userNameElement = document.forms.login.user_name;
	const userPasswordElement = document.forms.login.password;
								
	if(localStorage.userId==null){
		
		const loginButton = document.querySelector(".login_button");
		
		['click','touchstart'].forEach((userEvent)=>{
			loginButton.addEventListener(userEvent,(event)=>login(event));
			userNameElement.addEventListener(userEvent,()=>removeOutline(userNameElement));
			userPasswordElement.addEventListener(userEvent,()=>removeOutline(userPasswordElement));
		})
		
		document.addEventListener("keydown",(event)=>{
			if(event.key==="Enter"){
				login(event);
			}
		})
	}else{
		sessionStorage.userId = localStorage.userId;
		location.assign("http://127.0.0.1:3030/html/finance.html");
	}
	
	async function login(event){
		event.preventDefault();
		const userName = document.forms.login.user_name.value;
		const userPassword = document.forms.login.password.value;
		const rememberCheckBox = document.forms.login.remember.checked;
		
		const responseUsers = await fetch("http://127.0.0.1:3030/users");
		const usersJSON = await responseUsers.json();
		
		console.log(usersJSON);
			
		for(let i=0;i<usersJSON.length;i++){
			if(	usersJSON[i].username === userName &&
				usersJSON[i].password === userPassword){
					if(rememberCheckBox){
						localStorage.userId = usersJSON[i].id;
					}
				sessionStorage.userId = usersJSON[i].id;
				loggedUserId = usersJSON[i].id;
				location.assign("http://127.0.0.1:3030/html/finance.html");
				removeOutline(userNameElement);
				removeOutline(userPasswordElement);
			}else{	
				userNameElement.setAttribute("class","login_input login_error");
				userPasswordElement.setAttribute("class","login_input login_error");
			}
		}
	}
	
	function removeOutline(element){
		element.setAttribute("class","login_input");
	}
}
