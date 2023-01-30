import "./styles.css";

import {
  Rectangle,
  Corner,
  CutParams,
  Tool,
  ENTRYTYPE,
  ENTRYLOCATION,
  TrichoidRectanglePocket,
} from "./TrichoidRectanglePocket.js";

import { TrichoidPocketController } from "./TrichoidPocketController.js";

let rect = new Rectangle(2, 3, 4, 5.125);
console.log(rect.centerX);

let cutParams = new CutParams(0, 0, 0, 0);
console.log(cutParams);

let finishParams = new CutParams(0, 0, 0, 0);

let tools = {
  finishTool: new Tool(0),
  roughingTool: new Tool(0),
};

let corners = [
  new Corner(0.125),
  new Corner(0.125),
  new Corner(0.125),
  new Corner(0.125),
];
console.log(corners);

let pocket = new TrichoidRectanglePocket(
  rect,
  cutParams,
  tools,
  corners,
  0.01,
  ENTRYTYPE.spiral,
  ENTRYLOCATION.center,
  finishParams,
  false
);
console.log("initial pocket data set");

let pocketController = new TrichoidPocketController(pocket);

/*

let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext("2d");

context.fillStyle = "green";
context.fillRect(0, 5, 150, 100);

context.beginPath();
context.moveTo( 5, 5 );
context.lineTo( 5, canvas.height - 5 );
context.lineTo( canvas.width - 5, canvas.height - 5 );
context.lineTo( canvas.width - 5, 5 );
context.lineTo( 5, 5 );
context.lineWidth = 5;
context.stroke();

let xPadding = 5;
let yPadding = 5;
let inchWidth = 2;
let inchScalar = (canvas.width - 10) / inchWidth;
let inchHeight = Math.ceil((canvas.height -10) / inchScalar);
context.beginPath();
for(let i = 0; i < inchWidth; i++){
 context.moveTo(xPadding + ( inchScalar * i ), yPadding);
 context.lineTo(xPadding + ( inchScalar * i ), canvas.height-yPadding);
}
for(let i = 0; i < inchHeight; i++){
 context.moveTo(xPadding, yPadding + (inchScalar*i));
 context.lineTo(canvas.width - xPadding, yPadding+(inchScalar*i));
}
context.lineWidth = 3;
context.stroke();

context.beginPath();
for(let i = 0; i < inchWidth * 10; i++){
 context.moveTo(xPadding + ( (inchScalar/10) * i ), yPadding);
 context.lineTo(xPadding + ( (inchScalar/10) * i ), canvas.height-yPadding);
}
for(let i = 0; i < inchHeight * 10; i++){
 context.moveTo(xPadding, yPadding + ((inchScalar/10)*i));
 context.lineTo(canvas.width - xPadding, yPadding+((inchScalar/10)*i));
}
context.lineWidth = 2;
context.stroke();

context.beginPath();
for(let i = 0; i < inchWidth * 100; i++){
 context.moveTo(xPadding + ( (inchScalar/100) * i ), yPadding);
 context.lineTo(xPadding + ( (inchScalar/100) * i ), canvas.height-yPadding);
}
for(let i = 0; i < inchHeight * 100; i++){
 context.moveTo(xPadding, yPadding + ((inchScalar/100)*i));
 context.lineTo(canvas.width - xPadding, yPadding+((inchScalar/100)*i));
}
context.lineWidth = 1;
context.stroke();

*/
// variable for the namespace
const svgns = "http://www.w3.org/2000/svg";

const svg = document.getElementById("gridSVG");
svg.style.width = window.innerWidth + "px";
svg.style.height = window.innerHeight + "px";
svg.setAttribute(
  "viewBox",
  "0 0 " + window.innerWidth + " " + window.innerHeight
);
//svg.viewBox()

function createSVGPath(d) {
  let newPath = document.createElementNS(svgns, "path");
  newPath.setAttribute("d", d);
  newPath.setAttribute("stroke-width", "2");
  newPath.setAttribute("stroke", "red");
  newPath.setAttribute("fill", "none");
  return newPath;
}

function createSVGLine(x1, y1, x2, y2, width, color) {
  let newLine = document.createElementNS(svgns, "line");
  newLine.setAttribute("x1", x1);
  newLine.setAttribute("y1", y1);
  newLine.setAttribute("x2", x2);
  newLine.setAttribute("y2", y2);
  newLine.setAttribute("stroke-width", width);
  newLine.setAttribute("stroke", color);
  return newLine;
}

/*
<circle
cx="0"
cy="0"
r="90"
fill="transparent"
stroke="#f0f0c9"
stroke-width="7"
/>
*/
function createSVGCircle(cx, cy, r, width, color) {
  let newCircle = document.createElementNS(svgns, "circle");
  newCircle.setAttribute("cx", cx);
  newCircle.setAttribute("cy", cy);
  newCircle.setAttribute("r", r);
  newCircle.setAttribute("fill", "transparent");
  newCircle.setAttribute("stroke-width", width);
  newCircle.setAttribute("stroke", color);
  return newCircle;
}

//A rx ry x-axis-rotation large-arc-flag sweep-flag x y
function createSVGSemiCircle(cx, cy, radius, sx, sy, ex, ey) {
  let angles = getSemiCircleAnglesFromEndpoints(cx, cy, sx, sy, ex, ey);
  let deltaAngle = angles.ea - angles.sa;
  let largeArc = deltaAngle > 180;
  //let newSemiCircle = document.createElementNS(svgns, 'arc');
  let arcString = `M ${sx} ${sy} A ${radius} ${radius} 0 ${
    largeArc ? 1 : 0
  }  1 ${ex}  ${ey}`;
  return arcString;
}

function getSemiCircleEndpoints(cx, cy, radius, sa, ea) {
  return {
    sx: cx + radius * Math.cos((sa * Math.PI) / 180),
    sy: cy + radius * Math.sin((sa * Math.PI) / 180),
    ex: cx + radius * Math.cos((ea * Math.PI) / 180),
    ey: cy + radius * Math.sin((ea * Math.PI) / 180),
  };
}

function getSemiCircleAnglesFromEndpoints(cx, cy, sx, sy, ex, ey) {
  let deltaXStart = sx - cx;
  let deltaYStart = sy - cy;
  let deltaXEnd = ex - cx;
  let deltaYEnd = ey - cy;
  return {
    sa: (Math.atan2(deltaYStart, deltaXStart) * 180) / Math.PI,
    ea: (Math.atan2(deltaYEnd, deltaXEnd) * 180) / Math.PI,
  };
}

function getSemiCircleXAtY(cx, cy, r, y) {
  //(x - cx)^2 + (y - cy)^2 = r^2
  //(x - cx)^2 = r^2 - (y - cy)^2
  //x - cx = sqrt(r^2 - (y-cy)^2)
  //x = sqrt(r^2 - (y-cy)^2) + cx
  // x = cx = or - sqrt(r^2 - (y - cy)^2)
  let underSquare = Math.sqrt(r * r - Math.pow(y - cy, 2));
  return {
    plus: cx + underSquare,
    minus: cx - underSquare,
  };
}

function generatePath(cx, cy, radius, direction, step, distance) {
  let sx = cx + radius;
  let sy = cy;
  let ex = cx - radius;
  let ey = cy;
  //let arcString = createSVGSemiCircle(cx, cy, radius, sx, sy, ex, ey);

  let testPath = createSVGPath(arcString);

  for (let i = 0; i < 500; i++) {
    let prevCenterY = cy + (i - 1) * step;
    let centerY = cy + i * step;
    let nextCenterY = cy + (i + 1) * 20;
    let arcStartX = getSemiCircleXAtY(cx, centerY, radius, prevCenterY);
    let nextStartX = getSemiCircleXAtY(cx, nextCenterY, radius, centerY);
    let arc = createSVGSemiCircle(
      cx,
      centerY,
      radius,
      arcStartX.plus,
      prevCenterY,
      ex,
      centerY
    );

    let connectingLine = ` L ${arcStartX.plus}, ${centerY}`;
    testPath.setAttribute(
      "d",
      testPath.getAttribute("d") + arc + connectingLine
    );
  }
  return testPath;
}

/*
<animateMotion
      dur="10s"
      repeatCount="indefinite"
      path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
      */
function createMotionAnimation(motionPath, dur, reps) {
  let newMotion = document.createElementNS(svgns, "animateMotion");
  newMotion.setAttribute("dur", dur);
  newMotion.setAttribute("repeatCount", reps);
  newMotion.setAttribute("path", motionPath);
  console.log("motion path:");
  console.log(newMotion);
  return newMotion;
}

