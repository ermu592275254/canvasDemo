var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var gameStart;
var snakeLength = 5;
var snakeColor = 'yellow';
var snakeStroke = '#000';
var foodColor = '#ff00ff';
var foodPosition = [100,200];
var pointX = Math.random() * 200 + 100;
var pointY = Math.random() * 400 + 100;
var snakeRectWidth = 10;
var snakeRectHeight = 10;
var speed = 10; // 速度
var interval = 100;
var grade = 0;
var fontColor = 'red';
// var keyLeft = 37,
//     keyUp = 38,
//     keyRight = 39,
//     keyDown = 40;
var keyLeft = 65,
    keyUp = 87,
    keyRight = 68,
    keyDown = 83;
var snakeArr = [[pointX, pointY],
    [pointX + snakeRectWidth, pointY],
    [pointX + snakeRectWidth * 2, pointY],
    [pointX + snakeRectWidth * 3, pointY],
    [pointX + snakeRectWidth * 4, pointY]]; // 默认蛇身

var keyCode = keyLeft; // 默认移动方向
var resetButton = document.getElementById('reset'),
    restartButton = document.getElementById('restart'),
    speedInput = document.getElementById('speed'),
    speedNum = document.getElementById('speedNum'),
    obstacle = document.getElementById('obstacle'),
    snakeColorInput = document.getElementById('snakeColor'),
    upInput = document.getElementById('upInput'),
    downInput = document.getElementById('downInput'),
    leftInput = document.getElementById('leftInput'),
    rightInput = document.getElementById('rightInput');
resetButton.addEventListener('click', function() {
    reset();
});
restartButton.addEventListener('click',function() {
    restart();
});
speedInput.addEventListener('change', function() {
    console.log('change');
    speedNum.innerText = speedInput.value;
});
// 设置参数
var reset = function() {
    console.log(speedInput.value);
    console.log(snakeColorInput.value);
    interval = 100 - speedInput.value;
    snakeColor = snakeColorInput.value;
    snakeStroke = getColorContrast(snakeColor);
    clearInterval(gameStart);
    gameStart = setInterval(drawSnake,interval)
};
// 重新开始
var restart = function() {
    pointX = parseInt(Math.random() * 20)*10 + 100;
    pointY = parseInt(Math.random() * 40)*10 + 100;
    snakeArr = [[pointX, pointY],
        [pointX + snakeRectWidth, pointY],
        [pointX + snakeRectWidth * 2, pointY],
        [pointX + snakeRectWidth * 3, pointY],
        [pointX + snakeRectWidth * 4, pointY]]; // 默认蛇身
    keyCode = keyLeft;
    grade = 0;
    clearInterval(gameStart);
    gameStart = setInterval(drawSnake,interval)
};

// 判断蛇的移动
var drawSnake = function(interval) {
    context.fillStyle = snakeColor;
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrade();
    borderCrossing();
    addStep();
    eatFood();
    snakeArr.pop();
    snakeArr.unshift([pointX, pointY]);
    drawRect();
    drawFood();
    gameOver();
};
var addStep = function() {
    if (keyCode === keyLeft) { // ←
        pointX -= speed;
    } else if (keyCode === keyUp) { // ↑
        pointY -= speed;
    } else if (keyCode === keyRight) { // →
        pointX += speed;
    } else if (keyCode === keyDown) { // ↓
        pointY += speed;
    }
};
// 边界溢出设置
var borderCrossing = function() {
    if (pointX < 0) {
        pointX = canvas.width;
    } else if (pointX > canvas.width - snakeRectWidth) {
        pointX = -snakeRectWidth;
    }
    if (pointY < 0) {
        pointY = canvas.height;
    } else if (pointY > canvas.height - snakeRectHeight) {
        pointY = -snakeRectHeight;
    }
};
// 画蛇身
var drawRect = function() {
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeStroke;
    context.lineCap = 'round';
    for (var i = 0; i < snakeArr.length; i++) {
        context.fillRect(snakeArr[i][0], snakeArr[i][1], snakeRectWidth, snakeRectHeight);
        context.strokeRect(snakeArr[i][0], snakeArr[i][1], snakeRectWidth, snakeRectHeight);
    }
};
// 画得分
var drawGrade = function() {
    context.fillStyle = fontColor;
    context.fillText('得分：' + grade, 10, 20);
};
// 画食物
var drawFood = function() {
    context.fillStyle = foodColor;
    context.fillRect(foodPosition[0], foodPosition[1], snakeRectWidth, snakeRectHeight);
    context.strokeRect(foodPosition[0], foodPosition[1], snakeRectWidth, snakeRectHeight);
};
// 吃到食物
var eatFood = function() {
    //获取两个方块的中心点，两点的距离小于等于方块的宽即为相交
    var widthDifference = Math.pow(((foodPosition[0] + snakeRectWidth / 2) - (snakeArr[0][0] + snakeRectWidth / 2)), 2);
    var lengthDifference = Math.pow(((foodPosition[1] + snakeRectHeight / 2) - (snakeArr[0][1] + snakeRectHeight / 2)), 2);
    if (Math.sqrt(widthDifference + lengthDifference) < snakeRectWidth) {
        grade++;
        setFoodPosition();
        console.log(foodPosition);
        snakeArr.unshift([pointX, pointY]);
        addStep();
    }
};
var setFoodPosition = function() {
    var x = parseInt(Math.random() * canvas.width/10)*10,
        y = parseInt(Math.random() * canvas.height/10)*10;
    x>canvas.height - snakeRectWidth?x-=snakeRectWidth:x;
    y>canvas.height -snakeRectHeight?y-=snakeRectHeight:y;
    foodPosition = [x,y];
    console.log(foodPosition);
};
// 结束画面
var drawGameOver = function() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fff';
    context.textAlign="center";
    context.font='24px Arial';
    context.fillText('游戏结束', canvas.width/2, canvas.height/2-50);
    context.font='16px Arial';
    context.fillText('得分：' + grade, canvas.width/2, canvas.height/2);
};
// 游戏结束
var gameOver = function() {
    // 判断snake数组中有没有相同的数值，有则游戏失败
    for (var j = 0; j < snakeArr.length; j++) {
        for (var i = 0; i < snakeArr.length; i++) {
            if (i !== j && snakeArr[j][0] === snakeArr[i][0] && snakeArr[j][1] === snakeArr[i][1]) {
                clearInterval(gameStart);
                console.log('game over');
                drawGameOver();
            }
        }
    }
};
window.onload = function() {
    gameStart = setInterval(drawSnake,interval);
    // console.log(Math.random().toFixed(2) * canvas.width - snakeRectWidth);
};
// 监听键盘
document.onkeydown = function(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    // 不能回头
    switch (e.keyCode) {
        case keyLeft:
            if(keyCode !== keyRight) {
                keyCode = e.keyCode;
            }
            break;
        case keyUp:
            if(keyCode !== keyDown) {
                keyCode = e.keyCode;
            }
            break;
        case keyRight:
            if(keyCode !== keyLeft) {
                keyCode = e.keyCode;
            }
            break;
        case keyDown:
            if(keyCode !== keyUp) {
                keyCode = e.keyCode;
            }
            break;
    }
};
// 获取颜色反差值
var getColorContrast = function(color) {
    var colorArr = [];
    color = color.substring(1, color.length);
    for (i = 0; i < 3; i++) {
        if (parseInt('0x' + color.substring(i * 2, (i + 1) * 2)) > 128) {
            colorArr.push('0');
        } else {
            colorArr.push('225');
        }
    }
    return 'RGB(' + colorArr.join(',') + ')';
};