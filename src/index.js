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

function createSVGPath(d, width, color) {
  let newPath = document.createElementNS(svgns, "path");
  newPath.setAttribute("d", d);
  newPath.setAttribute("stroke-width", width);
  newPath.setAttribute("stroke", color);
  newPath.setAttribute("fill", "none");
  newPath.setAttribute("stroke-linejoin", "round");
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
  // x = cx + or - sqrt(r^2 - (y - cy)^2)
  let underSquare = Math.sqrt(r * r - Math.pow(y - cy, 2));
  return {
    plus: cx + underSquare,
    minus: cx - underSquare,
  };
}

//(x - cx)^2 + (y - cy)^2 = r^2

function getArcCenter(x1, y1, x2, y2, r) {
  let center = {
    x: 0,
    y: 0,
  };
  return center;
}

function generatePath(cx, cy, radius, width, step, distance, color) {
  let sx = cx + radius;
  let sy = cy;
  let ex = cx - radius;
  let ey = cy;
  let arcString = createSVGSemiCircle(cx, cy, radius, sx, sy, ex, ey);

  let testPath = createSVGPath("", width, color);

  for (let i = 0; i < distance / step; i++) {
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

/*
<animate
      attributeName="rx"
      values="0;5;0"
      dur="10s"
      repeatCount="indefinite" />
      */
function createAnimation(dur, reps, from, to) {
  let newAnim = document.createElementNS(svgns, "animate");
  newAnim.setAttribute("attributeName", "stroke-dashoffset");
  newAnim.setAttribute("repeatCount", reps);
  newAnim.setAttribute("dur", dur);
  //newAnim.setAttribute("from", from);
  newAnim.setAttribute("to", to);
  return newAnim;
}

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

//let arcString = createSVGSemiCircle(100, 100, 50, 150, 100, 50, 100);

let functionPath = generatePath(500, 25, 50, 2, 5, 400, "red");
let cutPath = generatePath(500, 25, 50, 70, 5, 400, "green");
cutPath.setAttribute("stroke-dasharray", `${cutPath.getTotalLength() + 1}`);
cutPath.setAttribute("stroke-dashoffset", `${cutPath.getTotalLength() + 1}`);
/*
<animate
      attributeName="rx"
      values="0;5;0"
      dur="10s"
      repeatCount="indefinite" />
      */

//cutPath.setAttribute("animation", "dash 5s linear");

svg.appendChild(cutPath);
svg.appendChild(functionPath);
let cutPathAnim = createAnimation("300", "5", cutPath.getTotalLength(), 0);
cutPath.appendChild(cutPathAnim);
let tool = createSVGCircle(0, 0, 35, 10, "blue");
tool.appendChild(
  createMotionAnimation(functionPath.getAttribute("d"), "30", "5")
);
svg.appendChild(tool);

console.log("index.js finished");

//end
