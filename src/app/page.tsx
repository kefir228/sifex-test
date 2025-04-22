'use client'

import { GridSizeSelect } from "@/components/GridSizeSelector";
import { GameBoard } from "@/components/GameBoard";
import { LogicOfWin } from "@/components/LogicOfWin";
import { useState } from "react";
import PlayerStats from "@/components/PlayerStats";

export default function Home() {

  const [gridSize, setGridSize] = useState(3)
  const [board, setBoard] = useState<string[][]>(
    Array(gridSize).fill(null).map(() => Array(gridSize).fill(''))
  )
  const [gameOver, setGameOver] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState<'X' | '0'>('X')
  const [winner, setWinner] = useState<'X' | '0' | null>(null)
  const [xWins, setXWins] = useState(0)
  const [oWins, setOWins] = useState(0)
  
  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] !== '' || gameOver) return

    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? currentPlayer : cell
      )
    )
    setBoard(newBoard)
    setCurrentPlayer(prev => (prev === 'X' ? '0' : 'X'))
  }

  const handleSizeChange = (newSize: number) => {
    setGridSize(newSize)
    setBoard(Array(newSize).fill(null).map(() => Array(newSize).fill('')))
    setGameOver(false)
    setCurrentPlayer('X')
  }

  const startNewGame = () => {
    setBoard(Array(gridSize).fill(null).map(() => Array(gridSize).fill('')))
    setWinner(null)
    setGameOver(false)
    setCurrentPlayer('X')
  }

  return (
    <>
      <div className="flex justify-around items-center">
        <GridSizeSelect value={gridSize} onChange={handleSizeChange} />
        <LogicOfWin
          board={board}
          gridSize={gridSize}
          lastPlayer={currentPlayer === 'X' ? '0' : 'X'}
          onWin={(winner) => {
            setWinner(winner)
            if (winner === 'X') setXWins(prev => prev + 1)
            if (winner === '0') setOWins(prev => prev + 1)
          }}
          setGameOver={setGameOver}
        />
        <PlayerStats oWins={oWins} xWins={xWins} />
        {winner && <p>Перeможець: {winner}</p>}
        <button onClick={startNewGame} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer">
          Нова гра
        </button>
      </div>
      <GameBoard board={board} onCellClick={handleCellClick} gridSize={gridSize} gameOver={gameOver} />
    </>
  );
}
