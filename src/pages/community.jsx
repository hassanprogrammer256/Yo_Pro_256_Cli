// Community.tsx
import { Typography } from '@mui/joy'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  FaUsers,
  FaDiscord,
  FaGithub,
  // FaYoutube,
  // FaTwitter,

  // FaEnvelope,
  FaSearch,
  // FaUserPlus,
  // FaComments,
  // FaCalendarAlt,
//   FaBook,
//   FaLightbulb,
  // FaRocket,
//   FaHeart,

  FaThumbsUp,
  FaWhatsapp,
  FaComments,
} from 'react-icons/fa'
import { channels, communityStats, contacts, events, HP_256_GITHUB_LINK, posts, SMART_AGENTS_GROUP_INVITE_LINK } from '../configs'

const Community = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <section className="min-h-screen bg-gradient-to-b from-black to-hassan-gray/20 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >

<Typography
                       level="h1"
                       sx={{
                         background: 'linear-gradient(135deg, #ff0000, #ff6b6b, #ffb400)',
                         WebkitBackgroundClip: 'text',
                         WebkitTextFillColor: 'transparent',
                         backgroundClip: 'text',
                         fontSize: { xs: '2.5rem', md: '3.5rem' },
                         fontWeight: 'bold',
                         mb: 2,
                       }}
                     >
                    Join Our Community
                     </Typography>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Connect with fellow developers, share knowledge, and lets grow together
          </p>
        </motion.div>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4 text-center">
            <FaUsers className="w-6 h-6 text-hassan-green mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{communityStats.members.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total Members</p>
          </div>
          {/* <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4 text-center">
            <FaUsers className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{communityStats.instructors.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Instructors</p>
          </div> */}
          <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4 text-center">
            <FaComments className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-2xl font-bold text-white">{communityStats.totalPosts.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total Posts</p>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-8 border-b border-hassan-green/20 pb-4"
        >
          {[
            { id: 'overview', label: 'Overview', icon: FaUsers },
            // { id: 'events', label: 'Events', icon: FaCalendarAlt },
            { id: 'forum', label: 'Forum', icon: FaComments },
            { id: 'channels', label: 'Channels', icon: FaDiscord },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-green-900 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-6 text-center">
                <FaWhatsapp className="w-8 h-8 text-hassan-green mx-auto mb-2" />
                <h3 className="text-white font-bold">Join Our WhatsApp Group</h3>
                <p className="text-sm text-gray-400 mb-3">Connect with the community</p>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={SMART_AGENTS_GROUP_INVITE_LINK}
                  target="_blank"
                  className="inline-block px-4 py-2 bg-green-900 text-gray-100 rounded-lg text-sm font-bold"
                >
                  Join Now
                </motion.a>
              </div>

              <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-6 text-center">
                <FaGithub className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-white font-bold">Open Source</h3>
                <p className="text-sm text-gray-400 mb-3">Contribute to projects</p>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={HP_256_GITHUB_LINK}
                  target="_blank"
                  className="inline-block px-4 py-2 bg-purple-400 text-black rounded-lg text-sm font-bold"
                >
                  Explore
                </motion.a>
              </div>
            </div>

            {/* Upcoming Events Preview */}
            {/* <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <FaCalendarAlt className="text-hassan-green" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {events.slice(0, 2).map((event) => (
                  <div key={event.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                    <img src={event.image} alt={event.title} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h4 className="text-white font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-400">{new Date(event.date).toLocaleString()}</p>
                    </div>
                    <span className="text-sm text-hassan-green">{event.attendees} attending</span>
                  </div>
                ))}
              </div>
            </div> */}
          </motion.div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {events.map((event) => (
              <div key={event.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl overflow-hidden hover:border-hassan-green/50 transition">
                <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      event.type === 'Workshop' ? 'bg-blue-500/20 text-blue-400' :
                      event.type === 'Live Q&A' ? 'bg-green-500/20 text-green-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {event.type}
                    </span>
                    <span className="text-xs text-gray-500">{event.attendees}/{event.maxAttendees} attendees</span>
                  </div>
                  <h3 className="text-white font-bold">{event.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{event.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <event.icon className="w-4 h-4 text-hassan-green" />
                      <span>{new Date(event.date).toLocaleString()}</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-1.5 bg-hassan-green text-black rounded-lg text-sm font-bold"
                    >
                      Register
                    </motion.button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Forum Tab */}
        {activeTab === 'forum' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-black/50 border border-red/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-red/60"
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4 hover:-translate-y-1 cursor-pointer transition-all">
                  <div className="flex items-start gap-3">
                    <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full border-2 border-yellow-900" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h4 className="text-white font-bold">{post.title}</h4>
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (
                            <span key={tag} className="text-xs px-2 border py-0.5 rounded-full text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{post.content}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span>{post.author}</span>
                          <span>{new Date(post.date).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <button className="flex items-center gap-1 text-gray-400 hover:text-hassan-green transition">
                            <FaThumbsUp className="w-4 h-4 text-yellow-400"  />
                            {post.likes}
                          </button>
                          {/* <button className="flex items-center gap-1 text-gray-400 hover:text-hassan-green transition">
                            <FaReply className="w-4 h-4" />
                            {post.replies}
                          </button>
                          <button className="flex items-center gap-1 text-gray-400 hover:text-hassan-green transition">
                            <FaShare className="w-4 h-4" />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* New Post Button */}
            {/* <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 px-6 py-3 bg-[rgba(255,0,0,0.1)]/20 text-white rounded-lg font-bold hover:shadow-lg transition flex items-center gap-2 mx-auto"
            >
              <FaUserPlus className="w-4 h-4" />
              Start New Discussion
            </motion.button> */}
          </motion.div>
        )}

        {/* Channels Tab */}
        {activeTab === 'channels' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {channels.map((channel) => (
              <div key={channel.name} className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-4 flex items-center justify-between hover:border-hassan-green/50 transition">
                <div className="flex items-center gap-3">
                  <channel.icon className="w-8 h-8 text-hassan-green" />
                  <div>
                    <h3 className="text-white font-bold">{channel.name}</h3>
                    <p className="text-sm text-gray-400">{channel.members.toLocaleString()} members</p>
                  </div>
                </div>
             <a href={channel.to} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-1.5  text-hassan-green border border-hassan-green/30 rounded-lg text-sm font-bold hover:bg-green-900 transition"
                >
                  Join
                </motion.button>
             </a>
              </div>
            ))}

            {/* Social Links */}
            <div className="bg-black/60 backdrop-blur-sm border border-hassan-green/20 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4 text-center">Connect on Social Media</h3>
              <div className="flex justify-center gap-4">
{contacts.map((item,idx) => <motion.a
                key={idx}
                  whileHover={{ scale: 1.1 }}
                  href={item.href}
                  target="_blank"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-green-300 hover:bg-hassan-green-300/20 transition"
                >
                  <item.icon className="w-6 h-6" />
                </motion.a>
                                  )
                                  }
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Community