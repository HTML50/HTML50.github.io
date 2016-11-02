var httpRequest,id;
makeRequest('list.html')

function makeRequest(url,boolean) {
httpRequest = new XMLHttpRequest();
Pace.restart();
if (!httpRequest) {
  console.log('Giving up :( Cannot create an XMLHTTP instance');
  return false;
}
document.getElementById('spinner').style.display='block';
document.getElementById('list').classList.add ('animation','fadeOutDown');
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
	  Pace.on('done', function() {
	document.getElementById('list').innerHTML = httpRequest.responseText;
	document.getElementById('list').classList.remove ('fadeOutDown');
	document.getElementById('list').classList.add ('fadeInUp');
	document.getElementById('spinner').style.display='none';
	})
	smoothMove(520);
  } else {
	alert('There was a problem with the request.');
  }
}


window.onpopstate = function(event) {
	if(location.pathname == '/'){
		makeRequest('list.html');	
	}
	else{
		makeRequest(location.pathname);	
	}
	
};

document.addEventListener("mousewheel", MouseWheelHandler, false);
// Firefox
document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
function MouseWheelHandler(e) {
	clearInterval(id)
	return false;
}

document.addEventListener("scroll", function(){
	if(window.pageYOffset > 800){
		if(document.getElementById('nav').style.opacity==0) document.getElementById('nav').style.opacity=1;
	}
	else{
		if(document.getElementById('nav').style.opacity==1) document.getElementById('nav').style.opacity=0;
	}
});
}



function smoothMove(y){
	var	height = window.pageYOffset;
	if(height < y){
	id = setInterval(function(){
		window.scrollTo(0, height);
		if(height<y-110){
		height+=100;
		}
		else if(height<y-20){
			height+=3;
		}
		else if(height<y){
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
		if(height > y+110){
		height-=100;
		}
		else if(height>y+20){
			height-=3;
		}
		else if(height>y){
			height-=1;
		}
		else{
		clearInterval(id)
		}
	},16)
	}
}


