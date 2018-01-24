//sketch.js

//SELECT MAIN CONTAINER TO BUILD GRID
const mainContainer = document.querySelector('#grid-container');
mainContainer.style.borderStyle = 'solid';
mainContainer.style.height = '500px';
mainContainer.style.width = '500px'
mainContainer.style.borderWidth='5px';

// SET RANDOM COLOR AND DARKEN TO FALSE
let rainbowColor = false;
let darkenColor = false;
//SET DEFAULT COLOR
let Re = 255;
let Gr = 0;
let Bl = 0;

// GET THE NUMBER OF SIDES FROM CSS FOR LOOP TO CREATE GRID
let htmlStyles = window.getComputedStyle(document.querySelector("html"));
let sideNumbers = parseInt(htmlStyles.getPropertyValue("--rowCol"));
// SET INITIAL GRID
setGrid(sideNumbers);

// SET GRID FUNCTION
function setGrid(sideNumbers){
  // LOOP FOR CREATING GRIDs
  for (var i = 0; i < (sideNumbers*sideNumbers); i++) {
    var newDiv = document.createElement('div');
    newDiv.id = 'square'+i;
    newDiv.className = 'notHovered';
    mainContainer.appendChild(newDiv);
  }
}
// GET RID OF GRID
function deleteGrid(){
  var myNode = document.getElementById('grid-container');
  while(myNode.firstChild){
    myNode.removeChild(myNode.firstChild);
  }
  // RESET COLOR TO DEFAULT
  rainbowColor = false;
  darkenColor = false;
}

//CHANGE COLOR OF HOVERED OVER "PIXEL"/SQUARE
document.getElementById('grid-container').onmouseover = function(e){
  // CHANGE COLOR OF SQUARE TO RED
  if(e.target.id != 'grid-container' && e.target.className != 'darkenClass'
  && !rainbowColor){
    e.target.style.backgroundColor = 'rgb(255,0,0)';
    e.target.className = 'darkenClass';
    e.target.id = 'rgb(255,0,0)';
  // DARKEN COLOR OF SQUARE 10%
  } else if(e.target.id != 'grid-container' && e.target.className == 'darkenClass'){
    if(darkenColor){
      // USE TARGET ID TO GET COLOR AND CALCULATE 10%
      calcTenth = e.target.id;
      // USE TARGET ID OF DIV TO GET ORIGINAL COLOR FOR FADING
      let tenthRe = calcTenth.slice(calcTenth.indexOf('(') + 1, calcTenth.indexOf(','));
      let tenthGr = calcTenth.slice(calcTenth.indexOf(',') + 1, calcTenth.lastIndexOf(','));
      let tenthBl = calcTenth.slice(calcTenth.lastIndexOf(',') + 1, calcTenth.indexOf(')'));
      // GET CURRENT COLOR OF SQUARE
      preColor = e.target.style.backgroundColor;
      console.log(preColor, 'here1');
      // GET INDIVIDUAL RGB OF NEW COLOR OF SQUARE
      let newRe = preColor.slice(preColor.indexOf('(') + 1, preColor.indexOf(','));
      let newGr = preColor.slice(preColor.indexOf(',') + 1, preColor.lastIndexOf(','));
      let newBl = preColor.slice(preColor.lastIndexOf(',') + 1, preColor.indexOf(')'));
      console.log(newRe, newGr, newBl, 'here5');
      console.log(newGr);
      console.log('here6');
      // DARKEN THE INDIVIDUAL RGBS
      Re = darker(newRe, tenthRe);
      Gr = darker(newGr, tenthGr);
      Bl = darker(newBl, tenthBl);
      console.log('here2',Re,Gr,Bl);
      // MAKE NEW RGB FROM DARKENED INDIVIDUAL R G B
      newColor = 'rgb(' + Re + ',' + Gr + ',' + Bl +')';
      // SET COLOR OF SQUARE TO NEW DARKENED R G B
      e.target.style.backgroundColor = newColor;
      // MAKE SURE CLASS NAME IS DARKEN SO WON'T SET BACK TO OG COLOR
      e.target.className = 'darkenClass';
    }
  // IF RANDOM COLOR BUTTON CLICKED CHANGE TO RANDOM COLOR
  } else if (e.target.id != 'grid-container' && rainbowColor){
    console.log('NNNNNNN');
      e.target.className = 'notDarkenClass';
      if(e.target.className !='darkenClass'){
        let o = Math.round;
        let r = Math.random;
        let s=255;
        Re = o(r()*s);
        Gr = o(r()*s);
        Bl = o(r()*s);
        let newColor = 'rgb(' + Re + ',' + Gr + ',' + Bl +')';
        e.target.className = 'darkenClass';
        e.target.id = newColor;
        e.target.style.backgroundColor = newColor;
      }
        // ** ISSUES HERE *** NOT SURE IF THIS IS NEEDED, ALSO MAY ONLY NEEDED
        // DARKEN FUNCTION ONCE, IDK TOO LATE AND TIRED ****
        if(darkenColor && e.target.className == 'darkenClass'){
          //*****HAVE TO GET OLD COLOR OTHERWISE USED PREVIOUS RGB******************
          preColor = e.target.style.backgroundColor;
          console.log(preColor, 'here1');
          let newRe = preColor.slice(preColor.indexOf('(') + 1, preColor.indexOf(','));
          let newGr = preColor.slice(preColor.indexOf(',') + 1, preColor.lastIndexOf(','));
          let newBl = preColor.slice(preColor.lastIndexOf(',') + 1, preColor.indexOf(')'));
          console.log(newRe, newGr, newBl);
          newRe = darker(newRe);
          newGr = darker(newGr);
          newBl = darker(newBl);
          console.log('here2',Re,Gr,Bl);
          newColor = 'rgb(' + Re + ',' + Gr + ',' + Bl +')';
          e.target.style.backgroundColor = newColor;
        }
      }

  }


//GETTING NUMBER OF SQUARES PER SIDE FROM BUTTONS
function getSides(){
  let sideNum = prompt("Enter number of sides!", "16")
  if(sideNum != null){
    document.documentElement.style.setProperty("--rowCol", sideNum);
    deleteGrid();//newColor = d
    setGrid(sideNum);
  }
}


// SET EVENT FOR CLICK ON RANDOM BUTTON
let rainbowBtn = document.querySelector('#randColor');
rainbowBtn.addEventListener("click", isRandom);
function isRandom(){
  if(!rainbowColor){
    rainbowColor = true;
  } else {
    rainbowColor = false;
  }
}

// SET EVENT FOR CLICK ON DARKEN BUTTON
let darkenBtn = document.querySelector('#darken');
darkenBtn.addEventListener("click", toDarken);
function toDarken(){
  if(!darkenColor){
    darkenColor = true;
  } else {
    darkenColor = false;
  }
}

function darker(oldColor, tenth){
  tenth = Math.round(tenth/10) + 1;
  console.log(oldColor, tenth, 'here3');
  if((oldColor - tenth) < 0){
    oldColor = 0;
  } else {
    oldColor = oldColor - tenth;
  }
  return oldColor;
}
  // GET ORIGINAL COLOR
    // DIVIDE EACH COLOR BY 10
      // SUBRTRACT 10 FROM EACH RGB VALUE
        // RETURN NEW RGB COLOR
