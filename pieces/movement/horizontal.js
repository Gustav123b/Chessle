class Horizontal extends Movement {
    getSquares(i, boardSize = 8) {
        let row = Math.floor(i / boardSize)
        let col = i - (row * boardSize)
        this.boardSize = boardSize

        return this.left(row, col).concat(this.right(row, col))
    }

    left(startRow, startCol) {
        let row = startRow
        let col = startCol
        let result = []

        while (col > 0) {
            col--
            result.push(this.getIndex(row, col))
        }

        return result
    }

    right(startRow, startCol) {
        let row = startRow
        let col = startCol
        let result = []

        while (col < this.boardSize - 1) {
            col++
            result.push(this.getIndex(row, col))
        }

        return result
    }
}