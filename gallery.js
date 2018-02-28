window.onload = function()
{
	var close = document.getElementById("close");
	var left = document.getElementById("left");
	var right = document.getElementById("right");
	var thumbnails = document.getElementsByClassName("thumbnail");
	var slideThumbnails = document.getElementsByClassName("thumbnail-slide");
	for(var i = 0; i < thumbnails.length; i++) (function(i)
	{
		thumbnails[i].onclick = function()
		{
			openLightbox(i);
		}
	})(i);
	for(var j = 0; j < slideThumbnails.length; j++) (function(j)
	{
		slideThumbnails[j].onclick = function()
		{
			stopSlideshow();
			showSlide(j);
		}
	})(j);
	close.onclick = closeLightbox;
	left.onclick = function()
	{
		stopSlideshow();
		slideLeft();
	}
	right.onclick = function()
	{
		stopSlideshow();
		slideRight();
	}
	window.addEventListener("keydown", keyed, false);
}

var currentSlide = 0;
var slideshowAuto;

function closeLightbox()
{
	var lightbox = document.getElementById("lightbox");
	stopSlideshow();
	lightbox.style.opacity = 0;
	lightbox.style.zIndex = "-100";
	console.log("closed lightbox");
	lightbox.style.visibility = "hidden";
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
		stopSlideshow();
		slideLeft();
	}
	else if(keyCode == 39)
	{
		stopSlideshow();
		slideRight();
	}
}

function moveThumbnails(num)
{
	var table = document.getElementById("slideshow-table");
	var offset;
	offset = -num * 190;
	table.style.left = offset + "px";
}

function openLightbox(imgNum)
{
	var container = document.getElementById("container");
	var lightbox = document.getElementById("lightbox");
	var play = document.getElementById("play");
	showSlide(imgNum);
	lightbox.style.visibility = "visible";
	lightbox.style.opacity = 1;
	lightbox.style.zIndex = "100";
	console.log("opened lightbox");
	play.onclick = playSlideshow;
}

function playSlideshow()
{
	slideshowAuto = setInterval(slideRight, 10000);
}

function showSlide(num)
{
	console.log("attempting to show " + num);
	var newSlideID = "slide" + num;
	var oldSlideID = "slide" + currentSlide;
	var newSlide = document.getElementById(newSlideID);
	var oldSlide = document.getElementById(oldSlideID);
	moveThumbnails(num);
	currentSlide = num;
	oldSlide.style.opacity = 0;
	newSlide.style.opacity = 1;
}

function slideLeft()
{
	showSlide((currentSlide + 24)%25);
}

function slideRight()
{
	showSlide((currentSlide + 1)%25);
}

function stopSlideshow()
{
	clearInterval(slideshowAuto);
}

