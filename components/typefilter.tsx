import { Dispatch, useCallback, useMemo } from 'react'
import { PointOfInterest } from '../types/types'
import Select from 'react-select'

interface PointTypeFilterProps {
  pois: PointOfInterest[]
  setUserPois: Dispatch<React.SetStateAction<PointOfInterest[]>>
}

type PointTypeFilterState = {
  value: string
  label: string
}[]
// Input component for the user to select the visible point types/categories,
// e.g. ATM, public bin. Renders the list from the available `poi`s
const PointTypeFilter: React.FC<PointTypeFilterProps> = ({ pois, setUserPois }) => {
  if (!pois) return null

  // Memoize calculating the unique point types for the select
  const pointTypes = useMemo<PointTypeFilterState>(
    () => getUniquePointTypes(pois),
    [pois],
  )

  const handleChange = useCallback(
    (selectedPointTypes) => {

      setUserPois((pois) => {
        const updated = pois.map((poi) => {
          for (const selectedType of selectedPointTypes) {
            if (selectedType.value === poi.type) {
              return { ...poi, visible: true }
            }
          }

          return { ...poi, visible: false }
        })
        return updated
      })
    },
    [setUserPois],
  )

  return (
    <div className="flex flex-row flex-grow my-2 w-48">
      <Select
        placeholder="Point types"
        className="w-48"
        isMulti
        options={pointTypes}
        onChange={handleChange}
      />
    </div>
  )
}

export default PointTypeFilter

// Get the unique types
const getUniquePointTypes = (pois: PointOfInterest[]): PointTypeFilterState => {
  const options = [...new Set(pois.map((poi) => poi.type))].map((type) => ({
    value: type,
    label: type,
  }))

  return options
}
