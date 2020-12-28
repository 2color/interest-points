import React, { useState, useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { GeoJsonObject } from 'geojson'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import { Coordinates, PointOfInterest } from '../types/types'

const provider = new OpenStreetMapProvider()

const searchControl = new GeoSearchControl({
  provider: provider,
  style: 'button',
})

L.Icon.Default.imagePath = '/images/'

interface MapProps {
  pois?: PointOfInterest[]
  userPosition: Coordinates
  userPositionError: string
}

const Map: React.FC<MapProps> = ({ pois, userPosition, userPositionError }) => {
  const [map, setMap] = useState(null)

  // Take the user position or default to Berlin
  const center = [
    userPosition.latitude || 52.520008,
    userPosition.longitude || 13.404954,
  ]

  useEffect(() => {
    map?.setView(center)
  }, [userPosition])

  return (
    <MapContainer
    whenCreated={setMap}
      // @ts-ignore
      center={center}
      zoom={16}
      scrollWheelZoom={false}
    >
      {/* <Search /> */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <PointsOfInterest pois={pois} />
    </MapContainer>
  )
}

function PointsOfInterest({ pois }) {
  if (!pois) return null
  return pois.map((poi) => (
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
  ))
}

function poiToGEOJSON(poi: PointOfInterest): GeoJsonObject {
  return {
    geometry: poi.geometry,
    type: 'Feature',
    properties: {
      name: poi.name,
      type: poi.type
    }
  }
}

function Search() {
  const map = useMap()
  useEffect(() => {
    map.addControl(searchControl)
  }, [map])
  return null
}

export default Map
