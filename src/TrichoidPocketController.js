import * as lil from './libraries/lil-gui.min';
import { ENTRYLOCATION, ENTRYTYPE } from './TrichoidRectanglePocket.js';

export class TrichoidPocketController{
 constructor( pocket ){
  this.isCornerRadius = { value: false };
  this.cornerMessage = { value: 'Corners start at top left and wind counter-clockwise' };
  this.emptyString = { value: '' };
  this.pocket = pocket;
  this.gui = new lil.GUI().title('Pocket');
  this.init( );
 }
 
 init( ){
  this.cutParamsFolder = this.gui.addFolder( 'Cut Parameters');
  this.cutParamsFolder.add(this.pocket.cutParams, 'aDoC');
  this.cutParamsFolder.add(this.pocket.cutParams, 'rDoC');
  this.cutParamsFolder.add(this.pocket.cutParams, 'speed');
  this.cutParamsFolder.add(this.pocket.cutParams, 'feed');
  
  
  this.finishParamsFolder = this.cutParamsFolder.addFolder('Finish');
  this.finishParamsFolder.add(this.pocket.finishParams, 'aDoC');
  this.finishParamsFolder.add(this.pocket.finishParams, 'rDoC');
  this.finishParamsFolder.add(this.pocket.finishParams, 'speed');
  this.finishParamsFolder.add(this.pocket.finishParams, 'feed');
  //this.finishParamsFolder.close( );
  this.cutParamsFolder.close( );
  
  this.toolFolder = this.gui.addFolder('Tooling');
  this.toolFolder.add(this.pocket, 'isSeperateFinish')
  .name('Seperate Finish Tool?')
  .onChange(( )=>{this.toggleFinishTool( ); } )
  
  this.finishToolFolder = this.toolFolder.addFolder('Finish Tool');
  this.finishToolFolder.add(this.pocket.tools.finishTool, 'toolNumber' ).name('Tool Number');
  if( !this.pocket.isSeperateFinish ){
   this.finishToolFolder.hide( );
  }
  
  this.roughingToolFolder = this.toolFolder.addFolder( 'Roughing Tool' );
  this.roughingToolFolder.add(this.pocket.tools.roughingTool, 'toolNumber' ).name('Tool Number');
  this.toolFolder.close( );
  
  this.rectFolder = this.gui.addFolder( 'Rectangle' );
  this.rectFolder.add( this.pocket.rectangle, 'centerX', .001, 100, .0001).name('Center X');
  this.rectFolder.add(this.pocket.rectangle, 'centerY', .001, 100, .0001).name('Center Y');
  this.rectFolder.add(this.pocket.rectangle, 'width', .001, 100, .0001).name('Width');
  this.rectFolder.add(this.pocket.rectangle, 'height', .001, 100, .0001).name('Height');
  this.rectFolder.close();
  
  this.cornerFolder = this.gui.addFolder( 'Corners' );
  this.cornerFolder.add(this.isCornerRadius, 'value')
  .onChange(( )=>{this.toggleGuiCorners( ); } )
  .name('Custom Corners');
  
  this.cornerRadiusFolder = this.cornerFolder.addFolder('Radii');
  this.cornerRadiusFolder.add(this.pocket.corners[0], 'radius', .001, 100, .0001).name('Corner 1');
  this.cornerRadiusFolder.add(this.pocket.corners[1], 'radius', .001, 100, .0001).name('Corner 2');
  this.cornerRadiusFolder.add(this.pocket.corners[2], 'radius', .001, 100, .0001).name('Corner 3');
  this.cornerRadiusFolder.add(this.pocket.corners[3], 'radius', .001, 100, .0001).name('Corner 4');
  this.cornerRadiusFolder.hide();
  
  this.entrySettingsFolder = this.gui.addFolder('Entry Settings');
  this.entrySettingsFolder.add(this.pocket, 'entryLocation', ENTRYLOCATION).name('Location');
  this.entrySettingsFolder.add(this.pocket, 'entryType', ENTRYTYPE).name('Style');
  this.entrySettingsFolder.close( );
 }
 
 toggleGuiCorners(){
   if(this.isCornerRadius.value){
     this.cornerRadiusFolder.open();
     this.cornerRadiusFolder.show();
     return;
   }
   this.cornerRadiusFolder.close();
   this.cornerRadiusFolder.hide();
 }
 
 toggleFinishTool(){
   if(this.pocket.isSeperateFinish){
     this.finishToolFolder.open();
     this.finishToolFolder.show();
     return;
   }
   this.finishToolFolder.close();
   this.finishToolFolder.hide();
 }
 
 stickyFolder( folder ){
   console.log('sticky');
   folder.open( );
 }
 
}