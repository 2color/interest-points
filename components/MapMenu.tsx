import React, { useCallback, useState, useEffect, Dispatch } from 'react'
import { Coordinates } from '../types/types'

interface Props {
  setUserPositionError: Dispatch<React.SetStateAction<string>>
  setUserPosition: Dispatch<React.SetStateAction<Coordinates>>
}

const MapMenu: React.FC<Props> = ({
  setUserPositionError,
  setUserPosition,
}) => {
  const handleClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        setUserPosition(position.coords)
      },
      () => {
        setUserPositionError('Unable to retrieve your location')
      },
    )
  }, [setUserPosition, setUserPositionError])

  return (
    <div className="my-2">
      <button
        className="py-1 px-2 rounded-md bg-blue-600 text-white hover:text-gray-300"
        onClick={handleClick}
      >
        Get your location
      </button>
    </div>
  )
}

export default MapMenu
