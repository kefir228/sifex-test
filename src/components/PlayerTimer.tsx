'use client'

import { useEffect, useRef, useState } from "react"

type PlayerTimerProps = {
    isActive: boolean
    shouldReset: boolean
    onResetComplete: () => void
    onTimeUpdate: (time: number) => void
}

export default function PlayerTimer({
    isActive,
    shouldReset,
    onResetComplete,
    onTimeUpdate,
}: PlayerTimerProps) {
    const [time, setTime] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                setTime(prev => {
                    const updated = prev + 1
                    return updated
                })
            }, 1000)
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isActive])

    useEffect(() => { 
        onTimeUpdate(time)
    }, [time])

    useEffect(() => {
        if (shouldReset) {
            setTime(0)
            onResetComplete()
        }
    }, [shouldReset, onResetComplete])

    const formatTime = (t: number) => {
        const min = Math.floor(t / 60)
        const sec = t % 60
        return `${min}:${sec.toString().padStart(2, "0")}`
    }

    return (
        <div className="text-center">
            <p className="text-sm">{formatTime(time)}</p>
        </div>
    )
}
