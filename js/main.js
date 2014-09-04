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


var scrollHeight = 0;
var scrolld = 0;

function scrollAnim()
{
	var browserTop = document.body.scrollTop || document.documentElement.scrollTop;
	var global = document.getElementById('global');
	var page1 = document.getElementById('page1');
	var page2 = document.getElementById('page2');

	if(browserTop>=scrollHeight)
	{
		global.className = 'fixed';
		page1.className = "service fixed";
		page2.style.marginTop = scrolld + 50 + "px";
		browserTop += page1.scrollHeight - 100;
		var top = page2.offsetTop;
		if (top <= browserTop)
		{
			page1.className = "service";
			page1.style.marginTop = scrolld - document.getElementById('page1').clientHeight + 50 + "px";
			page1.style.marginBottom = "0px";
			page2.style.marginTop = "0px";
		}
		else
		{
			page1.className = "service fixed";
			page1.style.marginTop = "0px";
			page1.style.marginBottom = "250px";
			page2.style.marginTop = scrolld + 50 + "px";
		}
	}
	else
	{
		global.className = '';
		page1.className = "service";
		return;
	}
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
	speed = speed - 20;
	if (speed <= 10)
		speed = 10;
	var browserTop = document.body.scrollTop || document.documentElement.scrollTop;
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
	/*else
	{
		interval = null;
	}*/
	return;
}















