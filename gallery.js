window.onload = function()
{
	var close = document.getElementById("close");
	var thumnails = document.getElementsByClassName("thumbnail");
	for(i = 0; i < thumnails.length; i++)
	{
		thumnails[i].onclick = function()
		{
			openLightbox(i);
		}
	}
	close.onclick = closeLightbox;
}

function closeLightbox()
{
	var lightbox = document.getElementById("lightbox");
	lightbox.style.display = "none";
	lightbox.style.zIndex = "-100";
	console.log("closed lightbox");
}

function openLightbox(imgNum)
{
	var container = document.getElementById("container");
	var lightbox = document.getElementById("lightbox");
	lightbox.style.display = "block";
	lightbox.style.zIndex = "100";
	console.log("opened lightbox");
}

