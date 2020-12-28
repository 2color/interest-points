export interface PointOfInterest {
  geometry: {
    coordinates: [number, number]
    type: string
  }
  name: string
  type: string
  visible: boolean
}

export interface Coordinates {
  longitude: number
  latitude: number
}
