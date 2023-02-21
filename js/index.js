const canvas = document.querySelector(`#game`);
const ctx = canvas.getContext(`2d`);
let scoreNode = document.querySelector(`.score`);

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
};

function endGame(){
    apple = {
        x: getRandomInt(1, 25) * box,
        y: getRandomInt(1, 25) * box,
    };

    snake = [];
    snake[0] = {
        x: 8 * box,
        y: 8 * box,
    };

    score = 0;
}

function eatTail(head, arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x == arr[i].x && head.y == arr[i].y){
            endGame();
        }
    }
};

let dir;

document.addEventListener(`keydown`, function(evt){
    if(evt.key == `w` && dir != `down`){dir = `up`}
    else if(evt.key == `a` && dir != `right`){dir = `left`}
    else if(evt.key == `s` && dir != `up`){dir = `down`}
    else if(evt.key == `d` && dir != `left`){dir = `right`};
});

let box = 16;
let score = 0;

let apple = {
    x: getRandomInt(1, 25) * box,
    y: getRandomInt(1, 25) * box,
};

let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
};

function drawGame(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, box, box);

    for(let i = 0; i < snake.length; i++){ 
        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == apple.x && snakeY == apple.y){
        score++;
        apple.x = getRandomInt(1, 25) * box;
        apple.y = getRandomInt(1, 25) * box;
    } else{
        snake.pop();
    }

    if(dir === `up`){snakeY -= box};
    if(dir === `left`){snakeX -= box};
    if(dir === `down`){snakeY += box};
    if(dir === `right`){snakeX += box};
    

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    eatTail(newHead, snake);

    if(newHead.x > 400){newHead.x = 0};
    if(newHead.x < 0){newHead.x = 400};
    if(newHead.y > 400){newHead.y = 0};
    if(newHead.y < 0){newHead.y = 400};
    

    snake.unshift(newHead);

    scoreNode.innerHTML = score;
};

let game = setInterval(drawGame, 1000/15);


