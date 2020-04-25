
function resolverBlockColor(block, level) {

    if (localStorage.getItem('colors') == 'disabled') {
        var index = 0;
    } else {
        var colors = 8; 
        var index = Math.floor(level / 2 - 1) % colors;
        index = index < 0 ? 0 : index;
    }
    

    switch(block) {
        // GOLD, GREEN, BLUE, RED, PURPLE, ORANGE, MAROON, PINK
        // https://www.rapidtables.com/web/color/pink-color.html
        case 1:
            return ["#FFD700", "#228B22", "#E9967A", "#DDA0DD", "#FF7F50", "#800000", "#C71585", "#B0E0E6"][index];
        case BlocksEnum.line:
            return ["#DAA520", "#008000", "#CD5C5C", "#DA70D6", "#FF6347", "#8B0000", "#FF69B4", "#87CEFA"][index];
        case BlocksEnum.triangle:
            return ["#FFA500", "#006400", "#B22222", "#BA55D3", "#FF4500", "#800000", "#C71585", "#00BFFF"][index];
        case BlocksEnum.leftL:
            return ["#FF8C00", "#32CD32", "#8B0000", "#9370DB", "#FFD700", "#8B0000", "#FF69B4", "#B0C4DE"][index];
        case BlocksEnum.rightL:
            return ["#CD853F", "#ADFF2F", "#800000", "#8A2BE2", "#FFA500", "#A52A2A", "#FF1493", "#4682B4"][index];
        case BlocksEnum.esL:
            return ["#D2691E", "#808000", "#FFA07A", "#800080", "#FF8C00", "#B22222", "#DB7093", "#7B68EE"][index];
        case BlocksEnum.esR:
            return ["#8B4513", "#556B2F", "#E9967A", "#8B008B", "#FF6347", "#A52A2A", "#C71585", "#4169E1"][index];
        case BlocksEnum.cube:
            return ["#A0522D", "#6B8E23", "#FF6347", "#EE82EE", "#FF7F50", "#DC143C", "#DB7093", "#000080"][index];
        default:
          // code block
      }
}