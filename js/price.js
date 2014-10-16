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

function Initialize()
{
	showPrice('write', 0, document.getElementById('writecv0'));
	showPrice('latex', 0, document.getElementById('latexcv0'));
	showPrice('web', 0, document.getElementById('webcv0'));
}

function showPrice(base, countt, obj)
{
	document.getElementById(base+last_type[base]+last_count[base][last_type[base]]).className = "";
	obj.className = "focus";

	last_count[base][last_type[base]] = countt;
	var id = null;
	if (base == "write")
	{
		id = document.getElementById(base+0);
		if (id)
		{
			id.innerHTML = "￥" + price(base, last_type[base], countt, 0);
		}
		id = document.getElementById(base+1);
		if (id)
		{
			id.innerHTML = "￥" + price(base, last_type[base], countt, 1);
		}
		return;
	}
	if (base == "latex")
	{
		id = document.getElementById(base+0);
		if (id)
		{
			id.innerHTML = "￥" + price(base, last_type[base], countt, 0);
		}
		id = document.getElementById(base+1);
		if (id)
		{
			id.innerHTML = "￥" + price(base, last_type[base], countt, 1);
		}
		id = document.getElementById(base+2);
		if (id)
		{
			id.innerHTML = "￥" + price(base, last_type[base], countt, 2);
		}
		id = document.getElementById(base+3);
		if (id)
		{
			id.innerHTML = "￥" + price(base, last_type[base], countt, 3);
		}
		return;
	}
	if (base == "web")
	{
		id = document.getElementById(base+0);
		if (id)
		{
			id.innerHTML = "￥" + price(base, last_type[base], countt, 0);
		}
		id = document.getElementById(base+1);
		if (id)
		{
			id.innerHTML = "￥" + price(base, last_type[base], countt, 1);
		}
		id = document.getElementById(base+2);
		if (id)
		{
			id.innerHTML = "￥" + price(base, last_type[base], countt, 2);
		}
		return;
	}
}

function price(base, type, countt, serv)
{

	var price = 0;
	if (base == "write")
	{
		price = prices[base][type][serv] + countt * prices[base][type][serv+2] - 200;
	}
	else if (base == "latex")
	{
		price = prices[base][type][serv] + countt * prices[base][type][4] - 100;
	}
	else if (base == "web")
	{
		price = prices[base][type][serv + countt*3];
	}
	else if (base == "cotton")
	{
		price = prices[base][type][serv];
	}
	return price;
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

	var formdata = obj.innerHTML;

	var po = document.createElement("div");
	po.className = "right";
	po.innerHTML = '<img class="del" src="img/xx.png" onclick="rmfromCart(\''+base+'\',\''+last_type[base]+'\','+last_count[base][last_type[base]]+','+service+',this);">';
	obj.appendChild(po);

	/*po = document.createElement("p");
	po.className = "right";
	po.innerHTML = price(base, last_type[base], last_count[base][last_type[base]], service) + " 元";
	obj.appendChild(po);*/

	insertFormItem(formdata, name, price(base, last_type[base], last_count[base][last_type[base]], service));

	document.getElementById("cart").appendChild(obj);

	var pri = document.getElementById("price");
	var tmp = parseInt(pri.innerHTML);
	tmp += price(base, last_type[base], last_count[base][last_type[base]], service);
	pri.innerHTML = tmp;
	storage.setItem("data", document.getElementById("cart").innerHTML);
	storage.setItem("price", tmp);
	storage.setItem("status", "1");
}

function rmfromCart(base, type, countt, service, obj)
{
	var name = base+service+type+countt;
	obj.parentNode.parentNode.parentNode.removeChild(obj.parentNode.parentNode);

	var pri = document.getElementById("price");
	var tmp = parseInt(pri.innerHTML);
	tmp -= price(base, type, countt, service);
	pri.innerHTML = tmp;

	removeFormItem(name);
	storage.setItem("data", document.getElementById("cart").innerHTML);
	storage.setItem("price", tmp);
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
	if (storage.getItem("form") != null && storage.getItem("form") != "")
		document.getElementById("form").innerHTML = storage.getItem("form");
}

var count = 0;

function insertFormItem(data, id, price)
{
	var obj = document.createElement("input");
	obj.setAttribute("name", count+"data");
	obj.setAttribute("id", id+"data");
	obj.setAttribute("value", data);
	obj.setAttribute("type", "hidden");
	document.getElementById("form").appendChild(obj);
	
	/*obj = document.createElement("input");
	obj.setAttribute("name", count+"price");
	obj.setAttribute("id", id+"price");
	obj.setAttribute("value", price);
	obj.setAttribute("type", "hidden");
	document.getElementById("form").appendChild(obj);*/
	count++;
	storage.setItem("form", document.getElementById("form").innerHTML);
}

function removeFormItem(id)
{
	document.getElementById("form").removeChild(document.getElementById(id+"data"));
	/*document.getElementById("form").removeChild(document.getElementById(id+"price"));*/
	storage.setItem("form", document.getElementById("form").innerHTML);
}


function sub()
{
	if (storage.getItem("status") == null)
	{
		alert("您没有预订任何服务！");
		return false;
	}

	var result = confirm("确认预订并清空购物车？");
	if (result == false)
		return false;

	var res = document.getElementById("result");
	res.innerHTML = "邮件发送中，请稍后……";
	res.className = "show";

	var sub = document.getElementById("submit");
	sub.disabled = "disabled";
	sub.className = "disablesub";

	var status = 0;
	setTimeout(function()
	{
		if (status == 0)
		{
			status = 2;
			res.innerHTML = "订购失败！<br />请重新点击发送。";
			sub.disabled = "";
			sub.className = "submit";
		}
	}, 60000);
	$("#formdata").ajaxSubmit(function(message) { 
		if (message == "OK")
		{
			status = 1;
			res.innerHTML = "订购成功！";
			clear();
			setTimeout(function(){
				document.getElementById("shop").className = "cart";
				res.className = "";
				/*res.innerHTML = "邮件发送中，请稍后……";*/
			}, 2000);
		}
		else
		{
			status = 2;
			res.innerHTML = "订购失败！<br />"+message;
		}
		sub.disabled = "";
		sub.className = "submit";
	});
	return false;
}

function clear()
{
	document.getElementById("cart").innerHTML = "";
	document.getElementById("form").innerHTML = "";
	document.getElementById("price").innerHTML = 0;
	storage.removeItem("data");
	storage.removeItem("form");
	storage.removeItem("status");
	storage.removeItem("price");
}















