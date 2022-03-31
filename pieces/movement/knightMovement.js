class KnightMovement extends Movement {
    getSquares(i, boardSize = 8) {
        let row = Math.floor(i / boardSize)
        let col = i - (row * boardSize)
        this.boardSize = boardSize

        let result = [this.topLeftTop(row, col), this.topLeftLeft(row, col), this.topRightTop(row, col), this.topRightRight(row, col),
        this.bottomLeftLeft(row, col), this.bottomLeftBottom(row, col), this.bottomRightRight(row, col), this.bottomRightBottom(row, col)]

        return this.removeUndefined(result)
    }

    topLeftTop(startRow, startCol) {
        let row = startRow - 2
        let col = startCol - 1

        if (row < 0 || col < 0) return

        return this.getIndex(row, col)
    }

    topLeftLeft(startRow, startCol) {
        let row = startRow - 1
        let col = startCol - 2

        if (row < 0 || col < 0) return

        return this.getIndex(row, col)
    }

    topRightTop(startRow, startCol) {
        let row = startRow - 2
        let col = startCol + 1

        if (row < 0 || col >= this.boardSize) return

        return this.getIndex(row, col)
    }

    topRightRight(startRow, startCol) {
        let row = startRow - 1
        let col = startCol + 2

        if (row < 0 || col >= this.boardSize) return

        return this.getIndex(row, col)
    }

    bottomLeftLeft(startRow, startCol) {
        let row = startRow + 1
        let col = startCol - 2

        if (row >= this.boardSize || col < 0) return

        return this.getIndex(row, col)
    }

    bottomLeftBottom(startRow, startCol) {
        let row = startRow + 2
        let col = startCol - 1

        if (row >= this.boardSize || col < 0) return

        return this.getIndex(row, col)
    }

    bottomRightRight(startRow, startCol) {
        let row = startRow + 1
        let col = startCol + 2

        if (row >= this.boardSize || col >= this.boardSize) return

        return this.getIndex(row, col)
    }

    bottomRightBottom(startRow, startCol) {
        let row = startRow + 2
        let col = startCol + 1

        if (row >= this.boardSize || col >= this.boardSize) return

        return this.getIndex(row, col)
    }
}