'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.restartGame = exports.doStep = exports.createNewGame = void 0;
const Game_1 = require("../classes/Game");
function createNewGame() {
    let haveUnfinishedGame = JSON.parse(window.localStorage.getItem('haveUnfinishedGame'));
    game = new Game_1.Game();
    game.createNewGame(haveUnfinishedGame);
}
exports.createNewGame = createNewGame;
function doStep(id) {
    game.doStep(id);
}
exports.doStep = doStep;
function restartGame() {
    if (game) {
        game.getGameMap().clearGameMap();
    }
    createNewGame();
}
exports.restartGame = restartGame;
