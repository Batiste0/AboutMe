/*setTimeout(() => {
location.reload()
},3000)*/
const computerPageMade = false;

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



window.onload = () => {
    CheckRedirection();
}