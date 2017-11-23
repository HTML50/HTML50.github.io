var httpRequest, id, flag = 0;
//flag:
//0: site open
//1: blog page
//2: other page
//3  


//open index.html and load list.html, with flag=0, means no auto scroll roll
if(location.hash === ''){
	makeRequest('list.html')
}else{
	flag=1;
	makeRequest(location.hash.slice(1));
}
FSS("header", "dynamic-background");
//generate the header animation

//not reset scroll's position
if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual';
}


//watch history's backward and upward
window.onpopstate = function(event) {
	if (location.pathname == '/') {
		makeRequest('list.html');
	} else {
		makeRequest(location.pathname);
	}
};



function addEvent(){
	//stop auto scroll when use wheel
	document.addEventListener("mousewheel", MouseWheelHandler,{passive: true});
	document.addEventListener("DOMMouseScroll", MouseWheelHandler,{passive: true}); //firefox
}

function removeEvent(){
	//stop auto scroll when use wheel
	document.removeEventListener("mousewheel", MouseWheelHandler);
	document.removeEventListener("DOMMouseScroll", MouseWheelHandler); //firefox
}


function MouseWheelHandler(e) {
	if(id){
		clearInterval(id);
		id = undefined;
		removeEvent();
	}
	return false;
}

//right bottom conner's nav
document.addEventListener("scroll", throttle(function() {
	if (window.pageYOffset > 600) {
			document.getElementById('nav').style.visibility = "visible"
			document.getElementById('nav').style.opacity = 1;
	} else {
			document.getElementById('nav').style.opacity = 0;
			setTimeout("document.getElementById('nav').style.visibility = 'hidden'",250)
	}
},300),{passive: true});

//catch user press F5 and block page's reload
window.addEventListener("keydown", function(e) {
	if (e.keyCode === 0x74) {
		e.preventDefault();
		makeRequest(location.href);
	}
});


//ajax and pushState makes SPA 
function makeRequest(url, num) {
	if(location.pathname === url){
		smoothMove(520);
		return;
	}

	httpRequest = new XMLHttpRequest();

	//blog flag
	if (num === 1) {
		flag = 1;
	}

	document.getElementById('spinner').style.display = 'block';
	document.getElementById('list').classList.add('animation', 'fadeOutDown');
	httpRequest.onreadystatechange = alertContents;

	//for transition animation
	setTimeout(function() {
		httpRequest.open('GET', url);
		httpRequest.send();
		//pushState will change the broswer's file path. 
		//if do this before ajax get. You will get wrong
		//eg. request: blog/index.html
		//you get: blog/blog/index.html
		if (url != location.pathname) {
			history.pushState(null, null, url);
		}
	}, 250)
}

//ajax
function alertContents() {
	if (httpRequest.readyState === XMLHttpRequest.DONE) {
		if (httpRequest.status === 200) {
			var ajaxSource = httpRequest.responseText;

			if (flag == 1) {
				ajaxSource = ajaxSource.replace(/<!doctype html>[\s\S|\.]*<body>/, '');
			}
      
			document.getElementById('list').innerHTML = ajaxSource;
      if (flag == 1) {
        var nodes = document.getElementsByTagName('pre'),i=0;
        for(;i<nodes.length;i++){
          hljs.highlightBlock(nodes[i]);
        }
      }
      
			document.getElementById('list').classList.remove('fadeOutDown');
			document.getElementById('list').classList.add('fadeInUp');
			document.getElementById('spinner').style.display = 'none';
			if (flag != 0) {
				smoothMove(520);
			}
      flag = null;
		}
	}
}

function smoothMove(y) {
	if(id){
		clearInterval(id)
	}
	addEvent();
	var height = window.pageYOffset;
	if (height < y) {
		id = setInterval(function() {
			window.scrollTo(0, height);
			if (height < y - 110) {
				height += 80;
			} else if (height < y - 20) {
				height += 3;
			} else if (height < y) {
				height += 1;
			} else {
				clearInterval(id)
			}
		}, 16)
	} else {
		id = setInterval(function() {
			window.scrollTo(0, height);
			if (height > y + 1000) {
				height -= 500;
			}
			if (height > y + 110) {
				height -= 80;
			} else if (height > y + 20) {
				height -= 3;
			} else if (height > y) {
				height -= 1;
			} else {
				clearInterval(id)
			}
		}, 16)
	}
}

function throttle(func, wait) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function() {
      previous = new Date();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = new Date();
      if (!previous) previous = now;
      // 计算剩余时间
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
     if (remaining <= 0 || remaining > wait) {
         if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };