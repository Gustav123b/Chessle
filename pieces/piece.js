class Piece {
    constructor(i, coord = "", boardSize = 8) {
        this.i = i
        this.coord = i
        this.boardSize = boardSize

        this.name
        this.indexSquares
        this.coordSquares
        this.check = false
    }

    getCoordFromIndex(i) {
        let coli = Math.floor(i / boardSize)
        let rowi = i - (coli * boardSize)

        let col = available_col[coli]
        let row = rowi

        return available_row[row] + col
    }

    getSquaresIndex() {
        return this.indexSquares
    }

    getSquaresCoord() {
        let available_row = ["a", "b", "c", "d", "e", "f", "g", "h"]
        let available_col = ["8", "7", "6", "5", "4", "3", "2", "1"]
        let result = []

        this.indexSquares.forEach(index => {
            let coli = Math.floor(index / this.boardSize)
            let rowi = index - (coli * this.boardSize)

            let col = available_col[coli]
            let row = rowi

            result.push(available_row[row] + col)
        });

        return result
    }

    indexToCoord(arr){
        let result = []

        arr.forEach(i => {
            result.push(this.getCoordFromIndex(i))
        });

        return result
    }

    getElement() {
        return `<div class="piece ${this.name}" data-piece="${this.name}"></div>`
    }
}