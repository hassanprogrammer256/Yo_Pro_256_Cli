// components/AdminStatsCards.jsx
import { FaUsers, FaDollarSign, FaBook, FaChartBar, FaRegArrowAltCircleUp } from 'react-icons/fa'

const AdminStatsCards = ({ stats }) => {
  const cards = [
    {
      label: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: FaUsers,
      color: 'text-hassan-green',
      change: '+12%',
      changeColor: 'text-green-500'
    },
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: FaDollarSign,
      color: 'text-green-400',
      change: '+23%',
      changeColor: 'text-green-500'
    },
    {
      label: 'Courses',
      value: stats.totalCourses,
      icon: FaBook,
      color: 'text-blue-400',
      change: '+2 new',
      changeColor: 'text-green-500'
    },
    {
      label: 'Avg Rating',
      value: stats.averageRating,
      icon: FaChartBar,
      color: 'text-yellow-400',
      change: '+0.3',
      changeColor: 'text-green-500'
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-white">{card.value}</p>
            </div>
            <card.icon className={`w-8 h-8 ${card.color} opacity-50`} />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <FaRegArrowAltCircleUp className={`${card.changeColor} w-3 h-3`} />
            <span className={`text-xs ${card.changeColor}`}>{card.change}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminStatsCards