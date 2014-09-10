var last_type = {write:"cv", latex:"cv", web:"cv", cotton:"cv"};
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

var prices = {write:{cv:[497,897,200,300], ps:[1197,3588,200,0], rl:[497,1397,200,0]},
				latex:{cv:[399,599,799,999,200], ps:[299,399,499,599,100], rl:[199,299,399,499,100]},
				web:{cv:[797,1497,3497,1397,2297,4497,2197,3397,5997]},
				cotton:{cv:[797,2997,13997]}};
var last_count = {write:{cv:0, ps:0, rl:0}, latex:{cv:0, ps:0, rl:0}, web:{cv:0}, cotton:{cv:0}};

function showPrice(base, count, obj)
{
	document.getElementById(base+last_type[base]+last_count[base][last_type[base]]).className = "";
	obj.className = "focus";

	last_count[base][last_type[base]] = count;
	var id = null;
	if (base == "write")
	{
		id = document.getElementById(base+0);
		if (id)
		{
			id.innerHTML = "￥" + price(base, count, 0);
		}
		id = document.getElementById(base+1);
		if (id)
		{
			id.innerHTML = "￥" + price(base, count, 1);
		}
		return;
	}
	if (base == "latex")
	{
		id = document.getElementById(base+0);
		if (id)
		{
			id.innerHTML = "￥" + price(base, count, 0);
		}
		id = document.getElementById(base+1);
		if (id)
		{
			id.innerHTML = "￥" + price(base, count, 1);
		}
		id = document.getElementById(base+2);
		if (id)
		{
			id.innerHTML = "￥" + price(base, count, 2);
		}
		id = document.getElementById(base+3);
		if (id)
		{
			id.innerHTML = "￥" + price(base, count, 3);
		}
		return;
	}
	if (base == "web")
	{
		id = document.getElementById(base+0);
		if (id)
		{
			id.innerHTML = "￥" + price(base, count, 0);
		}
		id = document.getElementById(base+1);
		if (id)
		{
			id.innerHTML = "￥" + price(base, count, 1);
		}
		id = document.getElementById(base+2);
		if (id)
		{
			id.innerHTML = "￥" + price(base, count, 2);
		}
		return;
	}
}

function price(base, count, serv)
{
	if (base == "write")
	{
		return prices[base][last_type[base]][serv] + count * prices[base][last_type[base]][serv+2];
	}
	if (base == "latex")
	{
		return prices[base][last_type[base]][serv] + count * prices[base][last_type[base]][4];
	}
	if (base == "web")
	{
		return prices[base][last_type[base]][serv + count*3];
	}
	if (base == "cotton")
	{
		return prices[base][last_type[base]][serv];
	}
}

var storage = window.localStorage;
/*var storage = window.sessionStorage;*/


var services = {write:{cv:0,ps:0,rl:0},latex:{cv:0,ps:0,rl:0},web:{cv:0},cotton:{cv:0}};

function addtoCart(base, service)
{
	var name = base+service+last_type[base]+last_count[base][last_type[base]];
	if (document.getElementById(name))
		return;
	document.getElementById("clogo").className = "clogo add";
	setTimeout(function(){document.getElementById("clogo").className="clogo";}, 300);
	var obj = document.createElement("div");
	obj.setAttribute("id", name);
	obj.className = "shop";
	obj.innerHTML = info(base, service);

	var po = document.createElement("p");
	po.className = "right";
	po.innerHTML = price(base, last_count[base][last_type[base]], service) + " 元";
	obj.appendChild(po);

	document.getElementById("cart").appendChild(obj);

	var pri = document.getElementById("price");
	var tmp = parseInt(pri.innerHTML);
	tmp += price(base, last_count[base][last_type[base]], service);
	pri.innerHTML = tmp;
	storage.setItem("data", document.getElementById("cart").innerHTML);
	storage.setItem("price", tmp);
	storage.setItem("status", "1");
}

function rmfromCart(base, type, count, service, obj)
{
	var name = base+service+type+count;
	obj.parentNode.parentNode.removeChild(obj.parentNode);
	storage.setItem("data", document.getElementById("cart").innerHTML);
	if (document.getElementById("cart").innerHTML == "")
		storage.removeItem("status");
}


var bases = {latex:"LATEX排版", web:"个人网页制作", cotton:"套磁服务"};
var scales = {write:{cv:["1页","2页","3页","4页"],
					ps:["0-600字","601-900字","901-1200字","1201-1500字"],
					rl:["0-300字","301-600字","601-900字"]},
			latex:["1页","2页","3页及以上"],
			web:["1-5页","6-10页","11-20页"]};

function info(base, service)
{
	var tmp = "";
	if (base == "write")
	{
		if (service == 0)
			tmp += "文书修改  ";
		else
			tmp += "写作辅导  ";

		tmp += names[last_type[base]] + "  ";
		if (last_type[base] == "cv" || service == 0)
			tmp += scales[base][last_type[base]][last_count[base][last_type[base]]];
	}
	else
	{
		tmp += bases[base] + "  ";
		switch (service)
		{
			case 0:
			{
				tmp += "基础服务  ";
				break;
			}
			case 1:
			{
				tmp += "进阶服务  ";
				break;
			}
			case 2:
			{
				tmp += "精致服务  ";
				break;
			}
			default:
			{
				tmp += "定制服务  ";
				break;
			}
		}
		if (base == "latex")
		{
			tmp += names[last_type[base]] + "  ";
		}
		if (base != "cotton")
		{
			tmp += scales[base][last_count[base][last_type[base]]];
		}
	}
	return tmp;
}

function Switch(obj)
{
	var parent = obj.parentNode;
	if (parent.className=="cart")
		parent.className="cart visit";
	else
		parent.className="cart";
}

function restoreItem()
{
	if (storage.getItem("status") == "1")
	{
		document.getElementById("cart").innerHTML = storage.getItem("data");
		document.getElementById("price").innerHTML = storage.getItem("price");
	}
}


















