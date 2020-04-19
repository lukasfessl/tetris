class Game {

    grid;
    blockGenerator;
    stats;
    row;
    col;
    block;
    blockPosition;
    targetStep;
    currentStep;
    forceRedraw;
    gameState;
    pause;

    constructor(grid) {
        this.grid = grid;
        this.blockGenerator = new BlockGenerator();
        this.stats = new Stats(1);

        this.row = 0;
        this.col = 4;

        this.block = this.blockGenerator.getBlock();
        this.blockPosition = this.blockGenerator.getPosition();

        this.targetStep = 50;
        this.currentStep = 0;
        this.forceRedraw = true;
        this.gameState = "GAME"
        this.pause = false;

        this.setPosition(this.row, this.col);
    }

    setPosition(row, col, val = 1) {
        for (let part of this.block.data[this.blockPosition].map) {
            let tmpRow = part.row + row < 0 ? 0 : part.row + row;
            let tmpCol = part.col + col < 0 ? 0 : part.col + col;
            if (this.grid[tmpRow][tmpCol] >= 10) {
                this.gameState = "GAMEOVER";
            }
            this.grid[tmpRow][tmpCol] = val;
        }

        if (val >= 10) {
            this.blockPosition = this.blockGenerator.getPosition();
            this.block = this.blockGenerator.getBlock();
        }
    }

    persistBlock (row, col) {
        this.setPosition(row, col, this.block.name);
    }

    updateInput(delta) {
        // move is readed from inputListener
        if (move) {
            this.forceRedraw = true;
            this.setPosition(this.row, this.col, 0)
            if (move == "right" && !collidesWithRight(this.row, this.col, this.block.data[this.blockPosition])) {
                this.col += 1;
                move = null;
            }
            if (move == "left" && !collidesWithLeft(this.row, this.col, this.block.data[this.blockPosition])) {
                this.col -= 1;
                move = null;
            }

            // TODO check collision s jinamz objektama a s hranou gridu
            if (move == "up") {
                this.blockPosition = this.block.data[this.blockPosition].nextIndex
                move = null;
            }

            if (move == "down") {
                if (!collidesWithBottom(this.row, this.col, this.block.data[this.blockPosition])) {
                    this.row += 1
                    this.stats.addScore(1);
                } else {
                    this.persistBlock(this.row, this.col);
                    // create new block
                    this.row = 0;
                    this.col = 4;
                    this.setPosition(this.row, this.col);
                    move = null;
                }
            }
            this.setPosition(this.row, this.col)
        }
    }

    updateGame(delta) {
        if (this.targetStep == this.currentStep) {
            // clear lins
            let rowsUpdated = this.updateRows(delta);
            this.currentStep = 0;
            this.setPosition(this.row + rowsUpdated, this.col, 0)
            // move down
            if (!collidesWithBottom(this.row, this.col, this.block.data[this.blockPosition])) {
                this.row += 1
                this.setPosition(this.row, this.col);
                // colision with cube   
            } else {
                this.persistBlock(this.row, this.col);
                // create new block
                this.row = 0;
                this.col = 4;
                this.setPosition(this.row, this.col);
                move = null
            }
        } else {
            this.currentStep++;
        }
    }

    updateRows(delta) {
        var filledLines = [];
        // count lines to clear
        for (var row = 0; row < grid.length; row++) {
            var line = 0;
            for (var col = 0; col < grid[row].length; col++) {
                if (grid[row][col] >= 10) {
                    line++;
                } else {
                    break;
                }
            }

            if (line == GRID_WIDTH) {
                filledLines.push(row);
            }
        }
        // clear lines
        for (let line of filledLines) {
            this.grid.splice(line, 1)
            this.grid.unshift(new Array(GRID_WIDTH).fill(0))
        }
        // update stats
        let lastLevel = this.stats.getLevel();
        this.stats.addLines(filledLines.length);
        this.stats.addScore(filledLines.length * filledLines.length * 1000)
        if (lastLevel != this.stats.getLevel()) {
            this.targetStep -= 5;
        }
        return filledLines.length;
    }


    // update method
    update(delta) {
        if (this.gameState == "GAMEOVER") {
            return;
        }
        this.updateInput(delta);
        this.updateGame(delta);
    }


    drawBlocks(ctx, col, row, color) {
        ctx.fillStyle = "black";
        ctx.fillRect(col * GRID_BLOCK_SIZE, row * GRID_BLOCK_SIZE, GRID_BLOCK_SIZE, GRID_BLOCK_SIZE);

        // var gradient = ctx.createRadialGradient(col * GRID_BLOCK_SIZE, row * GRID_BLOCK_SIZE + 25, 11, col * GRID_BLOCK_SIZE + 30, row * GRID_BLOCK_SIZE + 30, 45);
        // gradient.addColorStop(0, color);
        // gradient.addColorStop(1, "white");

        ctx.fillStyle = color;
        ctx.fillRect(col * GRID_BLOCK_SIZE + 1, row * GRID_BLOCK_SIZE + 1, GRID_BLOCK_SIZE - 2 , GRID_BLOCK_SIZE - 2);
    }

    // draw method
    draw(ctx, width, height) {

        if (this.currentStep == 0 || this.forceRedraw) {
            this.forceRedraw = false
            ctx.clearRect(0, 0, width, height)
            

            for (var row = 0; row < grid.length; row++) {
                for (var col = 0; col < grid[row].length; col++) {
                    if (grid[row][col] >= 10 || grid[row][col] == 1) {
                        this.drawBlocks(ctx, col, row, resolverBlockColor(grid[row][col]));
                    }
                }
            }

            this.stats.drawScore(ctx, 50, 300);
            this.stats.drawLines(ctx, 110, 300);
            this.stats.drawLevel(ctx, 180, 300);
            this.blockGenerator.drawNextBlock(ctx, 300, 300)
        }

        if (this.gameState == "GAMEOVER") {
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "80px Arial";
            ctx.fillText("Game over", 30, 250);
        }

        if (this.gameState == "PAUSE") {
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "80px Arial";
            ctx.fillText("Pause", 30, 250);
        }
        
        ctx.rect(GRID_WIDTH_START * GRID_BLOCK_SIZE, GRID_HEIGHT_START * GRID_BLOCK_SIZE, GRID_WIDTH_END * GRID_BLOCK_SIZE, GRID_HEIGHT_END * GRID_BLOCK_SIZE);
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();

    }

    isPause() {
        if (this.gameState == "GAMEOVER") {
            return true;
        }
    }

}