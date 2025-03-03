export let loggedUserId = sessionStorage.userId;

if(location.toString()=="http://127.0.0.1:3030/"){
	if(localStorage.userId==null){
		
		const loginButton = document.querySelector(".login_button");
			
		loginButton.addEventListener("click",login);
		
		document.addEventListener("keydown",(event)=>{
			if(event.key==="Enter"){
				login();
			}
		})
	}else{
		sessionStorage.userId = localStorage.userId;
		location.assign("http://127.0.0.1:3030/html/finance.html");
	}
	
	function login(){
		const userName = document.forms.login.user_name.value;
		const userPassword = document.forms.login.password.value;
		const rememberCheckBox = document.forms.login.remember.checked;
		
		fetch("http://127.0.0.1:3030/users")
			.then((r)=>r.json())
			.then((body)=>{
				for(let i=0;i<body.length;i++){
					if(	body[i].username === userName &&
						body[i].password === userPassword){
							if(rememberCheckBox){
								localStorage.userId = body[i].id;
							}
						sessionStorage.userId = body[i].id;
						loggedUserId = body[i].id;
						location.assign("http://127.0.0.1:3030/html/finance.html");
					}
				}
			})
	}
}
