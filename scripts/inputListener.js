
var move;

document.addEventListener('keydown', logKey);
document.addEventListener('keyup', logKeyUp);

function logKey(e) {
    if (e.keyCode == 39) {
        move = "right"
    }
    if (e.keyCode == 37) {
        move = "left"
    }
    if (e.keyCode == 38) {
        move = "up"
    }
    if (e.keyCode == 40) {
        move = "down"
    }
}

function logKeyUp(e) {
    if (e.keyCode == 40) {
        move = null
    }

}
