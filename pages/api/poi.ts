import type { NextApiRequest, NextApiResponse } from 'next'
import { typeToName } from './_lib/typemapping'
import prisma from './_lib/prisma'
import { GeoJsonObject, GeoJsonProperties, GeoJsonGeometryTypes } from 'geojson'

type QueryResult = {
  id: number
  location: string
  type: string
  name: string
}

type ReturnedResult = {
  geometry: GeoJsonObject & GeoJsonProperties & GeoJsonGeometryTypes
  type: string
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!req.query.longitude || !req.query.latitude) {
    res.statusCode = 401
    return
  }

  const results = await prisma.$queryRaw<
    QueryResult[]
  >`SELECT ST_AsGeoJSON(geom) as location, gid as id, fclass as type, name
  FROM "berlin-pois"
  WHERE ST_DWithin(geom, ST_MakePoint(${Number(req.query.longitude)}, ${Number(
    req.query.latitude,
  )}), 600, true)
    ORDER BY type;`

  const parsedResults: ReturnedResult[] = results.map((item) => {
    return {
      // Parse GeoJSON
      geometry: JSON.parse(item.location),
      name: item.name,
      id: item.id,
      type: typeToName[item.type],
    }
  })

  res.setHeader('Content-Type', 'application/json')
  res.statusCode = 200
  res.end(JSON.stringify(parsedResults))
}
