class Stats {

    score;
    lines;
    level;
    linesToNextLevel;

    constructor(level) {
        this.score = 0;
        this.lines = 0;
        this.level = level;
        this.linesToNextLevel = 5;
    }

    addScore(score) {
        this.score += score;
    }

    addLines(lines) {
        this.lines += lines;
        this.level = (this.lines / this.linesToNextLevel).toFixed(0);
    }

    getLevel() {
        return this.level;
    }

    drawLines(ctx, row, col) {
        ctx.fillStyle = "#000000";
        ctx.font = "30px Arial";
        ctx.fillText("Lines: " + this.lines, col, row);
    }

    drawScore(ctx, row, col) {
        ctx.fillStyle = "#000000";
        ctx.font = "30px Arial";
        ctx.fillText("Score: " + this.score, col, row);
    }

    drawLevel(ctx, row, col) {
        ctx.fillStyle = "#000000";
        ctx.font = "30px Arial";
        ctx.fillText("Level: " + this.level, col, row);
    }

}