var dog, dogImage, happyDog, database, foods, foodStock;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500, 500);
  
  dog = createSprite(250,350);
  dog.addImage(dogImage);
  dog.scale=0.15;

  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

}

function draw() {
  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foods);
    dog.addImage(happyDog);
  }
  drawSprites();
  
  fill("white");
  stroke("white");
  textSize(20);
  text("Food remaining : "+foods,150,250);

  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk",125,20);
}

function readStock(data) {
  foods=data.val();
}

function writeStock(x) {
  if(x<=0) {
    x=0;
  } else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}



