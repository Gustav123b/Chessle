class Rook extends Piece {
    constructor(i) {
        super()

        this.i = i
        this.coord = this.getCoordFromIndex(i)
        this.verical = new Vertical()
        this.horizontal = new Horizontal()
        this.indexSquares = this.verical.getSquares(this.i).concat(this.horizontal.getSquares(this.i))
        this.name = "rook"
    }
}