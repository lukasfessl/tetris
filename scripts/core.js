

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
        if (!screen.isPause()) {
            window.requestAnimationFrame(loop)
        }
    }
    var lastRender = 0
    window.requestAnimationFrame(loop)
});