let rightPressed = false, leftPressed = false, upPressed = false, downPressed = false;
let rightJustPressed = false, leftJustPressed = false, upJustPressed = false, downJustPressed = false, spaceJustPressed = false;
let rows = 22, cols = 10, blockSize = 25, fallTimer = 0, samePosCounter = 0, prevX, prevY, stopped = false;
let timerVal = 10, score = 0, linesClearedatOnce = 0;
let startPosX = 3, startPosY = -3;
class Board {
    constructor(ctx){
        this.grid = []
        this.ctx = ctx;
    }
    setupGrid(){
        for (var i=0;i<rows;i++){
            this.grid.push([0,0,0,0,0,0,0,0,0,0]);
        }
    }
    resetGrid(){
        for(var i=0;i<rows;i++){
            for(var j=0;j<cols;j++){
                this.grid[i][j] = 0;
            }
        }
    }

    validation(p){
        let height = p.shape.length;
        for (var i=0; i<height; i++){ // rows
            for (var j=0; j<height; j++){ // cols
                let value = p.shape[i][j];
                let x = p.x + j;
                let y = p.y + i;
                let grid = this.grid;
                if (y<0){
                    let fakeRow = [0,0,0,0,0,0,0,0,0,0];
                    let boardVal = fakeRow[x];
                    
                    if (value != 0){
                        if (boardVal == undefined){
                            return false;
                        } else if (boardVal > 0){
                            return false;
                        }
                    }
                } else {
                if (grid[y] == undefined){
                    if (value != 0){
                        return false;
                    }
                } else{
                    let boardVal = grid[y][x];
                    
                    if (value != 0){
                        if (boardVal == undefined){
                            return false;
                        } else if (boardVal > 0){
                            return false;
                        }
                    }
                }
                }
            }
        }
        return true;
    }

    imprint(p){

        let height = p.shape.length;
        for (var i=0; i<height; i++){ // rows
            for (var j=0; j<height; j++){ // cols
                let value = p.shape[i][j];
                let x = p.x + j;
                let y = p.y + i;
                if (y<0){
                    if (y<-1){
                        console.log("lost the game");
                    }
                } else {
                    if (value != 0){
                        this.grid[y][x] = p.number;
                    }   
                }
            }
        }
    }

    draw(){
        for (var i=0; i<rows; i++){
            for (var j=0; j<cols; j++){
                let val = this.grid[i][j];
                this.ctx.fillStyle = colors[val];
                if (val > 0){
                    this.ctx.fillRect(j, i, 1,1);
                }
            }
        }
    }

    clearLines(){
        for (var i=0; i<rows; i++){
            let filledCounter = 0
            for (var j=0; j<cols; j++){
                let val = this.grid[i][j];
                if (val > 0){
                    filledCounter = filledCounter + 1;
                }
            }
            if (filledCounter == 10){
                linesClearedatOnce = linesClearedatOnce + 1;
                this.grid[i] = [0,0,0,0,0,0,0,0,0,0];
                for (var x = i-1; x > 0; x--){
                    let currentGrid = this.grid[x];
                    this.grid[x+1] = currentGrid;
                }
            }
        }
    }
}

// matrix rotation algorithms source: https://stackoverflow.com/questions/15170942/how-to-rotate-a-matrix-in-an-array-in-javascript
function rotateMatrixClockwise(matrix){
    return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
}
function rotateMatrixCounterClockwise(matrix){
    return matrix[0].map((val, index) => matrix.map(row => row[row.length-1-index]));
}

const pieceShapes = [
    [[0,0,0],
     [0,0,0],
     [0,0,0]], // Empty box.
    [[1,0,0],
     [1,1,1],
     [0,0,0]], // J piece
    [[0,2,0,0],
     [0,2,0,0],
     [0,2,0,0],
     [0,2,0,0]], // Line piece
    [[0,3,0],
     [3,3,3],
     [0,0,0]], // T piece
    [[0,0,0],
     [0,4,4],
     [4,4,0]], // S piece
    [[0,0,0],
     [5,5,0],
     [0,5,5]], // Z piece
    [[0,0,6],
     [6,6,6],
     [0,0,0]], // L piece
    [[0,0,0],
     [7,7,0],
     [7,7,0]], // Square piece
]

const colors = [
    "blank",
    "blue",
    "lightblue",
    "purple",
    "green",
    "red",
    "orange",
    "yellow",
]
class Piece {
    constructor(ctx){
        this.ctx = ctx;
        this.number = OnetoSevenRand();
        this.shape = pieceShapes[this.number];
        this.x = startPosX;
        this.y = startPosY;
        this.prevX = this.x;
        this.prevY = this.y;
    }

    draw(){
        this.shape.forEach((row,ry) => {
            row.forEach((val, rx) => {
                this.ctx.fillStyle = colors[this.number];
                if (val > 0) {
                    this.ctx.fillRect(this.x + rx, this.y + ry, 1,1);
                }
            });
        });
    }

