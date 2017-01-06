//VARIABLES
var colorSection = document.querySelector(".color-section");
var randRed, randGreen, randBlue;
var totalRed, totalGreen, totalBlue;
var points, total, rated;
var totalRed = totalGreen = totalBlue = 0;
var points = total = rated = 0;
var canContinue = false;
var z;
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
const circleLine = document.querySelector(".circle-line");
const menuTab = document.querySelector(".menu-tab");
const sidebar = document.querySelector(".sidebar");
const hextext = document.getElementById('color-hex')
const button = document.querySelector('.done-button');

//FUNCTIONS
function randomColor(){
  randRed = Math.floor(Math.random() * 256);
  randGreen = Math.floor(Math.random() * 256);
  randBlue = Math.floor(Math.random() * 256);
  const hexString = "#" + ("0" +randRed.toString(16)).slice(-2) + ("0"+randGreen.toString(16)).slice(-2) + ("0" +randBlue.toString(16)).slice(-2);
  colorSection.style.backgroundColor = hexString;
  document.getElementById('color-hex').textContent = hexString;
}

function refresh(){
  randBlue = randGreen = randRed = 0;
  button.style.display= "inherit";
  hextext.style.display= "inherit";
  total = -1;
  rated=0;
  tally();
  colorSection.style.transition = "";
  canContinue = true;
  const finalColor = document.querySelector(".final-fav-color");
  finalColor.textContent ="\u00a0";
  finalColor.classList.remove('final-fav-color-open');
  randomColor();
}

function findFinalColor(){
  if(rated!=0){
    const finalRed = Math.floor(totalRed / points);
    const finalGreen = Math.floor(totalGreen /points);
    const finalBlue = Math.floor(totalBlue / points);
    const hexString = "#" + ("0" +finalRed.toString(16)).slice(-2) + ("0"+finalGreen.toString(16)).slice(-2) + ("0" +finalBlue.toString(16)).slice(-2);
    colorSection.style.transition = "background-color 2s";
    colorSection.style.backgroundColor = hexString;
    button.style.display= "none";
    hextext.style.display= "none";
    finalColor(hexString);
  }
}

function randomizeFinalColor(){
  const x = "01234567890abcdef";
  const y = document.querySelector(".final-fav-color");
  z = setInterval(function(){
    let m = Math.floor(Math.random()*16);
    let n = Math.floor(Math.random()*16);
    let o = Math.floor(Math.random()*16);
    let p = Math.floor(Math.random()*16);
    let q = Math.floor(Math.random()*16);
    let r = Math.floor(Math.random()*16);
    y.textContent =  "#" + x.substring(m, m+1) + x.substring(n, n+1) +x.substring(o, o+1) +x.substring(p, p+1) +x.substring(q, q+1) +x.substring(r, r+1);
  }, 60);
}

function finalColor(text){
  canContinue = false;
  const finalColor = document.querySelector(".final-fav-color");
  finalColor.classList.add('final-fav-color-open');
  window.setTimeout(function(){
    randomizeFinalColor();
  }, 500);
  window.setTimeout(function(){
    clearInterval(z);
    finalColor.textContent =text;
  }, 1500);
}

function tally(){
  total++;
  while (circleLine.hasChildNodes()) {
    circleLine.removeChild(circleLine.lastChild);
  }
  const c25 = Math.floor(total/25);
  const c5 = Math.floor((total - c25*25)/5);
  const c1 =  total - c25*25 - c5*5;

  for(let x = 0; x < c25; x++){
    const c25element = document.createElement("DIV");
    c25element.classList.add('circle-25');
    circleLine.appendChild(c25element);
  }
  for(let x = 0; x < c5; x++){
    const c5element = document.createElement("DIV");
    c5element.classList.add('circle-5');
    circleLine.appendChild(c5element);
  }
  for(let x = 0; x < c1; x++){
    const c1element = document.createElement("DIV");
    c1element.classList.add('circle-1');
    circleLine.appendChild(c1element);
  }
}

//CODE
randomColor();
window.addEventListener('keydown', function(e){
    if(canContinue){
      let keyCode = parseInt(e.keyCode) - 49;
      if(keyCode == 0){
        tally();
        randomColor();
      }
      else if(keyCode >0 && keyCode < 5){
        tally();
        rated++;
        keyCode *= 10;
        totalRed += (randRed * keyCode);
        totalGreen += randGreen * keyCode;
        totalBlue += randBlue * keyCode;
        points += keyCode;
        randomColor();
      }
    }
});

menuTab.addEventListener("mouseenter", function(){
   const menuItems = document.querySelector(".menu-items");
   menuItems.classList.add('display-menu-items');
   const menuIcon = document.querySelector(".fa-bars");
   menuIcon.style.transform = "rotate(360deg)";
});
menuTab.addEventListener("mouseleave", function(){
    const menuIcon = document.querySelector(".fa-bars");
    menuIcon.style.transform = "rotate(0)";
});

menuTab.addEventListener("click", function(){
  const menuItems = document.querySelector(".menu-items");
  const menuIcon = document.querySelector(".fa-bars");
  menuIcon.style.transform = "rotate(360deg)";
  menuItems.classList.remove('display-menu-items');
});


sidebar.addEventListener("mouseleave", function(){
   const menuItems = document.querySelector(".menu-items");
   menuItems.classList.remove('display-menu-items');
});


span.onclick = function() {
    canContinue = true;
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        canContinue = true;
        modal.style.display = "none";
    }
}
//
const refreshTab = document.querySelector(".refresh-tab");
const refreshIcon = document.querySelector(".fa-refresh");
refreshTab.addEventListener("mouseenter", function(){
  refreshIcon.classList.add('infinite-spin');
});
refreshTab.addEventListener("mouseleave", function(){
  refreshIcon.classList.remove('infinite-spin');
});

const questionTab = document.querySelector(".question-tab");
const questionIcon = document.querySelector(".fa-question");
questionTab.addEventListener("mouseenter", function(){
  questionIcon.classList.add('rescale');
});
questionTab.addEventListener("mouseleave", function(){
  questionIcon.classList.remove('rescale');
});

const userTab = document.querySelector(".me-tab");
userTab.addEventListener("click", function(){
  window.open("http://www.kristopherrollert.com", '_blank');
});

questionTab.addEventListener("click", function(){
  canContinue = false;
  modal.style.display = "inherit";
});

refreshTab.addEventListener("click", refresh);
