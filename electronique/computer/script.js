/*setTimeout(() => {
location.reload()
},3000)*/
const computerPageMade = true;
function CheckRedirection(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|iPad|Android|Touch/i.test(navigator.userAgent)){
        if(computerPageMade){
        window.location.pathname = window.location.pathname.replace("computer","mobile");
        }
    }else{
        if(!computerPageMade){
        window.location.pathname = window.location.pathname.replace("mobile","computer");
        }
    }
}

function gohome(){
    if(computerPageMade){
        window.location.pathname = "home/computer/index.html";
    }else{
        window.location.pathname = "home/mobile/index.html"; 
    }
}

var actualdisplayer = 0; // 0 = img, 1 = video
var videodir = "../../Videos/electronique/";
var imgdir = "../../Images/electronique/";

async function DisplayVideo(id){
return new Promise(r => {
if(actualdisplayer === 0){
var oldel = document.getElementById("displayer");
var newVideoEL = document.createElement("video");
newVideoEL.muted = true;
newVideoEL.autoplay = true;
newVideoEL.id = "displayer";
newVideoEL.alt = "illustration";
newVideoEL.src = videodir + String(id) + ".mp4";
newVideoEL.removeAttribute("controls");
oldel.parentNode.replaceChild(newVideoEL, oldel);
actualdisplayer = 1;
newVideoEL.addEventListener("play", function() {
    return r();
});
}else{
var oldel = document.getElementById("displayer");
oldel.muted = true;
oldel.autoplay = true;
oldel.id = "displayer";
oldel.alt = "illustration";
oldel.src = videodir + String(id) + ".mp4";
oldel.addEventListener("play", function() {
    return r();
});
}
})
}


async function DisplayImage(id){
return new Promise(r => {
    if(actualdisplayer === 1){
    var oldel = document.getElementById("displayer");
    var newImgEL = document.createElement("img");
    newImgEL.id = "displayer";
    newImgEL.alt = "illustration";
    newImgEL.src = imgdir + String(id) + ".jpg";
    newImgEL.removeAttribute("controls");
    oldel.parentNode.replaceChild(newImgEL, oldel);
    newImgEL.addEventListener("load", function() {
        return r();
    });
    }else{
    var oldel = document.getElementById("displayer");
    oldel.id = "displayer";
    oldel.alt = "illustration";
    oldel.src = imgdir + String(id) + ".jpg";
    oldel.addEventListener("load", function() {
        return r();
    });
    }
    })
}

window.onload = function() {
    CheckRedirection();
    var video = document.getElementById('fondvideo');
    var background = document.getElementById('background');
    video.oncanplay = function() {
      setTimeout(() => background.style.display = 'none',3500) 
    };
    DisplayVideo(0).then(() => {
        setTimeout(() => {
            DisplayImage(0).then(() => {
                setTimeout(() => {
                    DisplayImage(1)
                },2000)
            })
        },2000)
    })
  };
  
