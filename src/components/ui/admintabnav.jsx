// components/AdminTabNavigation.jsx
const tabs = ['dashboard', 'analytics', 'financial', 'users', 'announcements', 'feedback']

const AdminTabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-hassan-green/20 pb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === tab
              ? 'bg-hassan-green text-black'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default AdminTabNavigation