import Link from 'next/link'
import { useState } from 'react'

function Header() {
  const [isExpanded, toggleExpansion] = useState(false)

  return (
    <header className="bg-gradient-to-b from-gray-700 to-black">
      <div className="flex flex-wrap justify-between items-center p-4 mx-auto max-w-4xl md:flex-no-wrap md:p-8">
        <div className="flex items-center">
          <img src="logo-1.png" className="mr-3 w-10 text-white" />

          <Link href="/">
            <a className="text-xl font-bold text-white">
              Berlin Points of Interest
            </a>
          </Link>
        </div>

        <button
          className="flex items-center py-2 px-3 text-white rounded border border-white md:hidden"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>

        <ul
          className={`${
            isExpanded ? `block` : `hidden`
          } md:flex flex-col md:flex-row md:items-center md:justify-center text-sm w-full md:w-auto`}
        >
          {[
            { title: 'Home', route: '/' },
            { title: 'About', route: '/about' },
          ].map((navigationItem) => (
            <li className="mt-3 md:mt-0 md:ml-6" key={navigationItem.title}>
              <Link href={navigationItem.route}>
                <a className="block py-2 px-3 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
                  {navigationItem.title}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Header
