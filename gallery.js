window.onload = function()
{
	var thumnails = document.getElementsByClassName("thumbnail");
	for(i = 0; i < thumnails.length; i++)
	{
		thumnails[i].onclick = function()
		{
			openLightbox(i);
		}
	}
}

function openLightbox(imgNum)
{
	var container = document.getElementById("container");
	var lightbox = document.getElementById("lightbox");
	lightbox.style.display = "block";
	lightbox.style.zIndex = "100";
	console.log("opened lightbox");
}

function closeLightbox()
{
	var lightbox = document.getElementById("lightbox");
	lightbox.style.display = "none";
	lightbox.style.zIndex = "-100";
	console.log("closed lightbox");
}