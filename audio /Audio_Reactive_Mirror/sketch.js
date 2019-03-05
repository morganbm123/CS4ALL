/*
ICM Homework 10/29/18, Morgan Mueller

This project takes a live video and performs image manipulations 
on it to give a few different results depending on the music being
played.

The first result is that a grayscaled video appears with minorly 
pulsating rectangles. The second is that a colored video appears
with pulsating circles.

The slider at the bottom of the screen increases the size of the 
pixels in the video

*/
let video;

let vScaleSlider1;
let vScaleSlider2;


let vScale = 16;

//load sound info
// FYI for ICM class I called this boring because the DJ's name 
//is DJ Boring
let boring;
let fft;

let slideText;

function preload() {

  // import the song
    soundFormats('mp3', 'ogg');

  boring = loadSound('mtKimbie.mp3');
  

}

function setup() {

  
  
  createCanvas(640, 480);
  pixelDensity(1);

  
  
  //instantiate sliders
  
  vScaleSlider1 = createSlider(0, 50, 0);
  vScaleSlider1.position(10, 500);
  
  stroke(255);
  let tempText = createElement('p','Pulsation Intensity');
	tempText.position(150, 480);

  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();

  
  //begin the FFT operations
  fft = new p5.FFT();
  boring.amp(0.7);
  boring.play();



  frameRate(30);

}

function draw() {
  background(51);

  //load the video's pixels
  video.loadPixels();
  loadPixels();

  //analyze the sound 
  let fftSpectrum = fft.analyze();
	//get the energy from the bass
  let boringBass = fft.getEnergy("bass");
	//map the energy from the bass 
  let bassMapped = map(boringBass, 0, 255, 0, vScale + vScaleSlider1.value());
 // console.log(boringMid);

  
  //iterate through the video in both x and y 
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      //calculation to index through the video's size 
      let index = (video.width - x - 1 + (y * video.width)) * 4;

      //create variables to store pixel values in the video
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
	
      //average grayscale value of the video
      let bright = (r + g + b) / 3

      //map the brightness 
      let w = map(bright, 0, 255, 0, vScale);
			noStroke();
      
      //if the bass from the song is less than 125 use grayscale
      if (boringBass < 125) {
        fill(bright);
        rectMode(CENTER);
        rect(x * vScale, y * vScale, bassMapped , bassMapped);

        //otherwise set color
      } else {
        fill(r, g, b, random(100, 255));
        ellipseMode(CENTER);
        ellipse(x * vScale, y * vScale, bassMapped , bassMapped );

      }


    }
  }
  
}