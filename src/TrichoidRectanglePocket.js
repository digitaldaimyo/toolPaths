 export const ENTRYLOCATION = {
  corner1: 0,
  corner2: 1,
  corner3: 2,
  corner4: 3,
  corner5: 4,
  center: 5
};

export const ENTRYTYPE = {
 plunge: 0,
 spiral: 1,
 ramp: 2
};

export class TrichoidRectanglePocket{
  constructor( rectangle, cutParams, tools, corners, depth, entryType, entryLocation, finishParams, isSeperateFinish){
    this.rectangle = rectangle;
    this.cutParams = cutParams;
    this.tools = tools;
    this.corners = corners;
    this.depth = depth;
    this.entryType = entryType;
    this.entryLocation = entryLocation;
    this.finishParams = finishParams;
    this.isSeperateFinish = isSeperateFinish;
  }
  
  moveToEntryPosition( ){
    
    
  }
  
  moveToCenter( ){
    
  }
  
  moveToCorner( cornerNumber ){
    
  }
  
  spiralToDepth( ){
    
  }
  
  plungeToDepth( ){
    
  }
  
  rampToDepth( ){
    
  }
}

export class Rectangle{
  constructor( centerX, centerY, width, height ){
    this.centerX = centerX;
    this.centerY = centerY;
    this.width = width;
    this.height = height;
  }
}

export class CutParams{
  constructor( aDoC, rDoC, speed, feed ){
    this.aDoC = aDoC;
    this.rDoC = rDoC;
    this.speed = speed;
    this.feed = feed;
  }
 }
 
 export class FinishParams{
  constructor( isSeperateFinish, cutParams){
   this.isSeperateFinish = isSeperateFinish;
   this.cutParams = cutParams;
  }
 }

export class Corner{
  constructor( radius ){
    this.radius = radius;
  }
}

export class Tool{
 constructor( toolNumber ){
  this.toolNumber = toolNumber;
 }
}








