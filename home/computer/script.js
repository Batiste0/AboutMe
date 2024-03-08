/*setTimeout(() => {
location.reload()
},3000)*/
const computerPageMade = true;
const ratio = [0.372,0.2]// en pixel ratio (this / largeur) ,en pixel ratio (this / hauteur)
var menupopuplargeurpx = Math.floor(ratio[0] * window.innerWidth); // 
var menupopuphauteurpx = Math.floor(ratio[1] * window.innerHeight);
const basehauteur = menupopuphauteurpx;
var borderradiussize = Math.floor(menupopuphauteurpx / 2);

const color_shadow_ratio = 0.5;
var menupopupsparentel = null;
var menupopups = []

var menuposstart = 40;

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

function SetupPageGetter(){
    menupopupsparentel = document.getElementById("menuscontenaire");
}


function MenuClick(id){
    switch(id){
        case 1:{
            window.location.pathname = window.location.pathname.replace("home","printconception")
        break;
        }
        case 2:{
            window.location.pathname = window.location.pathname.replace("home","electronique")
        break;
        }
        case 3:{
            window.location.pathname = window.location.pathname.replace("home","gamemodding")
        break;
        }
        case 4:{
            window.location.pathname = window.location.pathname.replace("home","projects")
        break;
        }
        default:{
            console.log("MENUCLickManager: eror,unknow id",id)
        }
    }

}
function GenerateMenuPopup(imagesrc,color,transparence,position,id){
    /*
    if(!menupopupsparentel) return;
    if(typeof(color) !== Array[Number] || typeof(transparence) !== Number || typeof(position) !== Array[Number]) return;
    if(transparence > 100 || transparence < 0 || color.length === 0 || color.length > 3) return;
    if(color.length > 3 || color[0] > 255 || color[0] < 0 || color[1] > 255 || color[1] < 0 || color[2] > 255 || color[2] < 0) return;
    if(position > (window.innerHeight - menupopuphauteurpx) || position < 0) return;
*/
    const strcolor = "rgba(" +  String(color[0]) + "," + String(color[1]) + "," + String(color[2]) + "," + "1" + ")";
    var popupdiv = document.createElement("div");
    popupdiv.style.width = menupopuplargeurpx;
    popupdiv.style.height = menupopuphauteurpx;
    popupdiv.style.backgroundColor = strcolor;
    popupdiv.style.position = "fixed";
    popupdiv.style.right = 0;
    popupdiv.style.top = position;
    popupdiv.style.borderRadius = String(borderradiussize) + "px 0 0 " + String(borderradiussize) + "px";
    popupdiv.style.boxShadow = "-5px -5px 8px " + strcolor.replace("1)",(String(color_shadow_ratio) + ")"));
    popupdiv.style.opacity = String(transparence) + "%"
    popupdiv.style.cursor = "grab";
    popupdiv.style.transition = "width 0.5s ease";

    var img = document.createElement("img");
    img.src = imagesrc;
    img.style.width = "100%"; 
    img.style.height = "100%"; 
    img.style.objectFit = "cover"; 
    img.style.float = "left"; 
    img.style.borderTopLeftRadius = String(borderradiussize) + "px"; 
    img.style.borderBottomLeftRadius = String(borderradiussize) + "px"; 
    img.style.mixBlendMode = "multiply";
    

    popupdiv.appendChild(img);

    document.body.appendChild(popupdiv);
    
    
    popupdiv.addEventListener('mouseenter', () => {
        popupdiv.style.width = String(menupopuplargeurpx + 100) + "px"; 
        popupdiv.style.backgroundColor = popupdiv.style.backgroundColor.replace(String(color[2]),String(color[2]-100));
        popupdiv.style.boxShadow = "-5px -5px 8px " + popupdiv.style.backgroundColor.replace(String(color[2]),String(color[2]+100)).replace(String(color[1]),String(color[1]-100)).replace("1)",(String(color_shadow_ratio) + ")"));
    });
      
    popupdiv.addEventListener('mouseleave', () => {
        popupdiv.style.width = String(menupopuplargeurpx) + "px"; 
        popupdiv.style.backgroundColor = popupdiv.style.backgroundColor.replace(String(color[2]-100),String(color[2]));
        popupdiv.style.boxShadow = "-5px -5px 8px " + popupdiv.style.backgroundColor.replace(String(color[2]+100),String(color[2])).replace(String(color[1]-100),String(color[1])).replace("1)",(String(color_shadow_ratio) + ")"));
    });
    popupdiv.onclick = () => {
        MenuClick(id)
    }
    popupdiv.hover
    menupopups.push(popupdiv);
    menupopupsparentel.appendChild(popupdiv);

    return popupdiv;
}

function Resize(){
menupopuplargeurpx = Math.floor(ratio[0] * window.innerWidth);
menupopuphauteurpx = Math.floor(ratio[1] * window.innerHeight);
borderradiussize = Math.floor(menupopuphauteurpx / 2);
//console.log(window.innerWidth,menupopuplargeurpx,window.innerHeight,menupopuphauteurpx)
var menuidx = 0;
for(mnp of menupopups){
    mnp.style.width = menupopuplargeurpx;
    t = mnp.style.height
    mnp.style.height = menupopuphauteurpx;
    mnp.style.top = menupopuphauteurpx*menuidx + menuposstart*(menuidx+1)
    mnp.style.borderRadius = String(borderradiussize) + "px 0 0 " + String(borderradiussize) + "px";
    menuidx++;
}
}

window.onresize = () => {
Resize();
}

window.onload = () => {
    CheckRedirection();
    SetupPageGetter();
    GenerateMenuPopup("../../Images/panel/3dprint.jpg",[200,200,200],95,40,1);
    GenerateMenuPopup("../../Images/panel/electronique.jpg",[200,200,200],95,menupopuphauteurpx + 80,2);
    GenerateMenuPopup("../../Images/panel/gamemodding.png",[200,200,200],95,menupopuphauteurpx*2 + 120,3);
    GenerateMenuPopup("../../Images/panel/projects.png",[200,200,200],95,menupopuphauteurpx*3 + 160,4);
    for(mnp of menupopups){
        mnp.style.width = 0;
        mnp.style.height = 0;
    }
    setTimeout(() => {
    var menuidx = 0;
     for(mnp of menupopups){
        mnp.style.width = menupopuplargeurpx + 200;
        t = mnp.style.height
        mnp.style.height = menupopuphauteurpx;
        mnp.style.top = menupopuphauteurpx*menuidx + menuposstart*(menuidx+1)
        mnp.style.borderRadius = String(borderradiussize) + "px 0 0 " + String(borderradiussize) + "px";
        menuidx++;
     }
    },1000)
    setTimeout(() => {
        var menuidx = 0;
         for(mnp of menupopups){
            mnp.style.width = menupopuplargeurpx;
            t = mnp.style.height
            mnp.style.height = menupopuphauteurpx;
            mnp.style.top = menupopuphauteurpx*menuidx + menuposstart*(menuidx+1)
            mnp.style.borderRadius = String(borderradiussize) + "px 0 0 " + String(borderradiussize) + "px";
            menuidx++;
         }
    },1500)
    console.log("[JS] => page loaded")
}