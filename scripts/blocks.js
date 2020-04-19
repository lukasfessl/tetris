


let BlocksEnum = { line: 10, triangle: 11, rightL: 12, leftL:13, esL: 14, esR: 15, cube: 16 }


line = {
    name: BlocksEnum.line,
    data: [
        { nextIndex: 1, map: [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }] },
        { nextIndex: 2, map: [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }] },
        { nextIndex: 3, map: [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }] },
        { nextIndex: 0, map: [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }] }
    ]
}

triangle = {
    name: BlocksEnum.triangle,
    data: [
        { nextIndex: 1, map: [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: -1, col: 0 }] },
        { nextIndex: 2, map: [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 0, col: 1 }] },
        { nextIndex: 3, map: [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }] },
        { nextIndex: 0, map: [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 0, col: -1 }] }
    ]
}

rightL = {
    name: BlocksEnum.rightL,
    data: [
        { nextIndex: 1, map: [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: 1 }] },
        { nextIndex: 2, map: [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: -1 }] },
        { nextIndex: 3, map: [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: -1, col: -1 }] },
        { nextIndex: 0, map: [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: -1, col: 1 }] },
    ]
}

leftL = {
    name: BlocksEnum.leftL,
    data: [
        { nextIndex: 1, map: [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: -1 }] },
        { nextIndex: 2, map: [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: -1, col: -1 }] },
        { nextIndex: 3, map: [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: -1, col: 1 }] },
        { nextIndex: 0, map: [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 1 }] },
    ]
}

esR = {
    name: BlocksEnum.esR,
    data: [
        { nextIndex: 1, map: [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 1 }] },
        { nextIndex: 2, map: [{ row: 0, col: 1 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: -1 }] },
        { nextIndex: 3, map: [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 1 }] },
        { nextIndex: 0, map: [{ row: 0, col: 1 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: -1 }] },
    ]
}

esL = {
    name: BlocksEnum.esL,
    data: [
        { nextIndex: 1, map: [{ row: -1, col: 1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }] },
        { nextIndex: 2, map: [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: 1 }] },
        { nextIndex: 1, map: [{ row: -1, col: 1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }] },
        { nextIndex: 2, map: [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: 1 }] },
    ]
}

cube = {
    name: BlocksEnum.cube,
    data: [
        { nextIndex: 1, map: [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 }] },
        { nextIndex: 1, map: [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 }] },
        { nextIndex: 1, map: [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 }] },
        { nextIndex: 1, map: [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 }] },
    ]
}
