export default function outsideClick(element,userEvents, callback){
	const html = document.documentElement;
	const outside = 'data-outsideclick';
		
	if(!element.hasAttribute(outside)){
		userEvents.forEach(userEvent => {
			html.addEventListener(userEvent,handleOutsideClick);
		})
		element.setAttribute(outside,'');
	}
		
	function handleOutsideClick(event){
		if(!element.contains(event.target)){
			
			element.removeAttribute(outside);
			userEvents.forEach(userEvent => {
				html.removeEventListener(userEvent,handleOutsideClick);
			})
			callback();
		}		
	}
}
