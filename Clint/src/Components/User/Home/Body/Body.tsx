function Body() {
  return (
    <main className="flex-1 px-4 md:px-8 py-8 flex flex-col md:flex-row gap-4">
      {/* Left Sidebar - Hidden on all small screens */}
      <aside className="hidden md:block md:w-1/4 bg-white/50 rounded-lg p-4 shadow-md backdrop-blur-sm">
        <h2 className="font-semibold text-gray-700 mb-2">Navigation</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#" className="text-gray-600 hover:text-black">Feed</a></li>
          <li><a href="#" className="text-gray-600 hover:text-black">Friends</a></li>
          <li><a href="#" className="text-gray-600 hover:text-black">Messages</a></li>
        </ul>
      </aside>

      {/* Main Content Container */}
      <div className="w-full flex flex-row flex-wrap gap-4">
        {/* Feed */}
        <section className="flex-1 min-w-[66%] bg-white/60 p-4 rounded-lg shadow-lg backdrop-blur-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">News Feed</h2>
          <div className="bg-white/80 rounded-md p-4 mb-4 shadow">
            <h3 className="font-bold text-gray-800">John Doe</h3>
            <p className="text-gray-600 text-sm">Just posted a new photo 📷</p>
          </div>
          {/* Add more posts */}
        </section>

        {/* Right Sidebar - Always visible */}
        <aside className="w-full sm:w-[30%] md:w-1/4 bg-white/50 rounded-lg p-4 shadow-md backdrop-blur-sm">
          <h2 className="font-semibold text-gray-700 mb-2">Trending</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>#NewUpdate</li>
            <li>#MemeLife</li>
            <li>#MondayMotivation</li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
export default Body;