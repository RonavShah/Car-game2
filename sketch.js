var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distanceX = 0;
var distanceY = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img,platformImg,platform;
var platformScale;

var rand;

function preload(){
  track = loadImage("images/Platform.png");
  green_img = loadImage("images/greenCar.png");
  blue_img = loadImage("images/blueCar.png");
  red_img = loadImage("images/redCar.png");
  yellow_img = loadImage("images/yellowCar.png");
  ground = loadImage("images/ground.png");
  platformImg = loadImage("images/circle.png")
  
}

function setup(){
  canvas = createCanvas(600,600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  platformScale = 1;
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
