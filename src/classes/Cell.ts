export class Cell {

    id: string;
    isOccupied: boolean = false;
    occupiedBy: string = 'unknown';

    constructor(id: string) {
        this.id = id;
    }

    setCellOccupied() {
        this.isOccupied = true;
    }

    setCellOccupiedByElement(elem: string) {
        this.occupiedBy = elem;
    }

    isCellOccupied() {
        return this.isOccupied;
    }
}
