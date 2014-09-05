var inter = null;
var last_id = ["detail0_1", "detail1_1", "detail2_1", "detail3_1"];

function showDetail(base, index)
{
	if(inter)
	{
		clearTimeout(inter);
		interval = null;
	}
	var invokeFunction = "showDet(" + base +", " + index + ")";
	inter = window.setTimeout(invokeFunction, 200);
}

function showDet(base, index)
{
	var tmp = document.getElementById(last_id[base]);
	if (tmp)
	{
		tmp.className = "hid disappear";
	}
	var id = "detail" + base + "_" + index;
	document.getElementById(id).className = "hid show";
	last_id[base] = id;
}

function disappear(obj)
{
	obj.className = "hid";
}

var storage = window.localStorage;
/*var storage = window.sessionStorage;*/

function showCart(index, len)
{
	document.getElementById("tprice" + index).innerHTML = 0;
	var obj = document.getElementById("shop" + index);
	if (obj)
	{
		var count = 0;
		while(document.getElementById("shop" + count))
		{
			document.getElementById("shop" + count).className = "shop";
			count++;
		}
		obj.className = "shop show";
		restoreChoice(index, len);
	}
}

function restoreChoice(index, len)
{
	if (index < 0)
		return;
	for (var i = 0; i < len; ++i)
	{
		var tmp = "s" + index + "_" + i;
		var id = storage.getItem(tmp);
		if (id != "" && id != null)
		{
			id = tmp + "_" + id;
			document.getElementById(id).className = "choice focus";
		}
		price(index, i, -1);
	}
}

function choice(index, count, item)
{
	if (index < 0 || count <0 || item < 0)
		return;
	price(index, count, item);
	changeLook(index, count, item);
}

function changeLook(index, count, item)
{
	var tmp = "s" + index + "_" + count;
	var lastitem = storage.getItem(tmp);
	var id_now = tmp + "_" + item;
	if (lastitem != item.toString())
	{
		document.getElementById(id_now).className = "choice focus";
		storage.setItem(tmp, item);
		if (lastitem != "")
		{
			var id = tmp + "_" + lastitem;
			document.getElementById(id).className = "choice";
		}
	}
	else
	{
		document.getElementById(id_now).className = "choice";
		storage.setItem(tmp, "");
	}
}

//var prices = [[[1397, 1777], [697], [497, 697, 897]], [[3588], [1179], [1379]]];

function price(index, count, item)
{
	var tprice = parseInt(document.getElementById("tprice" + index).innerHTML);

	var lastitem = storage.getItem("s" + index + "_" + count);
	if (lastitem == "" || lastitem == null)
		lastitem = -2;
	else
		lastitem = parseInt(lastitem);
	if (lastitem == item)
	{
		lastitem = prices[index][count][lastitem];
		item = -3;
	}
	else
	{
		if (lastitem < 0)
			lastitem = 0;
		else
			lastitem = prices[index][count][lastitem];
	}
	var currentitem = lastitem;
	if (item > -1)
	{
		currentitem = prices[index][count][item];
		tprice = tprice - lastitem + currentitem;
	}
	else
	{
		if (item == -1)
			tprice += lastitem;
		else
			tprice -= lastitem;
	}
	document.getElementById("tprice" + index).innerHTML = tprice;
	if (currentitem > 0)
		document.getElementById("sprice" + index).innerHTML = currentitem;
}