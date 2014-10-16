var last_case = {cases:0,latex:0};

function showCase(typ, index)
{
	if (index == last_case[typ])
		return;
	document.getElementById(typ + last_case[typ]).className = "det hide";
	
	document.getElementById(typ + index).className = "det show";
	last_case[typ] = index;
}

function HoverIn(obj) {
	if (obj.className == "navi shrink")
	{
		obj.className = "navi shrink hover";
		return;
	}
	if (obj.className == "template")
	{
		obj.className = "template hover";
		return;
	}
}

function HoverOut(obj) {
	if (obj.className == "navi shrink hover")
	{
		obj.className = "navi shrink";
		return;
	}
	if (obj.className == "template hover")
	{
		obj.className = "template";
		return;
	}
}

var files = [/*"CV-template-1"*/];

function Download(name)  {
	for (var key in files) {
		if (files[key] == name)
		{
			window.open("templates/"+name+".zip");
			return;
		}
	};
	window.open("price.html#platex");
}

function scrollNav()
{
	var obj = document.getElementById('global');
	if (document.body.clientWidth <= 1000 && obj.className == "fixed")
		document.getElementById('navi').className = "navi shrink";
	else if (document.body.clientWidth <= 650)
		document.getElementById('navi').className = "navi shrink";
	else
		document.getElementById('navi').className = "navi";
}

function scrollAnim()
{
	var browserTop = document.body.scrollTop || document.documentElement.scrollTop;
	var global = document.getElementById('global');
	/*var page1 = document.getElementById('page1');
	var page2 = document.getElementById('page2');*/
	var scrollheight = document.getElementById('header').scrollHeight - 60;
	/*var scrolld = window.screen.availHeight - 140;*/

	if(browserTop>=scrollheight)
	{
		global.className = 'fixed';
		/*page1.className = "service fixed";
		page2.style.marginTop = scrolld + "px";
		scrollheight += scrolld - page1.clientHeight;
		if (browserTop>=scrollheight)
		{
			page1.className = "service";
			page1.style.marginTop = scrolld - page1.clientHeight + "px";
			page1.style.marginBottom = "0px";
			page2.style.marginTop = "0px";
		}
		else
		{
			page1.className = "service fixed";
			page1.style.marginTop = "0px";
			page1.style.marginBottom = "280px";
			page2.style.marginTop = scrolld + "px";
		}*/
	}
	else
	{
		global.className = '';
		/*page1.className = "service";*/
	}
	scrollNav();
}

function modifyHeight()
{
	var height = window.screen.availHeight;
	if(document.getElementById('header'))
	{
		document.getElementById('header').style.minHeight = height - 60 + "px";
	}
}

var interval = null;

function clearTime()
{
	if(interval)
	{
		clearTimeout(interval);
		interval = null;
	}
}

function scroll(id, delta)
{
	clearTime();
	var x = 0;
	var speed = 200;
	if (id)
	{
		x = document.getElementById(id).offsetTop - delta;
		var height = window.innerHeight;
		var h = document.documentElement.scrollHeight || document.body.scrollHeight;
		if((h - x) < height)
		{
			x = h - height;
		}
	}
	scrollOn(x, speed);
	return;
}

function scrollOn(x, speed)
{
	speed = speed - 15;
	var browserTop = document.body.scrollTop || document.documentElement.scrollTop;
	if (speed <= 5)
	{
		speed = 5;
	}
	var dest = Math.ceil(Math.abs(x - browserTop) / speed);
	if (x < browserTop)
		dest = browserTop - dest;
	else if (x > browserTop)
		dest = browserTop + dest;
	else
		return;
	window.scrollTo(0, dest);
	
	if (x>dest || x<dest)
	{
		var invokeFunction = "scrollOn(" + x + "," + speed + ")";
		interval = window.setTimeout(invokeFunction, 10);
	}
	return;
}

function Message()
{
	var res = document.getElementById('msgresult');
	var sub = document.getElementById('msgsubmit');
	res.className = "show";	
	sub.disabled = "disabled";
	$("#msg").ajaxSubmit(function(message) { 
		if (message == "OK")
		{
			res.innerHTML = "已发送，我们将尽快与您联系";
			setTimeout(function(){
				res.className = "";
				document.getElementById('mmail').value="";
				document.getElementById('message').value="";
				res.innerHTML = "邮件发送中，请稍后……";
			}, 2000);
		}
		else
		{
			res.innerHTML = "发送失败！请再次点击发送";
		}
		sub.disabled = "";
	});
	return false;
}














