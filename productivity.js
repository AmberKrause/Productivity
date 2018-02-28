window.onload = function()
{
	var catButton = document.getElementById("new-cat");
	var headers = document.getElementById("head-row").getElementsByTagName("TH");
	var plus = document.getElementById("add-button");
	var submitTask = document.getElementById("submit-task");
	plus.onclick = openForm;
	submitTask.onclick = addTask;
	for(var i = 0; i < headers.length; i++) (function(i)
	{
		if(i == 0 || i == 2 || i == 3 || i == 4)
		{
			headers[i].onclick = function()
			{
				sortTable(i);
			}
		}
	})(i);
	catButton.onclick = addCat;
}

function addCat()
{
	var cat = window.prompt("Enter a new category:");
	while(cat.length < 2 && cat != null)
	{
		cat = window.prompt("Category must be at least two characters.\nEnter a new category:");
	}
	cat = cat.toLowerCase();
	cat = cat.substring(0, 1).toUpperCase() + cat.substring(1);
	updateSelects(cat);
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
		var dateAdded = row.insertCell(2);
		var deadline = row.insertCell(3);
		var complete = row.insertCell(4);
		var deleteCell = row.insertCell(5);
		var now = new Date();
		var month;
		var day;
		
		row.classList.add("data-row");
		
		cat.innerHTML = getCatHTML();
		cat.classList.add("data-cell");
		
		task.innerHTML = taskField.value;
		taskField.value = "";
		task.classList.add("data-cell");
		
		month = "0" + (now.getMonth() + 1);
		month = month.substring(month.length - 2);
		day = "0" + now.getDate();
		day = day.substring(day.length - 2);
		dateAdded.innerHTML = now.getFullYear() + "-" + month + "-" + day;
		dateAdded.classList.add("data-cell");
		dateAdded.classList.add("center-content");
		
		deadline.innerHTML = dateValue;
		dateField.value = null;
		deadline.classList.add("data-cell");
		deadline.classList.add("center-content");
		
		complete.innerHTML = "<input type='checkbox'>";
		complete.classList.add("data-cell");
		complete.classList.add("center-content");
		
		deleteCell.innerHTML = "<button type='button'>Delete</button>";
		deleteCell.classList.add("data-cell");
		deleteCell.classList.add("center-content");
		
		closeForm();
	}
}
	
function closeForm()
{
	var inputForm = document.getElementById("input-form");
	inputForm.style.display = "none";
}

function getCatHTML()
{
	return "<select>" + document.getElementById("select-template").innerHTML + "</select>";
}

function openForm()
{
	var inputForm = document.getElementById("input-form");
	inputForm.style.display = "block";
}

function sortTable(column)
{
	//column is column number
	console.log(column);
	var swapping = true;//continue swapping
	var table = document.getElementById("to-do-list");
	var rows = table.getElementsByTagName("TR");
	var dataX;
	var dataY;
	while(swapping)
	{
		//use bubble sort until no swaps
		swapping = false;
		for(var i = 1; i < (rows.length - 2); i++)
		{
			dataX = rows[i].getElementsByTagName("TD")[column];
			dataY = rows[i + 1].getElementsByTagName("TD")[column];
			if(column == 0)
			{
				//special case for category
				if(dataX.childNodes[0].value > dataY.childNodes[0].value)
				{
					rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
					swapping = true;
					break;
				} //if
			}
			else
			{
				if(dataX.innerHTML.toLowerCase() > dataY.innerHTML.toLowerCase())
				{
					rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
					swapping = true;
					break;
				} //if
			}
		} //for
	} //while
}

function updateSelects(newCat)
{
	var selects = document.getElementsByTagName("SELECT");
	var template = document.getElementById("select-template");
	for(var i = 0; i < selects.length; i++)
	{
		selects[i].options[selects[i].options.length] = new Option(newCat, newCat);
	}
	template.options[template.options.length] = new Option(newCat, newCat);
}