window.onload = function()
{
	var add = document.getElementById("add-button");
	//var nav = document.getElementById("nav");
	var submitTask = document.getElementById("submit-task");
	add.onclick = open;
	submitTask.onclick = newTask;
}

function open()
{
	var par = this.parentElement;
	par.innerHTML = par.innerHTML;
}

function newTask()
{
}