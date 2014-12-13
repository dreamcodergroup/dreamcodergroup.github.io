var move = function () {
    var interval = null;
    return function (id, delta, speed) {
        if(interval)
        {
            clearTimeout(interval);
            interval = null;
        }
        if (id)
        {
            var dest = document.getElementById(id).offsetTop - delta;
            var cur = document.documentElement.scrollTop || document.body.scrollTop;
            if (document.body.scrollHeight - cur <= document.body.clientHeight)
                return;
            speed = speed || 200;
            if (speed < 10)
                speed = 10;
            dest = (dest - cur) / speed;
            if (dest > 0)
                dest = Math.ceil(dest);
            else
                dest = Math.floor(dest);
            if (dest)
            {
                scrollBy(0, dest);
                speed -= 15;
                interval = setTimeout("move('" + id + "'," + delta + "," + speed + ")", 10);
            }
        }
    };
}();

onscroll = function () {
    var baseline = document.getElementById("about").offsetTop;
    var cur = document.documentElement.scrollTop || document.body.scrollTop;
    var nav = document.getElementById("nav");
    if (cur >= baseline)
        nav.className = "fixed";
    else
        nav.className = null;
    var skill = document.getElementById("skill");
    if (cur >= skill.offsetTop)
    {
        for (var i = 0; i < 5; i++)
        {
            document.getElementById("skill" + i).className += (" stroke" + i);
        };
    };
};




















