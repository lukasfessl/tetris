
function resolverBlockColor(block) {
    switch(block) {
        case 1:
            return "#FFD700";
        case BlocksEnum.line:
            return "#DAA520";
        case BlocksEnum.triangle:
            return "#FFA500";
        case BlocksEnum.leftL:
            return "#FF8C00";
        case BlocksEnum.rightL:
            return "#CD853F";
        case BlocksEnum.esL:
            return "#D2691E";
        case BlocksEnum.esR:
            return "#8B4513";
        case BlocksEnum.cube:
            return "#A0522D";
        default:
          // code block
      }
}