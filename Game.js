class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    
    car1 = createSprite(150,150);
    car1.addImage("car1",red_img);
    car1.scale = 0.2;
    
    car2 = createSprite(300,300 );
    car2.addImage("car2",yellow_img);
    car2.scale = 0.115;
    car3 = createSprite(200,150);
    car3.addImage("car3",green_img);
    car3.scale = 0.2;
    car4 = createSprite(200,200);
    car4.addImage("car4",blue_img);
    car4.scale = 0.2;
    cars = [car1, car2, car3, car4];

    car1.bounce(car2);
    car1.bounce(car3);
    car1.bounce(car4);
    car2.bounce(car3);
    car2.bounce(car4);
    car3.bounce(car4);

/*
    if(!car1.isTouching(platform)){

      setTimeout(function(){
        car1.destroy();

      }, 500); 
     
    }

    
    if(!car2.isTouching(platform)){

      setTimeout(function(){
        car2.destroy();

      }, 500); 
     
    }

    
    if(!car3.isTouching(platform)){

      setTimeout(function(){
        car3.destroy();

      }, 500); 
     
    }

    
    if(!car4.isTouching(platform)){

      setTimeout(function(){
        car4.destroy();

      }, 500); 
     
    }
*/
    platform = createSprite(200,300,10,10);
    platform.addImage(platformImg);
    platformScale = 0.125;

    rand = Math.round (random(1,4));
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,0,600, 600);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 0;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = width - allPlayers[plr].distanceX;
        //use data form the database to display the cars in y direction
        y = height - allPlayers[plr].distanceY;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
         // camera.position.x = width/2;
         // camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distanceY +=10
      player.rotation = 360
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distanceY -=10
      player.rotation = 180
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distanceX +=10
      player.rotation = 270
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distanceX -=10
      player.rotation = 900
      player.update();
    }

 /*   if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      Player.updateCarsAtEnd(player.rank)
    }
   */


switch(rand){
    case 1:platform.x = 100;
        platform.y = 300;
        break;

    case 2:platform.x = 500;
         platform.y = 300;
          break;

    case 3:platform.x = 300;
          platform.y = 100;
           break;

     case 4:platform.x = 300;
           platform.y = 500;
            break;
     
}


if(platformScale >= 0.01){
  platformScale -= 0.0001;
}else
  {
    platformScale = 0.125;
    rand = Math.round (random(1,4));
  }

platform.scale = platformScale;




if(!car1.isTouching(platform)&&frameCount % 200 ===0){
  car1.destroy();
}


    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
