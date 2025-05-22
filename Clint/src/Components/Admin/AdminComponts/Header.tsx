export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
      <input
        type="text"
        placeholder="Search or type command..."
        className="w-1/2 px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
      />

      <div className="flex items-center gap-4">
        <button className="text-gray-300 hover:text-white">
          <i className="fas fa-cog" />
        </button>
        <button className="text-gray-300 hover:text-white">
          <i className="fas fa-bell" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
          <img
            src="https://i.pravatar.cc/100"
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
