var last_case = {cases:0,latex:0};

function showCase(typ, index)
{
	if (index == last_case[typ])
		return;
	document.getElementById(typ + last_case[typ]).className = "det hide";
	
	document.getElementById(typ + index).className = "det show";
	last_case[typ] = index;
}

function scrollNav()
{
	var obj = document.getElementById('global');	

	if (document.body.offsetWidth > 950)
		return;
	
	var browserLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
	if(obj)
	{
		if (obj.className == "fixed")
			obj.style.left = (0 - browserLeft) + "px";
		else
			obj.style.left = "0px";
	}

	obj = document.getElementById('section');
	if(obj)
	{
		obj.style.left = (0 - browserLeft) + "px";
	}
	obj = document.getElementById('page1');
	if(obj)
	{
		if (obj.className == "service fixed")
			obj.style.left = (0 - browserLeft) + "px";
		else 
			obj.style.left = "0px";
	}
}

function scrollAnim()
{
	var browserTop = document.body.scrollTop || document.documentElement.scrollTop;
	var global = document.getElementById('global');
	var page1 = document.getElementById('page1');
	var page2 = document.getElementById('page2');
	var scrollheight = document.getElementById('header').scrollHeight - 80;
	var scrolld = window.screen.availHeight - 140;

	if(browserTop>=scrollheight)
	{
		global.className = 'fixed';
		page1.className = "service fixed";
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
		}
	}
	else
	{
		global.className = '';
		page1.className = "service";
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















