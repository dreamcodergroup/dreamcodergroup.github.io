var last_type = {write:"cv", latex:"cv", web:"cv"};
var names = {cv:"简历", ps:"个人陈述", rl:"推荐信"};

function showScale(base, type, obj)
{
	obj.className = "focus";

	if (type == "")
		return;

	if (last_type[base])
	{
		document.getElementById(base + "-name").innerHTML = names[type];
		var otmp = document.getElementById(base + "t" + last_type[base]);
		if (otmp)
		{
			otmp.className = "";
		}
		otmp = document.getElementById(base + "-" + last_type[base]);
		if (otmp)
		{
			var tmp = otmp.className;
			tmp = tmp.substring(0, tmp.length - 5);
			otmp.className = tmp;
		}
		otmp = document.getElementById(base + "-" + type);
		if (otmp)
			otmp.className += " show";
		last_type[base] = type;
		showPrice(base, last_count[base][type], document.getElementById(base+last_type[base]+last_count[base][type]));
	}
}

var prices = {write:{cv:[497,897,200,300], ps:[997,3588,300,0], rl:[497,1397,200,0]},
				latex:{cv:[399,599,799,999,100], ps:[299,399,499,599,100], rl:[199,299,399,499,100]},
				web:{cv:[797,1497,3497,1397,2297,4497,2197,3397,5997]}};
var last_count = {write:{cv:0, ps:0, rl:0}, latex:{cv:0, ps:0, rl:0}, web:{cv:0}};

function showPrice(base, count, obj)
{
	document.getElementById(base+last_type[base]+last_count[base][last_type[base]]).className = "";
	obj.className = "focus";

	last_count[base][last_type[base]] = count;
	var id = null;
	if (base == "write")
	{
		id = document.getElementById(base+"-modify");
		if (id)
		{
			id.innerHTML = "￥" + (prices[base][last_type[base]][0] + count * prices[base][last_type[base]][2]);
		}
		id = document.getElementById(base+"-write");
		if (id)
		{
			id.innerHTML = "￥" + (prices[base][last_type[base]][1] + count * prices[base][last_type[base]][3]);
		}
		return;
	}
	if (base == "latex")
	{
		id = document.getElementById(base+"-service0");
		if (id)
		{
			id.innerHTML = "￥" + (prices[base][last_type[base]][0] + count * prices[base][last_type[base]][4]);
		}
		id = document.getElementById(base+"-service1");
		if (id)
		{
			id.innerHTML = "￥" + (prices[base][last_type[base]][1] + count * prices[base][last_type[base]][4]);
		}
		id = document.getElementById(base+"-service2");
		if (id)
		{
			id.innerHTML = "￥" + (prices[base][last_type[base]][2] + count * prices[base][last_type[base]][4]);
		}
		id = document.getElementById(base+"-service3");
		if (id)
		{
			id.innerHTML = "￥" + (prices[base][last_type[base]][3] + count * prices[base][last_type[base]][4]);
		}
		return;
	}
	if (base == "web")
	{
		id = document.getElementById(base+"-service0");
		if (id)
		{
			id.innerHTML = "￥" + prices[base][last_type[base]][0 + count*3];
		}
		id = document.getElementById(base+"-service1");
		if (id)
		{
			id.innerHTML = "￥" + prices[base][last_type[base]][1 + count*3];
		}
		id = document.getElementById(base+"-service2");
		if (id)
		{
			id.innerHTML = "￥" + prices[base][last_type[base]][2 + count*3];
		}
		return;
	}
}

function addtoChart(base, service)
{

}


















