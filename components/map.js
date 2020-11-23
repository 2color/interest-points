import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

L.Icon.Default.imagePath = '/images/'

function Map({ pois, userPosition }) {
  if (!userPosition) return 'loading user poisiton...'
  return (
    <MapContainer
      center={[userPosition.latitude, userPosition.longitude]}
      zoom={16}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {pois &&
        pois.map((poi) => (
          <GeoJSON
            key={`${poi.geometry.coordinates[0]}.${poi.geometry.coordinates[1]}.${poi.type}`}
            data={poi}
            onEachFeature={(feature, layer) => {
              if (feature.properties && feature.properties.name) {
                layer.bindPopup(`${feature.properties.name} (${feature.properties.type})`)
              } else {
                layer.bindPopup(`${feature.properties.type}`)
              }
            }}
          />
        ))}

      <Marker position={[52.5400243, 13.4221333]}>
        <Popup>woot</Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map
