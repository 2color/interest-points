import Layout from '../components/layout'
import PlacesTable from '../components/table'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { Dispatch, Fragment, useCallback, useEffect, useState } from 'react'
import { Coordinates, PointOfInterest } from '../types/types'

// @ts-ignore
const MapWithNoSSR = dynamic(() => import('../components/map.tsx'), {
  ssr: false,
})

const fetcher = (...args: [RequestInfo, RequestInit]) =>
  fetch(...args).then((res) => res.json())

function IndexPage() {
  // State to store user position and error using the geolocation API
  const [userPois, setUserPois] = useState<PointOfInterest[]>(null)
  const [userPosition, setUserPosition] = useState<Coordinates>(null)
  const [userPositionError, setUserPositionError] = useState<string>(null)

  // effect to run once and get user position
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // Default to Berlin in development
      setUserPosition({ longitude: 13.4636483, latitude: 52.4999915 })
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition(position.coords)
        },
        () => {
          setUserPositionError('Unable to retrieve your location')
        },
      )
    }
  }, [])

  // Fetch points of interest from the API
  const { data, error }: { data?: PointOfInterest[]; error?: Error } = useSWR(
    userPosition
      ? `/api/poi?latitude=${userPosition.latitude}&longitude=${userPosition.longitude}`
      : null,
    fetcher,
  )

  useEffect(() => setUserPois(data), [data])

  if (error) return 'Whoops! it looks like the API is not working.'

  return (
    <Layout>
      <style global jsx>{`
        .leaflet-container {
          height: 550px;
          width: 100%;
        }
      `}</style>
      <div className="flex flex-col items-center justify-center">
        {!userPosition && !userPositionError ? (
          'Getting the user location'
        ) : (
          <Fragment>
            <MapWithNoSSR
              // @ts-ignore
              userPositionError={userPositionError}
              userPosition={userPosition}
              pois={userPois}
            />
            <Filter pois={userPois} setUserPois={setUserPois} />
            <PlacesTable pois={userPois} />
          </Fragment>
        )}
      </div>
    </Layout>
  )
}

const Filter: React.FC<PlacesProps> = ({ pois, setUserPois }) => {
  if (!pois) return null

  const [pointTypes, setPointTypes] = useState<PointTypesState[]>(
    getUniquePointTypes(pois),
  )

  
  const handleChange = useCallback((e) => {
    setPointTypes(pointTypes => pointTypes.map((pointType) => ({
        type: pointType.type,
        checked: pointType.type === e.target.name ? e.target.checked : pointType.checked,
      })),
    )
    // setUserPois((pois) => {
    //   pois.map(poi => ({ visible: poi.type,...poi }))
    // })
  }, [])

  return (
    <div className="flex flex-col my-2">
      {pointTypes.map((pointType, i) => (
        <label key={pointType.type} className="inline-flex items-center mt-3">
          <span className="ml-2 text-gray-700">{pointType.type}</span>
          <input
            type="checkbox"
            name={pointType.type}
            checked={pointType.checked}
            className="form-checkbox h-5 w-5 text-gray-600"
            onChange={handleChange}
          ></input>
        </label>
      ))}
    </div>
  )
}

// Get the unique types

// const getInitialPointTypeState = (pois: PointOfInterest[]) => {
//   const state = {}
//   for (const poi of pois) {
//     state[poi.type] = true
//   }
//   return state
// }

const getUniquePointTypes = (pois: PointOfInterest[]): PointTypesState[] => {
  const pointTypes = new Set(pois.map((poi) => poi.type))

  return Array.from(pointTypes).map((type) => ({ type, checked: true }))
}


interface PlacesProps {
  pois: PointOfInterest[]
  setUserPois: Dispatch<React.SetStateAction<PointOfInterest[]>>
}

interface PointTypesState {
  type: string
  checked: boolean
}


export default IndexPage
