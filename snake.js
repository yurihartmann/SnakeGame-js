const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");


// Create the unit

const box = 32;
const speed = 3; // 1 = super hard // 2 = hard // 3 = easy // 4 = super easy

// Load the images

const groudImg = new Image();
groudImg.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load the audios

const deadAudio = new Audio();
const eatAudio = new Audio();
const upAudio = new Audio();
const downAudio = new Audio();
const rightAudio = new Audio();
const leftAudio = new Audio();

deadAudio.src = "audio/dead.mp3";
eatAudio.src = "audio/eat.mp3";
upAudio.src = "audio/up.mp3";
downAudio.src = "audio/down.mp3";
rightAudio.src = "audio/right.mp3";
leftAudio.src = "audio/left.mp3";

// Create snake

let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box,
};

let food;
randomFood();

function randomFood(){
    food = {
        x: Math.floor(Math.random()*17+1) * box,
        y: Math.floor(Math.random()*15+3) * box,
    };
}

// Create the score

let score = 0;

// CONTROL THE SNAKE

document.addEventListener("keydown", direction);

let d;

function direction(event) {
    if (event.keyCode === 37 && d !== "RIGHT"){
        d = "LEFT";
        leftAudio.play();
    } else if (event.keyCode === 38 && d !== "DOWN"){
        d = "UP";
        upAudio.play();
    } else if (event.keyCode === 39 && d !== "LEFT"){
        d = "RIGHT";
        rightAudio.play();
    } else if (event.keyCode === 40 && d !== "UP"){
        d = "DOWN";
        downAudio.play();
    }

}

// DRAW

function colision(head, array) {
    for (let i = 0; i < array.length; i++){
        if (head.x === array[i].x && head.y === array[i].y){
            return true;
        }
    }
    return false;
}

function draw() {

    // draw the background
    context.drawImage(groudImg,0,0);


    // draw the snake
    for (let i = 0; i < snake.length; i++){
        context.fillStyle = (i === 0) ? "green" : "white";
        context.fillRect(snake[i].x,snake[i].y, box, box);

        context.strokeStyle = "red";
        context.strokeRect(snake[i].x,snake[i].y, box, box);

    }

    // draw the food
    context.drawImage(foodImg, food.x, food.y);

    // Snake eat the food


    // Old head snake

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // if snake eat the food

    if (snakeX  === food.x && snakeY === food.y){
        eatAudio.play();
        score++;
        randomFood();
    } else {
        // remove in array if dont eat
        snake.pop();
    }


    // select the direction

    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;



    // add in array new head

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    // GAME OVER

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || colision(newHead, snake)){
        clearInterval(gameRuning);
        deadAudio.play();
    }

    snake.unshift(newHead);

    // draw the score
    context.fillStyle = "white";
    context.font = "45px Roboto";
    context.fillText(score,2 * box, 1.6 * box);

}

let gameRuning =setInterval(draw, speed * 50);

