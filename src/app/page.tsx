'use client'

import { GridSizeSelect } from "@/components/GridSizeSelector";
import { GameBoard } from "@/components/GameBoard";
import { LogicOfWin } from "@/components/LogicOfWin";
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import PlayerStats from "@/components/PlayerStats";
import PlayerTimer from "@/components/PlayerTimer";

export default function Home() {

  const [gridSize, setGridSize] = useState(3)
  const [pendingGridSize, setPendingGridSize] = useState(3)
  const [board, setBoard] = useState<string[][]>(
    Array(gridSize).fill(null).map(() => Array(gridSize).fill(''))
  )
  const [gameOver, setGameOver] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState<'X' | '0'>('X')
  const [winner, setWinner] = useState<'X' | '0' | null>(null)
  const [xWins, setXWins] = useState(0)
  const [oWins, setOWins] = useState(0)
  const [xTime, setXTime] = useState(0)
  const [oTime, setOTime] = useState(0)
  const [resetTimers, setResetTimers] = useState(false)
  const [totalGames, setTotalGames] = useState(0)
  const [showModal, setShowModal] = useState(false)


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

  const startNewGame = () => {
    setGridSize(pendingGridSize)
    setBoard(Array(pendingGridSize).fill(null).map(() => Array(pendingGridSize).fill('')))
    setWinner(null)
    setGameOver(false)
    setCurrentPlayer('X')
    setResetTimers(true)
    setTimeout(() => setResetTimers(false), 0)
  }

  useEffect(() => {
    if (gameOver) {
      const timeout = setTimeout(() => {
        setShowModal(true)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [gameOver])

  return (
    <>
      <div className="flex justify-around items-center">
        <GridSizeSelect value={pendingGridSize} onChange={setPendingGridSize} />

        <LogicOfWin
          board={board}
          gridSize={gridSize}
          lastPlayer={currentPlayer === 'X' ? '0' : 'X'}
          onWin={(winner) => {
            setWinner(winner)
            setTotalGames(prev => prev + 1)
            if (winner === 'X') setXWins(prev => prev + 1)
            if (winner === '0') setOWins(prev => prev + 1)
          }}
          setGameOver={setGameOver}
        />

        <p className="mt-2 text-lg">Зіграно ігор: {totalGames}</p>

        <PlayerStats oWins={oWins} xWins={xWins} />

        {showModal && (
          <Modal
            winner={winner}
            onClose={() => setShowModal(false)}
            isVisible={showModal}
            xTime={xTime}
            oTime={oTime}
          />
        )}

        <button onClick={startNewGame} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer">
          Нова гра
        </button>
      </div>

      <GameBoard board={board} onCellClick={handleCellClick} gridSize={gridSize} gameOver={gameOver} />

      <div className="flex justify-around">
        <div>
          <p className="font-semibold text-center">⏱ Час гравця X</p>
          <PlayerTimer
            isActive={currentPlayer === 'X' && !gameOver}
            shouldReset={resetTimers}
            onTimeUpdate={setXTime}
            onResetComplete={() => { }}
          />
        </div>

        <div>
          {currentPlayer && <p className="font-bold">Ходить гравець: {currentPlayer}</p>}
          {pendingGridSize !== gridSize && (
            <p className="text-sm text-gray-500 italic mt-2">
              Новий розмір сітки буде застосовано після натискання "Нова гра".
            </p>
          )}
        </div>

        <div>
          <p className="font-semibold text-center">⏱ Час гравця 0</p>
          <PlayerTimer
            isActive={currentPlayer === '0' && !gameOver}
            shouldReset={resetTimers}
            onTimeUpdate={setOTime}
            onResetComplete={() => { }}
          />
        </div>
      </div>
    </>
  );
}
