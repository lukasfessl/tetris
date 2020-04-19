
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