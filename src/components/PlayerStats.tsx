type PlayerStatsProps = {
    xWins: number
    oWins: number
  }
  
  export default function PlayerStats({ xWins, oWins }: PlayerStatsProps) {
    return (
      <div className="flex gap-4 my-4">
        <div>
          <p>Гравець X</p>
          <p>Перемог: {xWins}</p>
        </div>
        <div>
          <p>Гравець 0</p>
          <p>Перемог: {oWins}</p>
        </div>
      </div>
    )
  }
  