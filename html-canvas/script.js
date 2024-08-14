let px = 200, py = 290, pwidth = 40, pheight = 5;
let bx = 100, by = 100, bwidth = 10, bvx = 1, bvy = 1;
let rightPressed = false, leftPressed = false, upPressed = false, downPressed = false;
let rightJustPressed = false, leftJustPressed = false, upJustPressed = false, downJustPressed = false;
window.onload = function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    window.requestAnimationFrame(draw);
}

function draw() {
    const ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.clearRect(0,0,400,300);
    if (rightPressed == true){
        px += 2;
    } else if (leftPressed == true) {
        px -= 2;
    }

    ctx.beginPath();
    ctx.fillRect(px,py, pwidth, pheight);
    ctx.stroke();

    if (px < 5) {
        px = 5;
    } else if (px > 355) {
        px = 355;
    }

    ctx.beginPath();
    ctx.fillRect(bx,by,bwidth,bwidth);
    ctx.stroke();

    bx += bvx;
    by += bvy;

    if (collision(px,py,pwidth,pheight,bx,by,bwidth,bwidth)) {
        console.log("collided");
        bvx = bvx * -1;
        bvy = bvy * -1;
    }
    
    window.requestAnimationFrame(draw);
}

function collision(ax,ay,aw,ah,bx,by,bw,bh) {
    if ((ax < (bx + bw)) && (ay < (bx + bh)) && (bx < (ax + aw)) && (by < (ay + ah))) {
        return true;
    }
}

function left(){
    px = px - 1;
}
function right(){
    px = px + 1;
}
function keyDownHandler(event) {

    if (event.code == "ArrowRight") {
        rightPressed = true;
        rightJustPressed = true;
    } else if (event.code == "ArrowLeft") {
        leftPressed = true;
        leftJustPressed = true;
    }

    if (event.code == "ArrowUp") {
        upPressed = true;
        upJustPressed = true;
    } else if (event.code == "ArrowDown") {
        downPressed = true;
        downJustPressed = true;
    }

}

function keyUpHandler(event) {

    if (event.code == "ArrowRight") {
        rightPressed = false;
    } else if (event.code == "ArrowLeft") {
        leftPressed = false;
    }

    if (event.code == "ArrowUp") {
        upPressed = false;
    } else if (event.code == "ArrowDown") {
        downPressed = false;
    }

}
