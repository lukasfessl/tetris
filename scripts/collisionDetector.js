
var grid = GRID;

function collidesWithBottom(rowOffset, colOffset, block) {
    var colliding = false;
    block.map.forEach(function (value) {
        // check out of the grid or check collision with another block
        if (value.row + rowOffset + 1 >= GRID_HEIGHT) {
            colliding = true;
        } else if (grid[value.row + rowOffset + 1][value.col + colOffset] >= 10) {
            colliding = true;
        }
    });
    return colliding;
}

function collidesWithLeft(row, col, block) {
    var colliding = false;
    block.map.forEach(function (value) {
        if (value.col + col - 1 < 0) {
            colliding = true;
        } else {
            var countRow = value.row + row < 0 ? 0 : value.row + row;
            if (grid[countRow][value.col + col - 1] >= 10) {
                colliding = true;
            }
        }

    });
    return colliding;
}

function collidesWithRight(row, col, block) {
    var colliding = false;
    block.map.forEach(function (value) {
        if (value.col + col + 1 >= GRID_WIDTH) {
            colliding = true;
        } else {
            var countRow = value.row + row < 0 ? 0 : value.row + row;
            if (grid[countRow][value.col + col + 1] >= 10) {
                colliding = true;
            }
        }

    });
    return colliding;
}

function countOutside(row, col, block) {
    let colMin = 0
    let colMax = GRID_WIDTH;
    block.map.forEach(function (value) {
        if (value.col + col < colMin) {
            colMin = value.col + col;
        } 
        if (value.col + col + 1 > colMax) {
            colMax = value.col + col + 1;
        }
    });
    return colMin < 0 ? colMin : (colMax != GRID_WIDTH ? (colMax - GRID_WIDTH) : 0);
}

function canRotate(row, col, block) {
    for (let part of block.map) {
        var countRow = part.row + row < 0 ? 0 : part.row + row;
        if (part.row + row >= GRID_HEIGHT) {
            return false;
        }
        if (grid[countRow][part.col + col] >= 10) {
            return false;
        }
    }
    return true;
}