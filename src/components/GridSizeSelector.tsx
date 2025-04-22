"use client"

import { ChangeEvent } from "react"

type GridSizeSelectProps = {
  value: number
  onChange: (value: number) => void
}

export const GridSizeSelect = ({ value, onChange }: GridSizeSelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value)
    onChange(newSize)
  }

  return (
    <select value={value} onChange={handleChange}>
      {[...Array(7)].map((_, i) => {
        const size = i + 3
        return (
          <option key={size} value={size}>
            {size}×{size}
          </option>
        )
      })}
    </select>
  )
}
