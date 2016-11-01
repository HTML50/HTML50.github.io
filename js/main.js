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
  } else {
	alert('There was a problem with the request.');
  }
}


window.onpopstate = function(event) {
	makeRequest(location.pathname);
};

}

