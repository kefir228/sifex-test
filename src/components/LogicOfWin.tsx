import { useEffect } from 'react'

type GameInfoProps = {
  board: string[][]
  gridSize: number
  lastPlayer: 'X' | '0'
  onWin: (winner: 'X' | '0') => void
  setGameOver: (value: boolean) => void
}

export const LogicOfWin = ({ board, gridSize, lastPlayer, onWin, setGameOver }: GameInfoProps) => {
  useEffect(() => {
    const checkWinner = () => {
      for (let row = 0; row < gridSize; row++) {
        if (board[row].every(cell => cell === lastPlayer)) {
          onWin(lastPlayer)
          setGameOver(true)
          return
        }
      }

      for (let col = 0; col < gridSize; col++) {
        if (board.every(row => row[col] === lastPlayer)) {
          onWin(lastPlayer)
          setGameOver(true)
          return
        }
      }

      if (board.every((row, i) => row[i] === lastPlayer)) {
        onWin(lastPlayer)
        setGameOver(true)
        return
      }

      if (board.every((row, i) => row[gridSize - 1 - i] === lastPlayer)) {
        onWin(lastPlayer)
        setGameOver(true)
        return
      }

      const isDraw = board.flat().every(cell => cell !== '')
      if (isDraw) {
        onWin('draw' as any) 
        setGameOver(true)
      }
    }

    checkWinner()
  }, [board])

  return null
}
