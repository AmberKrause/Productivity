window.onload = function()
{
	var close = document.getElementById("close");
	var left = document.getElementById("left");
	var right = document.getElementById("right");
	var thumbnails = document.getElementsByClassName("thumbnail");
	for(i = 0; i < thumbnails.length; i++)
	{
		thumbnails[i].onclick = function()
		{
			openLightbox(5);
		}
	}
	close.onclick = closeLightbox;
	left.onclick = slideLeft;
	right.onclick = slideRight;
	window.addEventListener("keypress", keyed, false);
}

var currentSlide = 0;

function closeLightbox()
{
	var lightbox = document.getElementById("lightbox");
	lightbox.style.display = "none";
	lightbox.style.zIndex = "-100";
	console.log("closed lightbox");
}

function keyed(event)
{
	var keyCode = event.keyCode;
	if(keyCode == 27)
	{
		closeLightbox();
	}
	else if(keyCode == 37)
	{
		slideLeft();
	}
	else if(keyCode == 38)
	{
		slideRight();
	}
}

function openLightbox(imgNum)
{
	var container = document.getElementById("container");
	var lightbox = document.getElementById("lightbox");
	showSlide(imgNum);
	lightbox.style.display = "block";
	lightbox.style.zIndex = "100";
	console.log("opened lightbox");
}

function showSlide(num)
{
	var newSlideID = "slide" + num;
	var oldSlideID = "slide" + currentSlide;
	var newSlide = document.getElementById(newSlideID);
	var oldSlide = document.getElementById(oldSlideID);
	currentSlide = num;
	oldSlide.display = "none";
	newSlide.display = "block";
}

function slideLeft()
{
	showSlide(currentSlide - 1);
}

function slideRight()
{
	showSlide(currentSlide + 1);
}

