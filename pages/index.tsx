import Layout from '../components/layout'
import PlacesTable from '../components/table'
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

  useEffect(() => {
    setUserPois(data?.map((poi) => Object.assign({}, poi, { visible: false })))
  }, [data])

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
            <PointTypeFilter pois={userPois} setUserPois={setUserPois} />
            <PlacesTable pois={userPois} />
          </Fragment>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage
