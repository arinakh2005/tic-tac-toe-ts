export class Player {

    playerType: number;

    constructor(playerType: number) {
        this.playerType = playerType;
    }

    getPlayerType() {
        return this.playerType;
    }
}
