'use strict'

import {Game} from "../classes/Game";

declare var game: Game;

export function createNewGame() {
    let haveUnfinishedGame = JSON.parse(window.localStorage.getItem('haveUnfinishedGame'));
    game = new Game();
    game.createNewGame(haveUnfinishedGame);
}

export function doStep(id: string) {
    game.doStep(id);
}

export function restartGame() {
    if (game) {
        game.getGameMap().clearGameMap();
    }
    createNewGame();
}


