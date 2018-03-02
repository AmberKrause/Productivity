window.onload = function()
{
	var selects = document.getElementsByTagName("SELECT");
	var table = document.getElementById("to-do-list");
	var calCells = document.getElementsByClassName("date");
	var catButton = document.getElementById("submit-cat");
	var datePicker = document.getElementById("date-field");
	var headers = document.getElementById("head-row").getElementsByTagName("TH");
	var nextMonth = document.getElementById("next-month");
	var plus = document.getElementById("add-button");
	var prevMonth = document.getElementById("prev-month");
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
	datePicker.onclick = showCalendar;
	nextMonth.onclick = function()
	{
		if(calendarInfo.month == 11)
		{
			updateCalendar(calendarInfo.year + 1, 0);
		}
		else
		{
			updateCalendar(calendarInfo.year, calendarInfo.month + 1);
		}
	}
	prevMonth.onclick = function()
	{
		if(calendarInfo.month == 0)
		{
			updateCalendar(calendarInfo.year - 1, 11);
		}
		else
		{
			updateCalendar(calendarInfo.year, calendarInfo.month - 1);
		}
	}
	for(i = 0; i < calCells.length; i++)
	{
		calCells[i].addEventListener("click", selectDate, false);
	}
}

var calendarInfo = { year: "2018", month: "0"}

var catColors = [
	{ category: "Homework", color: "#7fcdf9" },
	{ category: "Work", color: "#c07ff9" },
	{ category: "Personal", color: "#a1f97f" },
	{ category: "Social", color: "#f97f7f" },
];

function addCat()
{
	var catInput = document.getElementById("cat-field");
	var colorInput = document.getElementById("color-field");
	var colorObj;
	var newCat = catInput.value;
	var newColor = colorInput.value;
	if(newCat.length < 2)
	{
		window.alert("Category must be at least two characters.");
	}
	else
	{
		newCat = newCat.toLowerCase();
		newCat = newCat.substring(0, 1).toUpperCase() + newCat.substring(1);
		colorObj = { category: newCat, color: newColor };
		catColors.push(colorObj);
		catInput.value = null;
		updateSelects(newCat);
	}
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
		var deleteButton;
		
		row.classList.add("task-row");
		
		cat.innerHTML = getCatHTML();
		cat.childNodes[0].addEventListener("change", updateCatColor, false);
		cat.classList.add("data-cell");
		cat.classList.add("center-content");
		
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
		deleteButton = deleteCell.childNodes[0];
		deleteButton.addEventListener("click", deleteTask, false);
		closeForm();
	}
}

function closeCalendar()
{
	var calendar = document.getElementById("calendar");
	calendar.style.display = "none";
}
	
function closeForm()
{
	var inputForm = document.getElementById("input-form");
	inputForm.style.display = "none";
}

function deleteTask(event)
{
	var confirm = window.prompt("Enter 'Yes' to confirm task removal", "Yes");
	var row = event.target.parentNode.parentNode;
	if(confirm == "Yes")
	{
		row.parentNode.removeChild(row);
	}
}

function getCatHTML()
{
	return "<select>" + document.getElementById("select-template").innerHTML + "</select>";
}

function getColor(category)
{
	for(var i = 0; i < catColors.length; i++)
	{
		if(catColors[i].category == category)
		{
			return catColors[i].color;
		}
	}
}

function openForm()
{
	var inputForm = document.getElementById("input-form");
	inputForm.style.display = "block";
}

function selectDate(event)
{
	if(event.target.innerHTML.length > 0)
	{
		var datePicker = document.getElementById("date-field");
		var day = "0" + event.target.innerHTML;
		var month = "0" + (calendarInfo.month + 1);
		month = month.substring(month.length - 2);
		day = day.substring(day.length - 2);
		datePicker.value = (calendarInfo.year + "-" + month + "-" + day);
		closeCalendar();
	}
}

function showCalendar()
{
	var calendar = document.getElementById("calendar");
	var now = new Date();
	calendar.style.display = "block";
	updateCalendar(now.getFullYear(), now.getMonth());
}

function updateCalendar(year, month)
{
	var cells = document.getElementsByClassName("date");
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var monthElem = document.getElementById("month");
	var startOfMonth = new Date();
	startOfMonth.setYear(year);
	startOfMonth.setMonth(month);
	startOfMonth.setDate("1");
	var currentDate = startOfMonth;
	var currentRow = 0;
	var currentCol = startOfMonth.getDay();
	var currentCell = document.getElementById("cell_" + currentRow + "." + currentCol);
	calendarInfo.year = year;
	calendarInfo.month = month;
	monthElem.innerHTML = months[month];
	//reset dates
	for(var i = 0; i < cells.length; i++)
	{
		cells[i].innerHTML = "";
	}
	//populate dates
	for(i = 1; currentDate.getMonth() == month; i++)
	{
		currentCell.innerHTML = i;
		if(currentCol == 6)
		{
			currentRow++;
			currentCol = 0;
		}
		else
		{
			currentCol++;
		}
		currentCell = document.getElementById("cell_" + currentRow + "." + currentCol);
		currentDate.setDate(currentDate.getDate() + 1);
	}
}

function sortTable(column)
{
	//column is column number
	console.log(column);
	var swapping = true;//continue swapping
	var table = document.getElementById("to-do-list");
	var rows = table.getElementsByClassName("task-row");
	var dataX;
	var dataY;
	while(swapping)
	{
		//use bubble sort until no swaps
		swapping = false;
		for(i = 0; i < rows.length - 1; i++)
		{
			console.log("checking row " + i);
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
			else if(column == 4)
			{
				//special case for complete
				if(dataX.childNodes[0].checked > dataY.childNodes[0].checked)
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

function updateCatColor(event)
{
	var row = event.target.parentNode.parentNode;
	var cells = row.getElementsByClassName("data-cell");
	var category = event.target.value;
	var color = getColor(category);
	for(var i = 0; i < cells.length; i++)
	{
		cells[i].style.backgroundColor = color;
	}
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
