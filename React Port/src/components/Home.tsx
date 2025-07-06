import { useState } from 'react'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className="text-center py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to React Port
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A modern React application built with TypeScript and Vite
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Interactive Counter
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            onClick={() => setCount((count) => count + 1)}
          >
            Count is {count}
          </button>
          <p className="text-gray-600 mt-4">
            Click the button to increment the counter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">⚡ Fast</h3>
            <p className="text-gray-600">Built with Vite for lightning-fast development</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🔧 TypeScript</h3>
            <p className="text-gray-600">Type-safe development with TypeScript</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🎨 Tailwind</h3>
            <p className="text-gray-600">Beautiful styling with Tailwind CSS</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
