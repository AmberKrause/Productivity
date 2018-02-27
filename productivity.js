window.onload = function()
{
	var plus = document.getElementById("add-button");
	var submitTask = document.getElementById("submit-task");
	plus.onclick = openForm;
	submitTask.onclick = addTask;
}

function closeForm()
{
	var inputForm = document.getElementById("input-form");
	inputForm.style.display = "none";
}

function getCatHTML()
{
	return "<select><option value='homework'>Homework</option><option value='work'>Work</option><option value='personal'>Personal</option><option value='social'>Social</option></select>";
}

function openForm()
{
	var inputForm = document.getElementById("input-form");
	inputForm.style.display = "block";
}

function addTask()
{
	var dateField = document.getElementById("date-field");
	var dateValue = dateField.value;
	var table = document.getElementById("to-do-list");
	var taskField = document.getElementById("task-field");
	if(taskField.value == "" || dateField.value == "")
	{
		console.log("invalid input");
		window.alert("Please enter a valid task and date");
	}
	else
	{
		var row = table.insertRow(1);
		var cat = row.insertCell(0);
		var task = row.insertCell(1);
		var deadline = row.insertCell(2);
		var complete = row.insertCell(3);
		cat.innerHTML = getCatHTML();
		cat.classList.add("dark");
		task.innerHTML = taskField.value;
		taskField.value = "";
		task.classList.add("light");
		deadline.innerHTML = dateValue;
		dateField.value = null;
		deadline.classList.add("dark");
		deadline.classList.add("center-content");
		complete.innerHTML = "<input type='checkbox'>";
		complete.classList.add("light");
		complete.classList.add("center-content");
		closeForm();
	}
}