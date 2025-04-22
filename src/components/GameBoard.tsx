'use client'

type GameBoardProps = {
  board: string[][]
  onCellClick: (row: number, col: number) => void
  gridSize: number
  gameOver: boolean
}

export const GameBoard: React.FC<GameBoardProps> = ({
  board,
  onCellClick,
  gridSize,
  gameOver
}) => {
  return (
    <div
      className={`grid gap-1`}
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(50px, 1fr))`,
        gridTemplateRows: `repeat(${gridSize}, minmax(50px, 1fr))`,
        maxWidth: 'min(90vw, 500px)',
        margin: '0 auto',
        boxSizing: "border-box"
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            className="aspect-square bg-white border text-2xl font-bold hover:bg-gray-100 disabled:cursor-not-allowed"
            onClick={() => onCellClick(rowIndex, colIndex)}
            disabled={!!cell || gameOver}
          >
            {cell}
          </button>
        ))
      )}
    </div>
  )
}
