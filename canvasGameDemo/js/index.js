var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    floorColor='yellowgreen';
    floorPosition = [100,100,100,30];
function drawFloor() {
    ctx.fillStyle = floorColor;
    ctx.fillRect(...floorPosition);
}
function drawBall() {
    let radgrad = ctx.createRadialGradient(45,45,10,52,50,30);
    radgrad.addColorStop(0, '#A7D30C');
    radgrad.addColorStop(0.9, '#019F62');
    radgrad.addColorStop(1, 'rgba(1,159,98,0)');
    ctx.fillStyle = radgrad;
    ctx.arc(45,45,50,0,Math.PI*2,true);
    ctx.fill();
}
function ballJump() {
    if (ballPosition[1] > 0) {
        ballPosition[1] -= speed;
    }
}
function loadBg() {
    let img = new Image;
    img.src = './img/bg.png';
    img.onload = ()=>{
        ctx.drawImage(img,0,0,600,400);
        drawBall();
        drawFloor();
    }
}
function draw() {
    loadBg();
}
function init() {
    window.requestAnimationFrame(draw)
}
init();