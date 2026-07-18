const tabs = ['dashboard', 'courses', 'progress', 'certificates']

const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-hassan-green/20 pb-4 justify-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === tab
              ? 'bg-red/30 text-white'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default TabNavigation