// make a simple rectangle
let newRect = document.createElementNS(svgns, "rect");
newRect.setAttribute("x", "150");
newRect.setAttribute("y", "150");
newRect.setAttribute("width", "100");
newRect.setAttribute("height", "100");
newRect.setAttribute("fill", "#5cceee");

let newLine = document.createElementNS(svgns, "line");
newLine.setAttribute("x1", "10");
newLine.setAttribute("y1", "10");
newLine.setAttribute("x2", "100");
newLine.setAttribute("y2", "10");
newLine.setAttribute("stroke-width", "10");
newLine.setAttribute("stroke", "blue");

// set attributes of new rectangle
//gsap.set(newRect, {
//  attr: { x: 150, y: 150, width: 100, height: 100, fill: "#5cceee" }
//});

// append the new rectangle to the svg
svg.appendChild(newRect);
svg.appendChild(newLine);
svg.appendChild(createSVGLine(25, 150, 150, 25, 1, "red"));

let xPadding = 5;
let yPadding = 5;
let inchWidth = 2;
let inchScalar = (window.innerWidth - xPadding * 2) / inchWidth;
let inchHeight = Math.ceil((window.innerHeight - yPadding * 2) / inchScalar);
console.log(inchScalar);

for (let i = 0; i < inchWidth * 10 + 1; i++) {
  let x1 = xPadding + (inchScalar / 10) * i;
  let y1 = yPadding;
  let x2 = xPadding + (inchScalar / 10) * i;
  let y2 = window.innerHeight - yPadding;
  svg.appendChild(createSVGLine(x1, y1, x2, y2, 3, "black"));
}
for (let i = 0; i < inchHeight * 10 + 1; i++) {
  let x1 = xPadding;
  let y1 = yPadding + (inchScalar / 10) * i;
  let x2 = window.innerWidth - xPadding;
  let y2 = yPadding + (inchScalar / 10) * i;
  svg.appendChild(createSVGLine(x1, y1, x2, y2, 3, "black"));
}

for (let i = 0; i < inchWidth + 1; i++) {
  let x1 = xPadding + inchScalar * i;
  let y1 = yPadding;
  let x2 = xPadding + inchScalar * i;
  let y2 = window.innerHeight - yPadding;
  svg.appendChild(createSVGLine(x1, y1, x2, y2, 5, "black"));
}
for (let i = 0; i < inchHeight + 1; i++) {
  let x1 = xPadding;
  let y1 = yPadding + inchScalar * i;
  let x2 = window.innerWidth - xPadding;
  let y2 = yPadding + inchScalar * i;
  svg.appendChild(createSVGLine(x1, y1, x2, y2, 5, "black"));
}

let arcString = createSVGSemiCircle(100, 100, 50, 150, 100, 50, 100);
console.log("arc");
console.log(arcString);

let testPath = createSVGPath(arcString);
//console.log(testPath.getAttribute("d"));
for (let i = 0; i < 100; i++) {
  // arc start x = get semi circle x at y (cx, cy, radius, prevCenterY)
  let arcStartX = getSemiCircleXAtY(100, 100 + i * 20, 50, 100 + (i - 1) * 20);
  //new arc = create svg semi circle (cx, cy, radius, startX.plus, prevCenterY, ex, ey)
  let newArc = createSVGSemiCircle(
    100,
    100 + i * 20,
    50,
    arcStartX.plus,
    100 + (i - 1) * 20,
    50,
    100 + i * 20
  );
  //nextCenterY = cy + (i + 1) * step
  //nextStartX = getSemiCircleXAtY(cx, nextCenterY, radius, lineEndY)
  //connectingLine = ` L ${lineEndX.plus}, ${lineEndY}`
  let lineEndY = 100 + i * 20;
  let nextCenterY = 100 + (i + 1) * 20;
  //lineEndX
  let lineEndX = getSemiCircleXAtY(100, nextCenterY, 50, lineEndY);
  let connectingLine = ` L ${lineEndX.plus}, ${lineEndY}`;
  testPath.setAttribute(
    "d",
    testPath.getAttribute("d") + newArc + connectingLine
  );
}
svg.appendChild(testPath);
let functionPath = generatePath(500, 25, 50, { x: -1, y: 0 }, 30, 10);

svg.appendChild(functionPath);
let tool = createSVGCircle(0, 0, 35, 10, "green");
tool.appendChild(
  createMotionAnimation(functionPath.getAttribute("d"), "1000", 2)
);
svg.appendChild(tool);

console.log("index.js finished");

//end
