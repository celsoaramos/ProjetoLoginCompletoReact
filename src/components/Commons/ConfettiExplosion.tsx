import React from 'react'
import Confetti from 'react-confetti'

type ConfettiExplosionProps = {
  width: number
  height: number
  recycle: boolean
}

const ConfettiExplosion = ({
  width,
  height,
  recycle,
}: ConfettiExplosionProps) => {
  // the call is: <ConfettiExplosion width={680} height={590} recycle={true}  />
  return (
    <Confetti
      width={width}
      height={height}
      recycle={recycle}
      numberOfPieces={200}
    />
  )
}

export default ConfettiExplosion
