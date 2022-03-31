class Vertical extends Movement {
    getSquares(i, boardSize = 8) {
        let row = Math.floor(i / boardSize)
        let col = i - (row * boardSize)
        this.boardSize = boardSize

        return this.up(row, col).concat(this.down(row, col))
    }

    up(startRow, startCol) {
        let row = startRow
        let col = startCol
        let result = []

        while (row > 0) {
            row--
            result.push(this.getIndex(row, col))
        }

        return result
    }

    down(startRow, startCol) {
        let row = startRow
        let col = startCol
        let result = []

        while (row < this.boardSize - 1) {
            row++
            result.push(this.getIndex(row, col))
        }

        return result
    }
}