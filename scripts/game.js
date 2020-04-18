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

    constructor(grid) {
        this.grid = grid;
        this.blockGenerator = new BlockGenerator();
        this.stats = new Stats(1);

        this.row = 0;
        this.col = 3;

        this.block = this.blockGenerator.getBlock();
        this.blockPosition = this.blockGenerator.getPosition();

        this.targetStep = 50;
        this.currentStep = 0;
        this.forceRedraw = true;
        this.gameState = "GAME"

        this.setPosition(0, 3);
    }

    setPosition(row, col, val = 1) {
        for (let part of this.block[this.blockPosition].map) {
            let tmpRow = part.row + row < 0 ? 0 : part.row + row;
            let tmpCol = part.col + col < 0 ? 0 : part.col + col;
            if (this.grid[tmpRow][tmpCol] == 2) {
                this.gameState = "GAMEOVER";
            }
            this.grid[tmpRow][tmpCol] = val;
        }

        if (val == 2) {
            this.blockPosition = this.blockGenerator.getPosition();
            this.block = this.blockGenerator.getBlock();
        }
    }

    updateInput(delta) {
        // move is readed from inputListener
        if (move) {
            this.forceRedraw = true;
            this.setPosition(this.row, this.col, 0)
            if (move == "right" && !collidesWithRight(this.row, this.col, this.block[this.blockPosition])) {
                this.col += 1;
                move = null;
            }
            if (move == "left" && !collidesWithLeft(this.row, this.col, this.block[this.blockPosition])) {
                this.col -= 1;
                move = null;
            }

            // TODO check collision s jinamz objektama a s hranou gridu
            if (move == "up") {
                this.blockPosition = this.block[this.blockPosition].nextIndex
                move = null;
            }

            if (move == "down") {
                if (!collidesWithBottom(this.row, this.col, this.block[this.blockPosition])) {
                    this.row += 1
                    this.stats.addScore(1);
                } else {
                    this.setPosition(this.row, this.col, 2);


                    this.row = 0;
                    this.col = 3;
                    // grid[row][col] = 1;
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
            if (!collidesWithBottom(this.row, this.col, this.block[this.blockPosition])) {
                this.row += 1
                this.setPosition(this.row, this.col);
                // colision with cube   
            } else {
                this.setPosition(this.row, this.col, 2);
                // create new block
                this.row = 0;
                this.col = 3;
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
                if (grid[row][col] >= 2) {
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


    // draw method
    draw(ctx, width, height) {
        if (this.currentStep == 0 || this.forceRedraw) {
            this.forceRedraw = false
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

            this.stats.drawScore(ctx, 30, 300);
            this.stats.drawLines(ctx, 90, 300);
            this.stats.drawLevel(ctx, 160, 300);
            this.blockGenerator.drawNextBlock(ctx, 300, 300)
        }

        if (this.gameState == "GAMEOVER") {
            ctx.fillStyle = "#000000";
            ctx.font = "80px Arial";
            ctx.fillText("Game over", 200, 200);
        }

        if (this.gameState == "PAUSE") {
            ctx.fillStyle = "#000000";
            ctx.font = "80px Arial";
            ctx.fillText("Pause", 200, 200);
        }

    }

}