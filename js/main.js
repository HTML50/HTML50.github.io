var httpRequest;
makeRequest('list.html')

function makeRequest(url) {
httpRequest = new XMLHttpRequest();

if (!httpRequest) {
  console.log('Giving up :( Cannot create an XMLHTTP instance');
  return false;
}

httpRequest.onreadystatechange = alertContents;
httpRequest.open('GET', url);
httpRequest.send();

if(url != location.pathname){
history.pushState(null, null, url);
}
}

function alertContents() {
if (httpRequest.readyState === XMLHttpRequest.DONE) {
  if (httpRequest.status === 200) {
	document.getElementById('list').innerHTML = httpRequest.responseText;
	 smoothMove()
  } else {
	alert('There was a problem with the request.');
  }
}


window.onpopstate = function(event) {
	makeRequest(location.pathname);
};

}

function smoothMove(){
	var height = window.pageYOffset,id;
	
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
