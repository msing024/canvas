let rightPressed = false, leftPressed = false, upPressed = false, downPressed = false;
let rightJustPressed = false, leftJustPressed = false, upJustPressed = false, downJustPressed = false;
let rows = 22, cols = 10, blockSize = 25, output={};
class Board {
    constructor(){
        this.grid = []
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
        for (var i=0; i<3; i++){ // rows
            for (var j=0; j<3; j++){ // cols
                let value = p.shape[i][j];
                let x = p.x + j;
                let y = p.y + i;
                let grid = this.grid;
                if (value != 0) {
                    console.log(y);
                }
                 // note to self: if you have time later clean this area up.
                if (grid[y] == undefined){
                    if (value != 0){
                        return false;
                    }
                } else{
                    let boardVal = grid[y][x];
                    
                    if (value != 0){
                        if (boardVal == undefined){
                            return false;
                            
                        }
                    }
                }
                
            }
        }
        return true;
    }

    rotation(p){
        let clone = {...p};

        for (let y = 0; y < clone.shape.length; y++) {
            for (let x = 0; x < y; x++) {
              [clone.shape[x][y], clone.shape[y][x]] = 
              [clone.shape[y][x], clone.shape[x][y]];
            }
          }

          clone.shape.forEach(row => row.reverse());
          output = clone;
    }

    
}
class Piece {
    constructor(ctx){
        this.ctx = ctx;
        this.shape = [
            [1,0,0],
            [1,1,1],
            [0,0,0]
        ];
        this.x = 2;
        this.y = 2;
    }

    draw(){
        this.shape.forEach((row,ry) => {
            row.forEach((val, rx) => {
                if (val > 0) {
                    this.ctx.fillRect(this.x + rx, this.y + ry, 1,1)
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

 }
 
window.onload = function() {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    setup(ctx);
    let board = new Board();
    board.setupGrid();
    console.table(board.grid);
    
    
    let piece = new Piece(ctx);
    window.requestAnimationFrame(draw1);

    function draw1() {

        const ctx = document.getElementById("myCanvas").getContext("2d");
        ctx.clearRect(0,0,250,550);
        
        
        
        if (rightJustPressed){
            let p = {...piece};
            p.x = p.x + 1;
            if (board.validation(p)){
                console.log("validated");
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
            let d = {...piece};
            d = board.rotation(d);
            console.log(board.validation(d));
            if (board.validation(d)){
              //  piece.shape = d.shape;
                console.log("RAN!!")
            }
        }

        piece.draw();
        rightJustPressed = false;
        leftJustPressed = false;
        upJustPressed = false;
        downJustPressed = false;
        window.requestAnimationFrame(draw1);
    }
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

function collision(ax,ay,aw,ah,bx,by,bw,bh) {
    if ((ax < (bx + bw)) && (ay < (bx + bh)) && (bx < (ax + aw)) && (by < (ay + ah))) {
        return true;
    }
}

function setup(ctx){
    //Fills the board with zeros
    //for (i=0;i<rows;i++){
   //     ;
   //  }
     ctx.scale(blockSize,blockSize);
     //sets up a piece class
     

}
