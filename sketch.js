var girl,girlImg;
var dress,dressGroup;
var dblueImg,dGreenImg,dYellowImg,dMaroonImg,dvioletImg,dPinkImg;
var play,playBg,end,start,buttonImg,button
var gameState =1;//start state
var title,titleImg
var score ,collectedDress
var invisibleGr;
var knight,knightGroup, knightImg
var playAgain,playAgainImg
var restart,reset,resetImg,elena,elenaImg,star,starImg


function preload(){
girlImg = loadAnimation("images/girl1.png","images/girl2.png","images/girl3.png","images/girl4.png","images/girl5.png")
dblueImg = loadImage("images/dressBlue.png")
dPinkImg = loadImage("images/dressPink.png")
dvioletImg = loadImage("images/dressViolet.png")
dYellowImg = loadImage("images/dressYellow.png")
dGreenImg = loadImage("images/dressGreen.png")
dMaroonImg = loadImage("images/dressMaroon.png")
start = loadImage("images/startScreen.jpg")
end = loadImage("images/over.jpg")
play = loadImage("images/back2.jpg")
buttonImg = loadImage("images/play.png")
 titleImg=loadImage("images/Disney_Princess.png")
 knightImg = loadImage("images/knight.png")
 playAgainImg = loadImage("images/playA.png")
 restart = loadImage("images/back3.jpg")
 resetImg = loadImage("images/restart.png")
 elenaImg = loadImage("images/elena.png")
starImg = loadImage("images/star.png")
}

function setup(){
    createCanvas(windowWidth,windowHeight)

    playBg = createSprite(width/2,height/2,width,height)
    playBg.addImage(play)
    playBg.visible = false
    playBg.scale = 2.2
    playBg.velocityX = 4


    girl=createSprite(width-100,height-120)
    girl.addAnimation("running",girlImg);
    girl.scale=0.2
    girl.visible=false
    girl.velocityY = 0

    button= createSprite(width/2,height/2,10,10)
    button.addImage(buttonImg)
    button.scale=0.2
    button.visible=false

    title= createSprite(width/2-250,150,10,10)
    title.addImage(titleImg)
    title.scale=0.2
    title.visible=false

    score = 0;
    collectedDress = 0;

    invisibleGr = createSprite(width-100,height-20,120,10)
    invisibleGr.visible = false;

    playAgain= createSprite(2*width/3,2*height/3,10,10)
    playAgain.addImage(playAgainImg)
    playAgain.scale=1
    playAgain.visible=false

    reset= createSprite(width/4,height/1.7,10,10)
    reset.addImage(resetImg)
    reset.scale=0.3
    
    reset.visible=false

    elena= createSprite(width/2,height/1.5,10,10)
    elena.addImage(elenaImg)
    elena.scale=1
    elena.visible=false

    star= createSprite(3*width/4,height/1.7,10,10)
    star.addImage(starImg)
    star.scale=0.7
    star.visible=false

    dressGroup = new Group()
    knightGroup = new Group()

}

function draw(){
background(80)
    
if(gameState ===1){
    background(start)
    textSize(30)
    fill("red")
    text("Press PLAY to start",width/2.4,2*height/3)
    text("Use Up Arrow to jump",width/2.5,2*height/3+30)
    title.visible = true
    button.visible=true
    if(mousePressedOver(button)){
        gameState=2;//playState
    }
    drawSprites()
}


else if(gameState===2){
    
    
    playBg.visible = true
    if(playBg.x>width-600){
        playBg.x =width/2
    }
    button.visible = false;
    title.visible=false
    girl.visible = true;
    spawnDress()
    spawnKnight()
    if(keyDown(UP_ARROW) && girl.y>6*height/8){
        girl.velocityY = -20
    }
    girl.velocityY+=0.5;
    girl.collide(invisibleGr)
    
    for(var i = 0;i<dressGroup.length;i++){
        if(dressGroup.get(i).isTouching(girl)){
            dressGroup.get(i).destroy();
            collectedDress++

        }
    }
    if(collectedDress ===20){
        gameState = 4;
        playBg.visible = false
        girl.visible = false
        dressGroup.destroyEach()
        knightGroup.destroyEach()
    }

    if(knightGroup.isTouching(girl)){
        gameState=3;
        playBg.visible = false
        girl.visible = false
        dressGroup.destroyEach()
        knightGroup.destroyEach()
    }
    drawSprites()
    textSize(30)
    fill("red")
    text("Running Time: "+score,3*width/4 +70,30)
    text("Dresses Collected: "+collectedDress,30,30)

    score+=Math.round(getFrameRate()/60.8)
    
}
else if (gameState ===3){
    background(end)
    playAgain.visible = true
    textSize(30)
    fill("yellow")
    text("Running Time: "+score,3*width/4 +70,30)
    text("Dresses Collected: "+collectedDress,30,30)
   
    if(mousePressedOver(playAgain)){
        gameState=2;//playState
        score = 0
        collectedDress = 0
        girl.visible=true;
        playAgain.visible = false;
    }
    drawSprites();
    } 

    else if(gameState===4){
      background(restart)
    reset.visible = true
    elena.visible = true
    star.visible = true
    textSize(30)
    fill("yellow")
    text("Running Time: "+score,3*width/4 +70,30)
    text("Dresses Collected: "+collectedDress,30,30)
    textSize(40)
    text("Well Done !",width/2.2,height/5)
   
    if(mousePressedOver(reset)){
        gameState=2;//playState
        score = 0
        collectedDress = 0
        girl.visible=true;
        reset.visible = false;
        elena.visible = false
        star.visible = false
    }
    drawSprites();
    }
    
   
    
}

function spawnDress(){

    if (frameCount % 180 === 0){
        var dress = createSprite(-50,165,10,40);
        dress.velocityX = 5;
        dress.scale=0.3;
        dress.lifetime = 1200

         dress.y = Math.round(random(100,250))
         var rand = Math.round(random(1,6));
         switch(rand) {

           case 1: dress.addImage(dvioletImg);             
                   break;
           case 2: dress.addImage(dPinkImg);                 
                   break;
           case 3: dress.addImage(dYellowImg);
                    break;
           case 4: dress.addImage(dblueImg);     
                   break;
           case 5: dress.addImage(dMaroonImg);               
                   break;
           case 6: dress.addImage(dGreenImg);
                   break;
           default: break;
         }
         dress.depth = girl.depth;
         girl.depth++
         dressGroup.add(dress)

        } 
        
}
function spawnKnight(){

    if (frameCount % 250 === 0){
        var knight = createSprite(-50,height-120,10,40);
        knight.velocityX = 5;
        knight.scale=0.35;
        knight.lifetime = 1200
        knight.addImage( knightImg)    

        knightGroup.add( knight)

        } 
        
}
