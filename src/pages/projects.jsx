// Projects.tsx
import { Search } from '@mui/icons-material'
import {Input, Typography } from '@mui/joy'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaUsers,
  FaStar,
  // FaCalendarAlt,
//   FaTag,
//   FaPlay,
//   FaHeart,
  FaEye,
  FaPlayCircle,
} from 'react-icons/fa'
import { projects } from '../configs'



// Filter categories
const categories = ['All', 'Full Stack', 'Frontend', 'Game Development', 'Software Development']

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [, setHoveredProject] = useState(null)
    const [isHovered, setIsHovered] = useState(false)

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

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
                      Featured Projects
                     </Typography>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our portfolio of full-stack applications, AI solutions, and DevOps tools
          </p>
          
          {/* Stats */}
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaCode className="text-[255,0,0,0.1]" />
              <span className="font-bold text-white">{projects.length}</span>
              Total Projects
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaUsers className="text-[255,0,0,0.1]" />
              <span className="font-bold text-white">{projects.reduce((acc, p) => acc + p.teamSize, 0)}</span>
              Team Members
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaStar className="text-yellow-400" />
              <span className="font-bold text-white">{projects.reduce((acc, p) => acc + p.stars, 0)}</span>
              Total Stars
            </div>
          </div>
        </motion.div>

        {/* Filter & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between"
        >
          <div className="flex flex-wrap gap-2">

            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[rgba(255,0,0,0.1)] text-white border border-[rgba(255,0,0,0.1)]'
                    : 'bg-black/50  text-white hover:border-[255,0,0,0.1]'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
          
          <div className="relative w-full md:w-64">
                      <Input
                              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              color='danger'
              onChange={(e) => setSearchTerm(e.target.value)}
                              startDecorator={<Search />}
                              sx={{
                                background: 'rgba(255,255,255,0.05)',
                                borderColor: 'rgba(255,0,0,0.2)',
                                color: 'white',
                                '&:hover': {
                                  borderColor: 'rgba(255,0,0,0.4)',
                                },
                                '&:focus-within': {
                                  borderColor: '#ff0000',
                                },
                              }} />
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
           
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative cursor-pointer py-3 bg-black/60 backdrop-blur-sm rounded-2xl border border-[rgba(255,0,0,0.1)] overflow-hidden transition-all duration-300 hover:shadow-[0 0 30px rgba(255,0,0,0.1)] hover:border-[rgba(255,0,0,0.3)]"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                          <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
      onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          className="absolute inset-0 flex items-center justify-center bg-black/50"
        >
          <div className="w-16 h-16 rounded-full bg-green-600/20 backdrop-blur-sm border-2 border-green-500 flex items-center justify-center">
            <FaPlayCircle className="w-10 h-10 text-green-700" />
          </div>
        </motion.div>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    project.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                {/* Tech Icons */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {project.techIcons.map((Icon, i) => (
                    <div key={i} className="w-8 h-8 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center border border-[255,0,0,0.1]/20">
                      <Icon className="w-4 h-4 text-[255,0,0,0.1]" />
                    </div>
                  ))}
                </div>
                
                {/* View Count */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-gray-400 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-full">
                  <FaEye className="w-3 h-3" />
                  <span>{project.views}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-red group-hover:text-[255,0,0,0.1] transition-colors truncate text-nowrap">
                    {project.title}
                  </h3>
                  {/* <span className="text-xs text-gray-500 bg-black/50 px-2 py-1 rounded-full border border-white/10">
                    {project.category}
                  </span> */}
                </div>

                <p className="text-sm text-gray-400 mb-3 line-clamp-2 truncate text-nowrap">
                  {project.description}
                </p>

                {/* Technologies */}
                {/* <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <Chip
                    key={i}
                        size="sm"
                        variant="soft"
                        sx={{
                          background: 'transparent',
                          color: '#ccc',
                          border: '1px solid rgba(255,255,0,0.2)',
                        }}
                      >
                        {tech}
                      </Chip>
                  ))}
                  {project.technologies.length > 4 && (
                    <Chip  size="md" variant="soft" sx={{background: 'rgba(255,180,0,0.1)',color: '#ffb400',border: '1px solid rgba(255,180,0,0.2)'}} >+{project.technologies.length - 4} </Chip>
                  )}
                </div> */}

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-400 w-3 h-3" />
                      {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaUsers className="text-[255,0,0,0.1] w-3 h-3" />
                      {project.teamSize}
                    </span>
                  </div>
                  {/* <span className="flex items-center gap-1">
                    <FaCalendarAlt className="w-3 h-3" />
                    {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span> */}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-black/50 border border-[255,0,0,0.1]/30 text-[255,0,0,0.1] rounded-lg text-sm font-medium hover:bg-[255,0,0,0.1]/10 hover:border-[255,0,0,0.1] transition-all flex items-center justify-center gap-2"
                  >
                    <FaGithub className="w-4 h-4" />
                    Code
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 bg-red text-white rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No projects found matching your criteria</p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >

        </motion.div>
      </div>
    </section>
  )
}

export default Projects