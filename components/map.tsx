import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L, { Map as LeafletMap } from 'leaflet'
import { Coordinates, LeafletGeoJson, PointOfInterest } from '../types/types'


// import { OpenStreetMapProvider } from 'leaflet-geosearch'
// const provider = new OpenStreetMapProvider()
// const searchControl = new GeoSearchControl({
//   provider: provider,
//   style: 'button',
// })

L.Icon.Default.imagePath = '/images/'

interface MapProps {
  pois: PointOfInterest[]
  userPosition: Coordinates
  userPositionError: string
}

const Map: React.FC<MapProps> = ({ pois, userPosition }) => {
  const [map, setMap] = useState<LeafletMap>()

  // Set the view of the map to user location
  useEffect(() => {
    const latlng = L.latLng(userPosition.latitude, userPosition.longitude)
    map?.setView(latlng)
  }, [userPosition])

  // useEffect(() => {
  //   map?.addControl(searchControl)
  // }, [map])

  return (
    <MapContainer
      whenCreated={setMap}
      // @ts-ignore
      center={[userPosition.latitude, userPosition.longitude]}
      zoom={16}
      scrollWheelZoom={false}
    >
      {/* <Search /> */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <PointsOfInterest pois={pois} />
    </MapContainer>
  )
}

const PointsOfInterest = ({
  pois,
}: {
  pois: PointOfInterest[]
}): JSX.Element => {
  if (!pois) return null

  return (
    <>
      {pois
        .filter((poi) => poi.visible)
        .map((poi) => (
          <GeoJSON
            key={`${poi.geometry.coordinates[0]}.${poi.geometry.coordinates[1]}.${poi.type}`}
            data={poiToGEOJSON(poi)}
            // @ts-ignore
            onEachFeature={(feature, layer) => {
              if (feature.properties.name) {
                layer.bindPopup(
                  `${feature.properties.name} (${feature.properties.type})`,
                )
              } else {
                layer.bindPopup(`${feature.properties.type}`)
              }
            }}
          />
        ))}
    </>
  )
}

function poiToGEOJSON(poi: PointOfInterest): LeafletGeoJson {
  return {
    geometry: poi.geometry,
    type: 'Feature',
    properties: {
      name: poi.name,
      type: poi.type,
    },
  }
}

export default Map
