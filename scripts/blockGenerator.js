class BlockGenerator {

    blocks = [line, triangle, rightL, leftL, esL, esR, cube];

    block;
    position;

    constructor() {
        this.block = this.generateRangomBlock();
        this.position = this.generateRangomBlockPosition()
    }

    getBlock() {
        let currentBlock = this.block;
        this.block = this.generateRangomBlock();
        return currentBlock;
    }

    getPosition() {
        let currentPosition = this.position;
        this.position = this.generateRangomBlockPosition();
        return currentPosition;
    }

    generateRangomBlock() {
        return this.blocks[Math.floor(Math.random() * this.blocks.length)];
    }

    generateRangomBlockPosition() {
        return Math.floor(Math.random() * this.block.length);
    }

    readNextBlock() {
        return this.block;
    }

    readNextPosition() {
        return this.position;
    }

    drawNextBlock(ctx, row, col) {
        ctx.fillStyle = "#000000";
        ctx.font = "30px Arial";
        ctx.fillText("Next block", col, row - 50);
        this.block[this.position].map.map(function(part) {
            ctx.fillStyle = "#000000"; // black
            ctx.fillRect(col + 50 + (part.col * GRID_BLOCK_SIZE), row + (part.row * GRID_BLOCK_SIZE), GRID_BLOCK_SIZE, GRID_BLOCK_SIZE);
        });
    }

}
