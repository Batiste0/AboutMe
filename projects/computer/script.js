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
var videodir = "../../Videos/projects/";
var imgdir = "../../Images/projects/";

async function DisplayVideo(id){
return new Promise(r => {
if(actualdisplayer === 0){
actualdisplayer = 1;
var oldel = document.getElementById("displayer");
var newVideoEL = document.createElement("video");
newVideoEL.muted = true;
newVideoEL.autoplay = true;
newVideoEL.id = "displayer";
newVideoEL.alt = "illustration";
newVideoEL.src = videodir + String(id).replace(",",".") + ".mp4";
newVideoEL.removeAttribute("controls");
oldel.parentNode.replaceChild(newVideoEL, oldel);
newVideoEL.addEventListener("ended", function() {
    return r();
});
}else{
var oldel = document.getElementById("displayer");
oldel.muted = true;
oldel.autoplay = true;
oldel.id = "displayer";
oldel.alt = "illustration";
oldel.src = videodir + String(id).replace(",",".") + ".mp4";
/*oldel.addEventListener("play", function() {
    return r();
});*/
oldel.addEventListener("ended", function() {
    return r();
});
}
})
}


async function DisplayImage(id){
return new Promise(r => {
    if(actualdisplayer === 1){
    actualdisplayer = 0;
    var oldel = document.getElementById("displayer");
    var newImgEL = document.createElement("img");
    newImgEL.id = "displayer";
    newImgEL.alt = "illustration";
    newImgEL.src = imgdir + String(id).replace(",",".") + ".jpg";
    newImgEL.removeAttribute("controls");
    oldel.parentNode.replaceChild(newImgEL, oldel);
    newImgEL.addEventListener("load", function() {
        setTimeout(() => {
            return r()
        },5000)
    });
    }else{
    var oldel = document.getElementById("displayer");
    oldel.id = "displayer";
    oldel.alt = "illustration";
    oldel.src = imgdir + String(id).replace(",",".") + ".jpg";
    oldel.addEventListener("load", function() {
        setTimeout(() => {
            return r()
        },5000)
    });
    }
    })
}

var displayorder = [{t:1,id:1},{t:0,id:0},{t:0,id:6},{t:1,id:2},{t:1,id:4},{t:0,id:9},{t:1,id:3},{t:0,id:7},{t:0,id:8},{t:0,id:1},{t:0,id:3},{t:0,id:2}];
var actualdisplay = 0;

var autodisplay = true;

async function Display(displayelid){
    actualdisplay = displayelid;
    if(displayorder[displayelid].t === 0){
        await DisplayImage(displayorder[displayelid].id);
    }else if( displayorder[displayelid].t === 1){
        await DisplayVideo(displayorder[displayelid].id);
    }
}

function AutoDisplayRunner(id){
    if(!autodisplay) return;
    if(id > (displayorder - 1)) return AutoDisplayRunner(0);
    Display(id).then(() => {
        if(autodisplay) AutoDisplayRunner(id + 1);
    })
}

function NextEl(){
    autodisplay = false;
    actualdisplay += 1;
    if(actualdisplay > (displayorder.length - 1)) actualdisplay = 0;
    Display(actualdisplay);
}

function PreviousEl(){
    autodisplay = false;
    actualdisplay -= 1;
    if(actualdisplay < 0) actualdisplay = (displayorder.length - 1);
    Display(actualdisplay);
}

window.onload = function() {
    CheckRedirection();
    var video = document.getElementById('fondvideo');
    var background = document.getElementById('background');
    video.oncanplay = function() {
      setTimeout(() => background.style.display = 'none',3500) 
    };
    AutoDisplayRunner(0);
};
  
