

window.addEventListener('load', function() {

    var canvas = document.getElementById("canvas")
    var width = canvas.width
    var height = canvas.height
    var ctx = canvas.getContext("2d")
 

    var blockGenerator = new BlockGenerator();
    var stats = new Stats(1);
    var gameState = "";

    var lines = 0;
    var score = 0;

    var row = 0;
    var col = 3;

    var block = blockGenerator.getBlock();
    var blockPosition = blockGenerator.getPosition();

    var targetStep = 50;
    var currentStep = 0;
    var forceRedraw = true;

    let grid = GRID;

    setPosition(0,3);

    function setPosition(row, col, val = 1) {
        // new object is created, reset block poisition
        block[blockPosition].map.forEach(function(value) {
            // todo math ?
            let tmpRow = value.row + row < 0 ? 0 : value.row + row;
            let tmpCol = value.col + col< 0 ? 0 :value.col + col;
            if (grid[tmpRow][tmpCol] == 2) {
                gameState = "GAMEOVER";
            }
            grid[tmpRow][tmpCol] = val;
        });

        if (val == 2) {
            blockPosition = blockGenerator.getPosition();
            block = blockGenerator.getBlock();
        }
    }

    function updateInput(progress) {
        // move is readed from inputListener
        if (move) {
            forceRedraw = true;
            setPosition(row,col, 0)
            if (move == "right" &&  !collidesWithRight(row, col, block[blockPosition])) {
                col +=1;
                move = null;
            }
            if (move == "left" && !collidesWithLeft(row, col, block[blockPosition])) {
                col -=1;
                move = null;
            }

            // TODO check collision s jinamz objektama a s hranou gridu
            if (move == "up") {
                console.log(blockPosition)
                blockPosition = block[blockPosition].nextIndex
                console.log(blockPosition)
                move = null;
            }

            if (move == "down") {
                if (!collidesWithBottom(row, col, block[blockPosition])) {
                    row +=1
                    stats.addScore(1);
                } else {
                    setPosition(row,col, 2);

               
                    row = 0;
                    col = 3;
                    // grid[row][col] = 1;
                    setPosition(row,col);
                    move = null;
                }
            }
            setPosition(row,col)
        }
    }


    function updateGame(progress) {
        if (targetStep == currentStep) {

            let rowsUpdated = updateRows(progress);
            
            currentStep = 0;
            setPosition(row + rowsUpdated, col, 0)
            
            // move down
            if (!collidesWithBottom(row, col, block[blockPosition])) {
                // grid[row][col] = 0
                row +=1

                setPosition(row,col);
                // grid[row][col] = 1;
                // this.console.log(grid)
            // colision with cube   
            } else {
                setPosition(row,col, 2);
      
                // create new block
                row = 0;
                col = 3;
                // grid[row][col] = 1;
                setPosition(row,col);
                move = null
            }

        } else {
            currentStep ++;
        }
    }

    function updateRows(progress) {

        var filledLines = [];

        for (var row = 0; row < grid.length; row++) {

            var line = 0;
            for (var col = 0; col < grid[row].length; col++) {
                if (grid[row][col] == 2) {
                    line++;
                } else {
                    break;
                }            
            }

            if (line == GRID_WIDTH) {
                filledLines.push(row);
            }
        }

    
        filledLines.forEach(function(line) {
            grid.splice(line,1)
            grid.unshift(new Array(GRID_WIDTH).fill(0))
        });
        let lastLevel = stats.getLevel(); 
        stats.addLines(filledLines.length);
        stats.addScore(filledLines.length * filledLines.length * 1000)
        if (lastLevel != stats.getLevel()) {
            targetStep -= 5; 
        }
        return filledLines.length;
    }

    function update(progress) {
        if (gameState == "GAMEOVER") {
            return;
        }
        updateInput(progress);

        updateGame(progress);
    }

    function draw() {
        if (currentStep == 0 || forceRedraw) {
            forceRedraw = false
            ctx.clearRect(0, 0, width, height)

            for (var row = 0; row < grid.length; row++) {
                for (var col = 0; col < grid[row].length; col++) {
                    if (grid[row][col] == 1) {
                        ctx.fillStyle = "#000000"; // black
                        ctx.fillRect(col * GRID_BLOCK_SIZE, row * GRID_BLOCK_SIZE, GRID_BLOCK_SIZE, GRID_BLOCK_SIZE);
                    } else if (grid[row][col] == 2) {
                        ctx.fillStyle = "#FFF000"; // yellow
                        ctx.fillRect(col * GRID_BLOCK_SIZE, row * GRID_BLOCK_SIZE, GRID_BLOCK_SIZE, GRID_BLOCK_SIZE);
                    } else {
                        // ctx.fillStyle = "#AAA000"; // yellow
                        // ctx.fillRect(col * GRID_BLOCK_SIZE, row * GRID_BLOCK_SIZE, GRID_BLOCK_SIZE, GRID_BLOCK_SIZE);
                    }
                
                }
            } 

            ctx.rect(GRID_WIDTH_START * GRID_BLOCK_SIZE, GRID_HEIGHT_START * GRID_BLOCK_SIZE, GRID_WIDTH_END * GRID_BLOCK_SIZE, GRID_HEIGHT_END * GRID_BLOCK_SIZE);
            ctx.stroke();

            stats.drawScore(ctx, 30, 300);
            stats.drawLines(ctx, 90, 300);
            stats.drawLevel(ctx, 160, 300);
            blockGenerator.drawNextBlock(ctx, 300, 300)
        }

        if (gameState == "GAMEOVER") {
            ctx.fillStyle = "#000000";
            ctx.font = "80px Arial";
            ctx.fillText("Game over", 200, 200);
        }

        if (gameState == "PAUSE") {
            ctx.fillStyle = "#000000";
            ctx.font = "80px Arial";
            ctx.fillText("Pause", 200, 200);
        }
      
    }

    // GAME LOOP
    function loop(timestamp) {
        var progress = timestamp - lastRender

        update(progress)
        draw()

        lastRender = timestamp
        window.requestAnimationFrame(loop)
    }
    var lastRender = 0
    window.requestAnimationFrame(loop)
});