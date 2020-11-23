import Layout from '../components/layout'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { useEffect, useState } from 'react'

const MapWithNoSSR = dynamic(() => import('../components/map'), {
  ssr: false,
})

const fetcher = (...args) => fetch(...args).then((res) => res.json())

function IndexPage() {
  const [userPosition, setUserPosition] = useState(null)
  const [userPositionError, setUserPositionError] = useState(null)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserPosition(position.coords)
      },
      () => {
        setUserPositionError('Unable to retrieve your location')
      },
    )
  }, [])

  const { data, error } = useSWR(
    userPosition
      ? `/api/poi?latitude=${userPosition.latitude}&longitude=${userPosition.longitude}`
      : null,
    fetcher,
  )

  if (error) return 'An error has occurred.'

  return (
    <Layout>
      <style global jsx>{`
        .leaflet-container {
          height: 550px;
          width: 100%;
        }
      `}</style>
      <div className="flex flex-col items-center justify-center">
        <MapWithNoSSR userPosition={userPosition} pois={data} />
      </div>
    </Layout>
  )
}

export default IndexPage
