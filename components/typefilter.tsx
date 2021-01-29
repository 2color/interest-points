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
    <div className="flex flex-col my-2 grid-cols-3	">
      {Object.keys(pointTypes).map((pointType) => (
        <label key={pointType} className="inline-flex items-center mt-3">
          <span className="ml-2 text-gray-700">{pointType}</span>
          <input
            type="checkbox"
            name={pointType}
            checked={pointTypes[pointType]}
            className="w-5 h-5 text-gray-600 form-checkbox"
            onChange={handleChange}
          ></input>
        </label>
      ))}
    </div>
  )
}

export default PointTypeFilter

// Get the unique types
const getInitialPointTypeState = (pois: PointOfInterest[]): PointTypeFilterState => {
  const state: PointTypeFilterState = {}
  for (const poi of pois) {
    state[poi.type] = false
  }
  return state
}
