import { PrismaClient } from '@prisma/client'
import { typeToName } from './_lib/typemapping'
const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (!req.query.longitude || !req.query.latitude) {
    res.statusCode = 401
    return
  }
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  const results = await prisma.$queryRaw`SELECT ST_AsGeoJSON(geom) as location, fclass as type, name
    FROM "berlin-pois"
    WHERE ST_DWithin(geom, ST_MakePoint(${Number(
      req.query.longitude,
    )}, ${Number(req.query.latitude)}), 600, true)
    ORDER BY type;`

  const parsedResults = results.map((item) => {
    // Parse GeoJSON
    return {
      geometry: JSON.parse(item.location),
      type: 'Feature',
      properties: {
        name: item.name,
        type: typeToName[item.type],
      },
    }
  })
  res.end(JSON.stringify(parsedResults))
}
