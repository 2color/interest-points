import { GeoJsonObject, Geometry, Point } from 'geojson'

export interface PointOfInterest {
  geometry: Point
  // geometry: {
  //   coordinates: [number, number]
  //   type: string
  // }
  name: string
  type: string
  visible: boolean
}

export interface Coordinates {
  longitude: number
  latitude: number
}

export type LeafletGeoJson = GeoJsonObject & {
  geometry: Geometry
  properties: {}
}
