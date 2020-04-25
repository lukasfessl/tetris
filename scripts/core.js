

window.addEventListener('load', function() {

    var canvas = document.getElementById("canvas")
    var width = canvas.width
    var height = canvas.height
    var ctx = canvas.getContext("2d")
 
    var currentScreen = "GAME";
    var screenManager = new ScreenManager();
    var screen = screenManager.getScreen(currentScreen);
   
    function update(delta) {
        screen.update(delta)
    }

    function draw() {
        screen.draw(ctx, width, height);
    }

    // GAME LOOP
    function loop(timestamp) {
        var progress = timestamp - lastRender

        update(progress)
        draw()

        lastRender = timestamp

        if (screen.getGameState() != "GAMEOVER") {
            window.requestAnimationFrame(loop)
        } else if (screen.getGameState() == "GAMEOVER") {
            screen.gameState = "GAMEOVER";
            showAlert(screen.getStats());
        }
    }
    var lastRender = 0
    window.requestAnimationFrame(loop)
});