import React from 'react'
import { PointOfInterest } from '../types/types'

interface PlacesProps {
  pois: PointOfInterest[]
}

const PlacesTable: React.FC<PlacesProps> = ({ pois }) => {
  if (!pois) return null

  const pointsToRender = pois.filter((poi) => poi.visible)

  if (pointsToRender.length === 0) return null

  return (
    <div className="flex flex-col my-2">
      <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
        <div className="inline-block py-2 min-w-full align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  {/* <th scope="col" className="relative py-3 px-6">
                    Show
                  </th> */}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pointsToRender.map((poi) => (
                  <tr
                    key={`${poi.geometry.coordinates[0]}.${poi.geometry.coordinates[1]}.${poi.type}`}
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="">
                          <div className="text-sm font-medium text-gray-900">
                            {poi.type}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{poi.name}</div>
                    </td>
                    {/* <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        show
                      </a>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PlacesTable
