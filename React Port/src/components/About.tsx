function About() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        About This Project
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Technology Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Frontend</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>React 18 with TypeScript</li>
              <li>Vite for fast development</li>
              <li>React Router for navigation</li>
              <li>Tailwind CSS for styling</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-2">Development</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>ESLint for code quality</li>
              <li>TypeScript for type safety</li>
              <li>Hot module replacement</li>
              <li>Modern ES6+ features</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Project Features
        </h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-gray-800">Modern React Architecture</h3>
            <p className="text-gray-600">Built with the latest React patterns and best practices</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-gray-800">TypeScript Integration</h3>
            <p className="text-gray-600">Full type safety throughout the application</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-semibold text-gray-800">Responsive Design</h3>
            <p className="text-gray-600">Mobile-first approach with Tailwind CSS</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-semibold text-gray-800">Fast Development</h3>
            <p className="text-gray-600">Vite provides instant hot reloading and fast builds</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
