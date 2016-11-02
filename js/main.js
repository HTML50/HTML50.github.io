var httpRequest,id;
makeRequest('list.html')

function makeRequest(url,boolean) {
httpRequest = new XMLHttpRequest();

if (!httpRequest) {
  console.log('Giving up :( Cannot create an XMLHTTP instance');
  return false;
}

document.getElementById('list').classList.add ('animation','fadeOut');
httpRequest.onreadystatechange = alertContents;

setTimeout(function(){
	httpRequest.open('GET', url);
	httpRequest.send();
	//pushState will change the broswer's file path. 
	//if do this before ajax get. You will get wrong
	//eg. request: blog/index.html
	//you get: blog/blog/index.html
	if(url != location.pathname){
	history.pushState(null, null, url);
	}
},250)

}

function alertContents() {
if (httpRequest.readyState === XMLHttpRequest.DONE) {
  if (httpRequest.status === 200) {
	document.getElementById('list').innerHTML = httpRequest.responseText;
	document.getElementById('list').classList.remove ('fadeOut');
	document.getElementById('list').classList.add ('fadeInUp');
	smoothMove()
  } else {
	alert('There was a problem with the request.');
  }
}


window.onpopstate = function(event) {
	makeRequest(location.pathname);
};

document.addEventListener("mousewheel", MouseWheelHandler, false);
// Firefox
document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
function MouseWheelHandler(e) {

	clearInterval(id)

	return false;
}
}



function smoothMove(){
	var height = window.pageYOffset;
	
	if(height < 520){
	id = setInterval(function(){
		window.scrollTo(0, height);
		if(height <440){
		height+=15;
		}
		else if(height<490){
			height+=3;
		}
		else if(height<520){
			height+=1;
		}
		else{
		clearInterval(id)
		}
	},16)
	}
	else {
		id = setInterval(function(){
		window.scrollTo(0, height);
		if(height > 600){
		height-=15;
		}
		else if(height>550){
			height-=3;
		}
		else if(height>=521){
			height-=1;
		}
		else{
		clearInterval(id)
		}
	},16)
	}
}


