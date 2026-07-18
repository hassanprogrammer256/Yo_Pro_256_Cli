// components/AdminFinancialView.jsx
import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import { FaDownload, FaPrint } from 'react-icons/fa'

const AdminFinancialView = ({ stats, revenueData }) => {
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#c0c0c0'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#c0c0c0' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      },
      y: {
        ticks: { color: '#c0c0c0' },
        grid: { color: 'rgba(255,255,255,0.05)' }
      }
    }
  }

  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: revenueData?.monthly || [3200, 3800, 4500, 4200, 5100, 5800, 6200, 5900, 6500, 7200, 8100, 12500],
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  }

  return (
    <motion.div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Financial Reports</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-hassan-green/20 text-hassan-green border border-hassan-green/30 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-hassan-green/30 transition">
            <FaDownload className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 bg-white/5 text-gray-400 border border-white/10 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition">
            <FaPrint className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
        <h3 className="text-white font-bold mb-4">Monthly Revenue</h3>
        <Line data={revenueChartData} options={chartOptions} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <p className="text-xs text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-white">${stats.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <p className="text-xs text-gray-500">Monthly Revenue</p>
          <p className="text-2xl font-bold text-white">${stats.monthlyRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4">
          <p className="text-xs text-gray-500">Average Transaction</p>
          <p className="text-2xl font-bold text-white">$76</p>
        </div>
      </div>
    </motion.div>
  )
}

export default AdminFinancialView