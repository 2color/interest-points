import { Dispatch, useCallback, useEffect, useState } from 'react'
import { PointOfInterest } from '../types/types'

interface PlacesProps {
  pois: PointOfInterest[]
  setUserPois: Dispatch<React.SetStateAction<PointOfInterest[]>>
}

interface PointTypeFilterState {
  [key: string]: boolean
}

const PointTypeFilter: React.FC<PlacesProps> = ({ pois, setUserPois }) => {
  if (!pois) return null

  const [pointTypes, setPointTypes] = useState<PointTypeFilterState>(
    getInitialPointTypeState(pois),
  )

  const handleChange = useCallback(
    (e) => {
      setPointTypes((pointTypes) => ({
        ...pointTypes,
        [e.target.name]: e.target.checked,
      }))
    },
    [pointTypes],
  )

  useEffect(() => {
    // Update visible pois when filters
    setUserPois((pois) => {
      const updated = pois.map((poi) => {
        return { ...poi, visible: pointTypes[poi.type] }
      })
      return updated
    })
  }, [pointTypes])

  return (
    <div className="flex flex-col grid-cols-3	 my-2">
      {Object.keys(pointTypes).map((pointType) => (
        <label key={pointType} className="inline-flex items-center mt-3">
          <span className="ml-2 text-gray-700">{pointType}</span>
          <input
            type="checkbox"
            name={pointType}
            checked={pointTypes[pointType]}
            className="form-checkbox h-5 w-5 text-gray-600"
            onChange={handleChange}
          ></input>
        </label>
      ))}
    </div>
  )
}

export default PointTypeFilter

// Get the unique types
const getInitialPointTypeState = (pois: PointOfInterest[]) => {
  const state = {}
  for (const poi of pois) {
    state[poi.type] = false
  }
  return state
}
