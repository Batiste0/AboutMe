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

window.onload = function() {
    CheckRedirection();
    var video = document.getElementById('fondvideo');
    var background = document.getElementById('background');
    video.oncanplay = function() {
      setTimeout(() => background.style.display = 'none',3500) 
    };
  };
  
