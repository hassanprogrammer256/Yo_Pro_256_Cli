// components/AdminAnalyticsView.jsx
import { motion } from 'framer-motion'
import { Doughnut } from 'react-chartjs-2'

const AdminAnalyticsView = ({ stats }) => {
  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#c0c0c0'
        }
      }
    }
  }

  const userDistribution = {
    labels: ['Students', 'Instructors', 'Admins'],
    datasets: [{
      data: [stats.totalStudents, stats.totalInstructors, 5],
      backgroundColor: ['#00ff88', '#ffb400', '#ff6b6b'],
      borderColor: ['#00ff88', '#ffb400', '#ff6b6b'],
      borderWidth: 2,
    }]
  }

  const revenueBreakdown = {
    labels: ['Silver', 'Gold', 'Platinum'],
    datasets: [{
      data: [12000, 25000, 8290],
      backgroundColor: ['#c0c0c0', '#ffb400', '#00ff88'],
      borderColor: ['#c0c0c0', '#ffb400', '#00ff88'],
      borderWidth: 2,
    }]
  }

  const statsItems = [
    { label: 'Active Users', value: stats.activeUsers },
    { label: 'Completion Rate', value: `${stats.completionRate}%` },
    { label: 'Pending Payments', value: stats.pendingPayments },
    { label: 'Monthly Growth', value: '+18%', color: 'text-green-500' }
  ]

  return (
    <motion.div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsItems.map((item, index) => (
          <div key={index} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className={`text-2xl font-bold ${item.color || 'text-white'}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <h3 className="text-white font-bold mb-4">User Distribution</h3>
          <Doughnut data={userDistribution} options={doughnutOptions} />
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <h3 className="text-white font-bold mb-4">Revenue Breakdown</h3>
          <Doughnut data={revenueBreakdown} options={doughnutOptions} />
        </div>
      </div>
    </motion.div>
  )
}

export default AdminAnalyticsView