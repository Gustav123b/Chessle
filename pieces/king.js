class King extends Piece {
    constructor(i) {
        super()

        this.i = i
        this.coord = this.getCoordFromIndex(i)
        this.kingMovement = new KingMovement()
        this.diagonal = new Diagonal()
        this.indexSquares = this.kingMovement.getSquares(this.i).concat(this.diagonal.getSquares(this.i, undefined, 1))
        this.coordSquares = this.getSquaresCoord()
        this.name = "king"
    }

    isCheck(squares) {
        let result = false

        squares.forEach(square => {
            if (square == this.coord) {
                result = true
            }
        });

        return result
    }

    checkmateStatus(squares) {
        // Can the king move
        let canMove = false
        this.coordSquares.forEach(kingSquare => {
            if (!squares.includes(kingSquare)) canMove = true
        });

        let check = this.isCheck(squares)

        if (!canMove && check) return "checkmate"
        else if (!canMove && !check) return "stalemate"

        return false
    }
}