    move(ax,ay){
        this.x = this.x + ax;
        this.y = this.y + ay;
    }

    copy(p){
        this.x = p.x;
        this.y = p.y
    }

    updatePrevVal(){
        this.prevX = this.x;
        this.prevY = this.y;
    }

    reset(){
        this.number = OnetoSevenRand();
        this.shape = pieceShapes[this.number];
        this.x = startPosX;
        this.y = startPosY;
    }
 }
 
window.onload = function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    let scoreText = document.getElementById("scoreText");
    scoreText.innerHTML = "Test";
    setup(ctx);
    let board = new Board(ctx);
    board.setupGrid();
    console.table(board.grid);

    let piece = new Piece(ctx);
    prevShape = piece.shape;

    timer = timerVal;
    timeoutTimer = timer * 1.5;
    window.requestAnimationFrame(draw1);

    function draw1() {

        const ctx = document.getElementById("myCanvas").getContext("2d");
        ctx.clearRect(0,0,250,550);
        
        
        
        if (rightJustPressed){
            let p = {...piece};
            p.x = p.x + 1;
            if (board.validation(p)){
                piece.move(1,0);
            }

        } else if (leftJustPressed){
            let p = {...piece};
            p.x = p.x - 1;
            if (board.validation(p)){
                piece.move(-1,0);
            }
            
        }

        if (downJustPressed){
            let p = {...piece};
            p.y = p.y + 1;
            if (board.validation(p)){
                piece.move(0,1);
            }
        }

        if (upJustPressed){
          let p = {...piece};
          p.shape = rotateMatrixCounterClockwise(p.shape);
          if (board.validation(p)) {
            piece.shape = rotateMatrixClockwise(piece.shape);
          } else {
            p.y = p.y - 1;
            if (board.validation(p)){
                piece.y = piece.y - 1;
                piece.shape = rotateMatrixClockwise(piece.shape);
            }
          }
        }
        
        if (spaceJustPressed){
            let p = {...piece};
            while(board.validation(p)){
                p.y = p.y + 1
            }
            p.y = p.y-1;
            piece.y = p.y;
            board.imprint(piece);
            samePosCounter = 0;
            piece.reset();
        }

        if (timer > 0){
            timer = timer - 1;
        } else {
            let p = {...piece};
            p.y = p.y + 1;
            if (board.validation(p)){
                piece.move(0,1);
            }
            timer = timerVal;
        } 

        if(piece.prevY != piece.y){
            samePosCounter = 0;
        } else if (piece.prevX == piece.x && piece.prevY == piece.y){
            if(stopped == false){
                samePosCounter = samePosCounter + 1;
            }
        }

        if (samePosCounter > (timeoutTimer)) {
            board.imprint(piece);
            samePosCounter = 0;
            piece.reset();
            
        }
        board.draw();
        piece.draw();
        board.clearLines();
        if (linesClearedatOnce > 0){
            score = score + (linesClearedatOnce ** 2) * 100;
        }
        scoreText.innerHTML = score;
        linesClearedatOnce = 0; 
        justPressedReset();
        piece.updatePrevVal();
        window.requestAnimationFrame(draw1);
    }
}

function keyDownHandler(event) {

    if (event.code == "ArrowRight" || event.code == "KeyD") {
        rightPressed = true;
        rightJustPressed = true;
    } else if (event.code == "ArrowLeft" || event.code == "KeyA") {
        leftPressed = true;
        leftJustPressed = true;
    }

    if (event.code == "ArrowUp" || event.code == "KeyW") {
        upPressed = true;
        upJustPressed = true;
    } else if (event.code == "ArrowDown" || event.code == "KeyS") {
        downPressed = true;
        downJustPressed = true;
    }

    if (event.code == "Space"){
        spaceJustPressed = true;
    }
}

function keyUpHandler(event) {

    if (event.code == "ArrowRight" || event.code == "KeyD") {
        rightPressed = false;
    } else if (event.code == "ArrowLeft" || event.code == "KeyA") {
        leftPressed = false;
    }

    if (event.code == "ArrowUp" || event.code == "KeyW") {
        upPressed = false;
    } else if (event.code == "ArrowDown" || event.code == "KeyS") {
        downPressed = false;
    }

}

function collision(ax,ay,aw,ah,bx,by,bw,bh) {
    if ((ax < (bx + bw)) && (ay < (bx + bh)) && (bx < (ax + aw)) && (by < (ay + ah))) {
        return true;
    }
}

function setup(ctx){
    ctx.scale(blockSize,blockSize);
}

function OnetoSevenRand(){  
    let rand = Math.round(Math.random()*10 + 1);
    while (rand>7){
        rand = Math.round(Math.random()*10 + 1);
    }
    return rand;
}

function justPressedReset(){
    rightJustPressed = false;
    leftJustPressed = false;
    upJustPressed = false;
    downJustPressed = false;
    spaceJustPressed = false;
}