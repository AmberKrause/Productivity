window.onload = function()
{
	var add = document.getElementById("add-button");
	add.onclick = open;
}

function open()
{
	var par = this.parentElement;
	par.innerHTML = par.innerHTML;
}