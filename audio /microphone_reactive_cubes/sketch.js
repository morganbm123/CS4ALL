/*
Author: Morgan Mueller
Date: 03/01/19
This example shows how to use the microphone and 
ambient audio to display and manipulate graphics 
and shapes
*/

//global variables
let input;
let analyze;

function setup() {
  createCanvas(400, 400);
  background(255);
  
  //initialize the microphone
  input = new p5.AudioIn();
  input.start();
  
  //volume thresholds go from 0 - 1
}

function draw() {
  //background(220);
	//get the volume and set a threshold
  let vol = input.getLevel();
  let threshold = 0.1;
  
  //if the volume is greater than a threshold value
  //then create the square
  if(vol > threshold){
		stroke(0);
    fill(random(255),random(255), random(255), random(100));
    rect(random(40, width), random(height), vol*50, vol*50);  
  
  }
  
  
  
}