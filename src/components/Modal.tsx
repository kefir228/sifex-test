'use client'

import { useEffect } from 'react'

type ModalProps = {
    winner: 'X' | '0' | null
    onClose: () => void
    isVisible: boolean
    xTime: number
    oTime: number
}

export default function Modal({ winner, onClose, isVisible, xTime, oTime }: ModalProps) {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.id === 'modal-backdrop') {
                onClose()
            }
        }

        if (isVisible) {
            window.addEventListener('click', handleClickOutside)
        }

        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [isVisible, onClose])

    const formatTime = (t: number) => {
        const min = Math.floor(t / 60)
        const sec = t % 60
        return `${min}:${sec.toString().padStart(2, "0")}`
    }

    if (!isVisible) return null

    return (
        <div
            id="modal-backdrop"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
                {winner === null ? (
                    <>
                        <h2 className="text-xl font-semibold mb-4">Нічия!</h2>
                        <p className="mb-4">Спробуйте ще :)</p>
                        <p className="mb-2">Час гри: {formatTime(xTime + oTime)}</p>

                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-semibold mb-4">
                            {winner === 'X' ? 'Гравець 1' : 'Гравець 2'} переміг!
                            <p className="mb-2">Час {winner === 'X' ? 'гравця X' : 'гравця 0'}: {formatTime(winner === 'X' ? xTime : oTime)}</p>
                        </h2>
                        <p className="mb-4">Вітаємо!</p>
                    </>
                )}
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Ок
                </button>
            </div>
        </div>
    )
}

