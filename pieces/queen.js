class Queen extends Piece {
    constructor(i) {
        super()

        this.i = i
        this.coord = this.getCoordFromIndex(i)
        this.diagonal = new Diagonal()
        this.vertical = new Vertical()
        this.horizontal = new Horizontal()
        this.indexSquares = this.diagonal.getSquares(this.i).concat(this.vertical.getSquares(this.i)).concat(this.horizontal.getSquares(this.i))
        this.name = "queen"
    }
}