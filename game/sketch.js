let ball_x,ball_y,ball_dx,ball_dy,ball_radius;
let paddle_x,paddle_y,paddle_width,paddle_height,paddle_dx;
let rem_lives,score;
// let brick_x,brick_y,brick_width,brick_height;
let grid=[]
var x,y,w,h;
function setup() {
  createCanvas(400, 400);
  background("black")
   fill("lightblue")
  
  // // stroke("red")
  // circle(width/2,height/2,25)
  paddle_y=height-20;
  ball_x=width/2;
   ball_radius=25;
  ball_y=paddle_y-ball_radius/2;
 // ball_radius=25;
  ball_dx=-2;
  ball_dy=-1.5;

  paddle_x=(width/2)-(80/2);
 // paddle_y=height-20;
  paddle_height=15;
  paddle_width=80;
  paddle_dx=3;
  
  brick_x=100;
  brick_y=100;
  brick_width=90;
  brick_height=30;
  rect(brick_x,brick_y,brick_width,brick_height);
  score=0;
  rem_lives=2;
  for(let i=0;i<4;i++){
    let row=[]
    for(let j=0;j<4;j++){
      
    row.push({x:(i*95)+20,
      y:(j*55)+30,
        w:80,
          h:35});
 //     console.log(brick[j])
    }
    grid.push(row);
   // console.log(row[i])
  }
 // grid.push(row);
  //console.log(grid[0].x);

}
function draw(){
  background("black")
  ball_x+=ball_dx;
  ball_y+=ball_dy;
 // fill("white")
  circle(ball_x,ball_y,ball_radius)
  rect(paddle_x,paddle_y,paddle_width,paddle_height);
  //rect(brick_x,brick_y,brick_width,brick_height);
  if( (ball_x + (ball_radius/2))>=width || (ball_x-(ball_radius/2))<=0)
    {
      ball_dx=-(ball_dx)
    }
  if((ball_y-(ball_radius/2))<=0 ){
    ball_dy=-(ball_dy);
  }
  
  //ball on paddle
  if( (ball_x  >=paddle_x && ball_x<=paddle_x+paddle_width)   && (ball_y + (ball_radius/2)) >= paddle_y ){
    ball_dy=-(ball_dy); 
  }
      //ball not on paddle
   if( (ball_y+(ball_radius/2)>=height)){
     if(rem_lives>1){
      setTimeout(100);
      rem_lives--;
      ball_x=width/2;
      paddle_y=height-20;
      ball_y=paddle_y-ball_radius/2;
      ball_dx=-2;
      ball_dy=-1.5;
      paddle_x=(width/2)-(80/2);
    }
     else{
      rem_lives=0;
      ball_dy=0;
      ball_dx=0;
      paddle_dx=0;
      text("!!!Game Over!!!!",170,250)
     } 
  }

  if( keyIsDown(RIGHT_ARROW) && paddle_x+80<=width){
    paddle_x+=paddle_dx;
  }
   if(keyIsDown(LEFT_ARROW) && paddle_x>=0){
    paddle_x-=paddle_dx;
   }
  
    for(var i=0;i<4;i++){
      for(var j=0;j<4;j++){
        rect(grid[i][j].x,grid[i][j].y,grid[i][j].w,
             grid[i][j].h);
      
        if(ball_x-(ball_radius/2) < grid[i][j].x + 
           grid[i][j].w && ball_y > grid[i][j].y && 
           ball_y <grid[i][j].y + grid[i][j].h && 
           ball_x + (ball_radius/2) > grid[i][j].x)
        {
          ball_dx = -ball_dx;
          score++;
          grid[i][j].h=0;
          grid[i][j].w=0;
       }
      
       if(ball_y-(ball_radius/2) < grid[i][j].y +
          grid[i][j].h && ball_x > grid[i][j].x && ball_x 
          <grid[i][j].x + grid[i][j].w && 
          ball_y + (ball_radius/2) > grid[i][j].y)
       {
         ball_dy = -ball_dy;
         score++;
         grid[i][j].h=0;
         grid[i][j].w=0;
      }
      
    }
  }
//when ball hit all the bricks
  if(score === (grid.length*grid[0].length) )
  {
    ball_dx=0;
    ball_dy=0;
    text("You Won!!!!", (width/2)-50,(height/2));
  }
  //adding score and remaining lives
  text("Score:", width-100,20)
  text("Lives:",30,20)
  text(rem_lives,70,20)
  text(score,width-60,20)

//brick hit
  //down side
//   if(((ball_x+(ball_radius/2)>=brick_x && ball_x-(ball_radius/2) <=brick_x+brick_width ) )&& ((ball_y-(ball_radius/2)<brick_y-13) && (ball_y-(ball_radius/2)>=brick_y))){
//   brick_height=0;
//   brick_width=0;
//   ball_dy=-ball_dy;
// }
  //up side
  // else if((ball_x+(ball_radius/2)>=brick_x && ball_x-(ball_radius/2 <=brick_x+brick_width ) && ball_y+(ball_radius/2)>=brick_y)){
  // brick_height=0;
  // brick_width=0;
  // ball_dy=-ball_dy;}
  //top and bottom
  // if(ball_x>=brick_x && ball_x<=brick_x+brick_width && ball_y+(ball_radius/2)>=brick_y && ball_y-ball_radius/2<brick_y+brick_height  ){
  //   //brick_height=0;
  //   //brick_width=0;
  //   ball_dy=-(ball_dy);
  // }
  // //left and right
  // else if(ball_y>=brick_y && ball_y<=brick_y+brick_height && ball_x+(ball_radius/2)>=brick_x && ball_x-ball_radius/2<brick_x+brick_width  ){
  //   //brick_height=0;
  //   //brick_width=0;
  //   ball_dx=-(ball_dx);
  // }

}

