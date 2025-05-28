export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 shadow-lg flex flex-col p-4">
      <h1 className="flex items-center text-2xl font-bold text-blue-400 mb-8">
        <img 
          src="/logo.png" 
          alt="icon" 
          className="w-10 h-10 rounded-full mr-2"
        />
        Socials
      </h1>

      <nav className="flex-1">
        <ul className="space-y-2 text-sm">
          <li>
            <a href="#" className="flex items-center px-4 py-2 rounded bg-blue-600">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              Ecommerce
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              Calendar
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              User Profile
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              Forms
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              Tables
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              Charts
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-700 rounded">
              UI Elements
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
