class ScreenManager {

    getScreen(key) {
        if (key == "GAME") {
            return new Game(GRID);
        }
        if (key == "MENU") {
            // TODO
            return null;
        }
        if (key == "RESULTS") {
            // TODO
            return null;
        }
    }

}