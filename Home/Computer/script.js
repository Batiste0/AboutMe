/*setTimeout(() => {
location.reload()
},3000)*/
const ratio = [0.372,0.2]// en pixel ratio (this / largeur) ,en pixel ratio (this / hauteur)
var menupopuplargeurpx = Math.floor(ratio[0] * window.innerWidth); // 
var menupopuphauteurpx = Math.floor(ratio[1] * window.innerHeight);
const basehauteur = menupopuphauteurpx;
var borderradiussize = Math.floor(menupopuphauteurpx / 2);

const color_shadow_ratio = 0.5;
var menupopupsparentel = null;
var menupopups = []

var menuposstart = 40;

function SetupPageGetter(){
    menupopupsparentel = document.getElementById("menuscontenaire");
}


function MenuClick(id){
    switch(id){
        case 1:{
            window.location.pathname = "/print_conception"
        break;
        }
        case 2:{
            window.location.pathname  = "/Gamemodding"
        break;
        }
        case 3:{
            window.location.pathname = "/electronique"
        break;
        }
        case 4:{
            window.location.pathname  = "/projects"
        break;
        }
        default:{
            console.log("MENUCLickManager: eror,unknow id",id)
        }
    }

}
function GenerateMenuPopup(color,transparence,position,id){
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


window.onresize = () => {
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

window.onload = () => {
    SetupPageGetter();
    GenerateMenuPopup([153,153,255],80,40,1);
    GenerateMenuPopup([153,153,255],80,menupopuphauteurpx + 80,2);
    GenerateMenuPopup([153,153,255],80,menupopuphauteurpx*2 + 120,3);
    GenerateMenuPopup([153,153,255],80,menupopuphauteurpx*3 + 160,4);
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