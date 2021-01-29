import Layout from '../components/layout'
import PlacesTable from '../components/table'
import MapMenu from '../components/MapMenu'
import PointTypeFilter from '../components/typefilter'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { Fragment, useEffect, useState } from 'react'
import { Coordinates, PointOfInterest } from '../types/types'

// @ts-ignore
const MapWithNoSSR = dynamic(() => import('../components/map.tsx'), {
  ssr: false,
})

const fetcher = (...args: [RequestInfo, RequestInit]) =>
  fetch(...args).then((res) => res.json())

function IndexPage() {
  // State to store user position and error using the geolocation API
  const [userPois, setUserPois] = useState<PointOfInterest[]>([])
  const [userPosition, setUserPosition] = useState<Coordinates>()
  const [userPositionError, setUserPositionError] = useState<string>(null)

  useEffect(() => {
    // effect to run once and set the default user position
    setUserPosition({ longitude: 13.4221333, latitude: 52.5400275 })
  }, [])

  

  // Fetch points of interest from the API
  const { data, error }: { data?: PointOfInterest[]; error?: Error } = useSWR(
    userPosition
      ? `/api/poi?latitude=${userPosition.latitude}&longitude=${userPosition.longitude}`
      : null,
    fetcher,
  )

  useEffect(() => {
    setUserPois(data?.map((poi) => Object.assign({}, poi, { visible: false })))
  }, [data])

  if (error) return 'Whoops! it looks like the API is not working.'

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        {!userPosition && !userPositionError ? (
          'Getting the user location'
        ) : (
          <Fragment>
            <MapMenu setUserPositionError={setUserPositionError} setUserPosition={setUserPosition}  />
            <MapWithNoSSR
              // @ts-ignore
              userPositionError={userPositionError}
              userPosition={userPosition}
              pois={userPois}
            />
            <PointTypeFilter pois={userPois} setUserPois={setUserPois} />
            <PlacesTable pois={userPois} />
          </Fragment>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage
