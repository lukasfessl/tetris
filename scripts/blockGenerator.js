class BlockGenerator {

    blocks = [line, triangle, rightL, leftL, esL, esR, cube];

    block;
    position;

    constructor() {
        this.block = this.generateRandomBlock();
        this.position = this.generateRandomBlockPosition()
    }

    getBlock() {
        let currentBlock = this.block;
        this.block = this.generateRandomBlock();
        return currentBlock;
    }

    getPosition() {
        let currentPosition = this.position;
        this.position = this.generateRandomBlockPosition();
        return currentPosition;
    }

    generateRandomBlock() {
        return this.blocks[Math.floor(Math.random() * this.blocks.length)];
    }

    generateRandomBlockPosition() {
        return Math.floor(Math.random() * this.block.data.length);
    }

    readNextBlock() {
        return this.block;
    }

    readNextPosition() {
        return this.position;
    }

    drawNextBlock(ctx, row, col) {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "30px Arial";
        ctx.fillText("Next block", col, row - 50);
        for (let part of this.block.data[this.position].map) {
            ctx.fillStyle = "black";
            ctx.fillRect(col * GRID_BLOCK_SIZE, row * GRID_BLOCK_SIZE, GRID_BLOCK_SIZE, GRID_BLOCK_SIZE);
            ctx.fillStyle = resolverBlockColor(this.block.name);
            ctx.fillRect(col + 50 + (part.col * GRID_BLOCK_SIZE) + 1, row + (part.row * GRID_BLOCK_SIZE) + 1, GRID_BLOCK_SIZE - 2, GRID_BLOCK_SIZE - 2);
        }
     
    }

}
