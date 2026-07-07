import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
//   CardContent,
//   Avatar,
  Stack,
  Chip,
//   useTheme,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Divider,
  Link,
//   List,
//   ListItem,
//   ListItemContent,
//   ListItemDecorator,
} from '@mui/joy';
import {
  Person,
  School,
  Work,
  Code,
  LocationOn,
  Email,
  Phone,
  ArrowForward,
  CheckCircle,
  EmojiEvents,
//   Computer,
//   Cloud,
//   Security,
  People,
  Business,
  Flag,
//   Vision,
  Star,
  Verified,
  DateRange,
//   Place,
  Visibility,
//   Construction,
//   Apps,
//   Terminal,
//   Storage,
//   Speed,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { carouselImages, contacts, education, experience,personalInfo, skills, SMART_AGENTS_EMAIL, SMART_AGENTS_GROUP_INVITE_LINK, smartAgents } from "../configs";
// import { useMediaQuery } from '@mui/material';

function About() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Carousel state
  const [currentImage, setCurrentImage] = useState(0);
  
  

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Tab state
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ background: '#050505', minHeight: '100vh', color: 'white', pt: { xs: 8, md: 10 } }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 6 }}>
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
              About Hassan Programmer 256
            </Typography>
            <Typography
              level="body1"
              sx={{
                color: '#c0c0c0',
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Full Stack Engineer • DevOps Expert • Python Programmer
            </Typography>
          </Box>
        </motion.div>

        {/* Main Content - Profile & Carousel */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          {/* Left Side - Carousel */}
          <Grid xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,0,0,0.2)',
                  height: { xs: '300px', md: '500px' },
                  background: 'rgba(255,0,0,0.05)',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={carouselImages[currentImage]}
                    alt={`Hassan Programmer 256 - ${currentImage + 1}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.target.src = '/images/logos/hp_256.png';
                    }}
                  />
                </AnimatePresence>

                {/* Carousel Indicators */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1,
                    zIndex: 2,
                  }}
                >
                  {carouselImages.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        cursor: 'pointer',
                        background: currentImage === index ? '#ff0000' : 'rgba(255,255,255,0.3)',
                        border: currentImage === index ? '2px solid #ff0000' : 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: '#ff0000',
                          transform: 'scale(1.2)',
                        },
                      }}
                    />
                  ))}
                </Box>


              </Box>
            </motion.div>
          </Grid>

          {/* Right Side - Tabs */}
          <Grid xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card
                sx={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,0,0,0.1)',
                  p: { xs: 2, md: 3 },
                  height: '100%',
                }}
              >
                <Tabs
                  value={activeTab}
                  onChange={(e, value) => setActiveTab(value)}
                  sx={{ width: '100%',background: 'transparent' }}
                >
                  <TabList
                    sx={{
                
                      borderBottom: '1px solid rgba(255,0,0,0.1)',
                      gap: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Tab
                      sx={{
                        color: '#c0c0c0',
                        '&[aria-selected="true"]': {
                          color: '#ff0000',
                          borderBottom: '2px solid #ff0000',
                          
                        }
                      }}
                    >
                      <Person sx={{ mr: 1 }} /> Personal
                    </Tab>
                    <Tab
                      sx={{
                        color: '#c0c0c0',
                        '&[aria-selected="true"]': {
                          color: '#ff0000',
                          borderBottom: '2px solid #ff0000',
                        },
                      }}
                    >
                      <School sx={{ mr: 1 }} /> Education
                    </Tab>
                    <Tab
                      sx={{
               
                        color: '#c0c0c0',
                        '&[aria-selected="true"]': {
                          color: '#ff0000',
                          borderBottom: '2px solid #ff0000',
                        },
                      }}
                    >
                      <Work sx={{ mr: 1 }} /> Experience
                    </Tab>
                    <Tab
                      sx={{
                        color: '#c0c0c0',
                        '&[aria-selected="true"]': {
                          color: '#ff0000',
                          borderBottom: '2px solid #ff0000',
                        },
                      }}
                    >
                      <Code sx={{ mr: 1 }} /> Skills
                    </Tab>
                  </TabList>

                  {/* Personal Info Tab */}
                  <TabPanel value={0} sx={{ pt: 3 }}>
                    <Stack spacing={2}>
                      <Box>
                        <Typography level="h4" sx={{ color: '#ff0000', mb: 1 }}>
                          {personalInfo.fullName}
                        </Typography>
                        <Typography level="body1" sx={{ color: '#ffb400' }}>
                          {personalInfo.title}
                        </Typography>
                      </Box>

                      <Divider sx={{ background: 'rgba(255,0,0,0.1)' }} />

                      <Stack spacing={1.5}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Email sx={{ color: '#ff0000', fontSize: 20 }} />
                          <Typography level="body2" sx={{ color: '#c0c0c0' }}>
                            {personalInfo.email}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Phone sx={{ color: '#ffb400', fontSize: 20 }} />
                          <Typography level="body2" sx={{ color: '#c0c0c0' }}>
                            {personalInfo.phone}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <LocationOn sx={{ color: '#ff6b00', fontSize: 20 }} />
                          <Typography level="body2" sx={{ color: '#c0c0c0' }}>
                            {personalInfo.location}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Divider sx={{ background: 'rgba(255,0,0,0.1)' }} />

                      <Box>
                        <Typography level="body2" sx={{ color: '#c0c0c0', mb: 1 }}>
                          Languages
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                          {personalInfo.languages.map((lang) => (
                            <Chip
                              key={lang}
                              size="md"
                              variant="soft"
                              sx={{
                                background: 'rgba(255,0,0,0.1)',
                                color: '#ff0000',
                                border: '1px solid rgba(255,0,0,0.2)',
                              }}
                            >
                              {lang}
                            </Chip>
                          ))}
                        </Stack>
                      </Box>

                      <Box sx={{ mt: 2 }}>
                        <Typography level="body2" sx={{ color: '#c0c0c0', mb: 1 }}>
                          Social Links
                        </Typography>
                        <Stack direction="row" spacing={1}>
                           {contacts.map((item,idx) =>  <IconButton
                                           component="a"
                                           key={idx}
                                           href={item.href}
                                           target="_blank"
                                           sx={{
                                             color: '#c0c0c0',
                                             '&:hover': {
                                               color: '#ff0000',
                                               transform: 'translateY(-3px)',
                                             },
                                             transition: 'all 0.3s ease',
                                           }}
                                         >
                                          <item.icon />
                                         </IconButton>)
                                         }
                        </Stack>
                      </Box>
                    </Stack>
                  </TabPanel>

                  {/* Education Tab */}
                  <TabPanel value={1} sx={{ pt: 3 }}>
                    <Stack spacing={3}>
                      {education.map((edu, index) => (
                        <Box key={index}>
                          <Stack direction="row" spacing={2} alignItems="flex-start">
                            <School sx={{ color: '#ff0000', mt: 0.5 }} />
                            <Box flex={1}>
                              <Typography level="h4" sx={{ color: 'white' }}>
                                {edu.degree}
                              </Typography>
                              <Typography level="body2" sx={{ color: '#ffb400' }}>
                                {edu.institution}
                              </Typography>
                              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <DateRange sx={{ color: '#c0c0c0', fontSize: 16 }} />
                                <Typography level="body3" sx={{ color: '#c0c0c0' }}>
                                  {edu.year}
                                </Typography>
                              </Stack>
                              <Typography level="body3" sx={{ color: '#c0c0c0' }}>
                                {edu.description}
                              </Typography>
                            </Box>
                          </Stack>
                          {index < education.length - 1 && (
                            <Divider sx={{ mt: 2, background: 'rgba(255,0,0,0.1)' }} />
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </TabPanel>

                  {/* Experience Tab */}
                  <TabPanel value={2} sx={{ pt: 3 }}>
                    <Stack spacing={3}>
                      {experience.map((exp, index) => (
                        <Box key={index}>
                          <Stack direction="row" spacing={2} alignItems="flex-start">
                            <Work sx={{ color: '#ffb400', mt: 0.5 }} />
                            <Box flex={1}>
                              <Typography level="h4" sx={{ color: 'white' }}>
                                {exp.title}
                              </Typography>
                              <Typography level="body2" sx={{ color: '#ff0000' }}>
                                {exp.company}
                              </Typography>
                              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                <DateRange sx={{ color: '#c0c0c0', fontSize: 16 }} />
                                <Typography level="body3" sx={{ color: '#c0c0c0' }}>
                                  {exp.year}
                                </Typography>
                              </Stack>
                              <Typography level="body3" sx={{ color: '#c0c0c0' }}>
                                {exp.description}
                              </Typography>
                            </Box>
                          </Stack>
                          {index < experience.length - 1 && (
                            <Divider sx={{ mt: 2, background: 'rgba(255,0,0,0.1)' }} />
                          )}
                        </Box>
                      ))}
                    </Stack>
                  </TabPanel>

                  {/* Skills Tab */}
                  <TabPanel value={3} sx={{ pt: 3 }}>
                    <Stack spacing={3}>
                      <Box>
                        <Typography level="h4" sx={{ color: '#ff0000', mb: 2 }}>
                          Frontend
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                          {skills.frontend.map((skill) => (
                            <Chip
                              key={skill}
                              size="md"
                              variant="soft"
                              sx={{
                                background: 'rgba(255,0,0,0.1)',
                                color: '#ff0000',
                                border: '1px solid rgba(255,0,0,0.2)',
                              }}
                            >
                              {skill}
                            </Chip>
                          ))}
                        </Stack>
                      </Box>

                      <Box>
                        <Typography level="h4" sx={{ color: '#ffb400', mb: 2 }}>
                          Backend
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                          {skills.backend.map((skill) => (
                            <Chip
                              key={skill}
                              size="md"
                              variant="soft"
                              sx={{
                                background: 'rgba(255,180,0,0.1)',
                                color: '#ffb400',
                                border: '1px solid rgba(255,180,0,0.2)',
                              }}
                            >
                              {skill}
                            </Chip>
                          ))}
                        </Stack>
                      </Box>

                      <Box>
                        <Typography level="h4" sx={{ color: '#ff6b00', mb: 2 }}>
                          DevOps
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                          {skills.devops.map((skill) => (
                            <Chip
                              key={skill}
                              size="md"
                              variant="soft"
                              sx={{
                                background: 'rgba(255,107,0,0.1)',
                                color: '#ff6b00',
                                border: '1px solid rgba(255,107,0,0.2)',
                              }}
                            >
                              {skill}
                            </Chip>
                          ))}
                        </Stack>
                      </Box>

                      <Box>
                        <Typography level="h4" sx={{ color: '#ff3366', mb: 2 }}>
                          Databases & Others
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                          {skills.databases.map((skill) => (
                            <Chip
                              key={skill}
                              size="md"
                              variant="soft"
                              sx={{
                                background: 'rgba(255,51,102,0.1)',
                                color: '#ff3366',
                                border: '1px solid rgba(255,51,102,0.2)',
                              }}
                            >
                              {skill}
                            </Chip>
                          ))}
                          {skills.others.map((skill) => (
                            <Chip
                              key={skill}
                              size="md"
                              variant="soft"
                              sx={{
                                background: 'rgba(255,255,255,0.05)',
                                color: '#c0c0c0',
                                border: '1px solid rgba(255,255,255,0.1)',
                              }}
                            >
                              {skill}
                            </Chip>
                          ))}
                        </Stack>
                      </Box>
                    </Stack>
                  </TabPanel>
                </Tabs>
              </Card>
            </motion.div>
          </Grid>
        </Grid>

        {/* Smart Agents Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, rgba(255,0,0,0.1), rgba(255,180,0,0.05))',
              border: '2px solid rgba(255,0,0,0.2)',
              borderRadius: '20px',
              p: { xs: 4, md: 6 },
              mb: 6,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-50%',
                right: '-20%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(255,0,0,0.05), transparent)',
                borderRadius: '50%',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '-40%',
                left: '-20%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(255,180,0,0.05), transparent)',
                borderRadius: '50%',
              }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Business sx={{ color: '#ff0000', fontSize: 40 }} />
                <Typography
                  level="h2"
                  sx={{
                    color: '#ff0000',
                    fontSize: { xs: '1.8rem', md: '2.5rem' },
                    fontWeight: 'bold',
                  }}
                >
                  Smart Agents IT Solutions
                </Typography>
                <Chip
                  size="lg"
                  variant="soft"
                  sx={{
                    background: 'rgba(255,180,0,0.15)',
                    color: '#ffb400',
                    border: '1px solid rgba(255,180,0,0.3)',
                    fontWeight: 'bold',
                  }}
                >
                  <Verified sx={{ mr: 1, fontSize: 18 }} />
                  Since {smartAgents.founded}
                </Chip>
              </Stack>

              <Typography
                level="body1"
                sx={{
                  color: '#c0c0c0',
                  mb: 4,
                  lineHeight: 1.8,
                  fontSize: '1.05rem',
                }}
              >
                <Link
                  component={RouterLink}
                  to="/"
                  sx={{
                    color: '#ff0000',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Hassan Programmer 256
                </Link>{' '}
                is proud to be part of {' '}
                <span style={{ color: '#ffb400', fontWeight: 'bold' }}>
                  Smart Agents IT Solutions
                </span>
                , a leading technology company dedicated to providing innovative IT solutions
                and comprehensive tech education. We are committed to driving digital transformation
                and empowering individuals and businesses across Africa.
              </Typography>

              <Grid container spacing={4}>
                <Grid xs={12} md={6}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography level="h4" sx={{ color: '#ff0000', mb: 2 }}>
                        <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Location
                      </Typography>
                      <Typography level="body1" sx={{ color: '#c0c0c0' }}>
                        {smartAgents.location}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography level="h4" sx={{ color: '#ffb400', mb: 2 }}>
                        <People sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Founders
                      </Typography>
                      {smartAgents.founders.map((founder) => (
                        <Typography key={founder} level="body1" sx={{ color: '#c0c0c0' }}>
                          • {founder}
                        </Typography>
                      ))}
                    </Box>

                    <Box>
                      <Typography level="h4" sx={{ color: '#ff6b00', mb: 2 }}>
                        <EmojiEvents sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Experience
                      </Typography>
                      <Typography level="body1" sx={{ color: '#c0c0c0' }}>
                        {smartAgents.experience}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>

                <Grid xs={12} md={6}>
                  <Box>
                    <Typography level="h4" sx={{ color: '#ff3366', mb: 2 }}>
                      {/* <Services sx={{ mr: 1, verticalAlign: 'middle' }} /> */}
                      Services We Provide
                    </Typography>
                    <Grid container spacing={1}>
                      {smartAgents.services.map((service) => (
                        <Grid xs={12} sm={6} key={service}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <CheckCircle sx={{ color: '#ff0000', fontSize: 16 }} />
                            <Typography level="body2" sx={{ color: '#c0c0c0' }}>
                              {service}
                            </Typography>
                          </Stack>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4, background: 'rgba(255,0,0,0.1)' }} />

              <Grid container spacing={4}>
                <Grid xs={12} md={6}>
                  <Box>
                    <Typography level="h4" sx={{ color: '#ff0000', mb: 2 }}>
                      <Flag sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Our Mission
                    </Typography>
                    <Typography level="body1" sx={{ color: '#c0c0c0', lineHeight: 1.8 }}>
                      {smartAgents.mission}
                    </Typography>
                  </Box>
                </Grid>

                <Grid xs={12} md={6}>
                  <Box>
                    <Typography level="h4" sx={{ color: '#ffb400', mb: 2 }}>
                      <Visibility sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Our Vision
                    </Typography>
                    <Typography level="body1" sx={{ color: '#c0c0c0', lineHeight: 1.8 }}>
                      {smartAgents.vision}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 4, background: 'rgba(255,0,0,0.1)' }} />

              <Box>
                <Typography level="h4" sx={{ color: '#ff6b00', mb: 2 }}>
                  <Star sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Our Core Values
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {smartAgents.values.map((value) => (
                    <Chip
                      key={value}
                      size="lg"
                      variant="soft"
                      sx={{
                        background: 'rgba(255,255,255,0.05)',
                        color: 'white',
                        border: '1px solid rgba(255,0,0,0.2)',
                        '&:hover': {
                          background: 'rgba(255,0,0,0.1)',
                          borderColor: '#ff0000',
                        },
                      }}
                    >
                      {value}
                    </Chip>
                  ))}
                </Stack>
              </Box>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Button
                  component="a"
                  href= {SMART_AGENTS_GROUP_INVITE_LINK}
                  target="_blank"
                  size="lg"
                  sx={{
                    background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                    color: 'white',
                    px: 5,
                    py: 1.5,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #ff3333, #ff0000)',
                      boxShadow: '0 0 4px rgba(255,0,0,0.4)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                    borderRadius: '50px',
                    fontWeight: 'bold',
                  }}
                  endDecorator={<ArrowForward />}
                >
                  Get in Touch with Smart Agents
                </Button>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Contact & CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, rgba(255,0,0,0.05), rgba(255,180,0,0.02))',
              border: '1px solid rgba(255,0,0,0.1)',
              borderRadius: '20px',
              p: { xs: 4, md: 6 },
              textAlign: 'center',
            }}
          >
            <Typography
              level="h3"
              sx={{
                color: '#ff0000',
                mb: 2,
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 'bold',
              }}
            >
              Let's Work Together
            </Typography>
            <Typography
              level="body1"
              sx={{
                color: '#c0c0c0',
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.8,
              }}
            >
              Whether you need custom software development, DevOps solutions, or tech training,
              we're here to help you succeed. Let's build something amazing together!
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent="center"
            >
              <Button
                component="a"
                href= {`mailto:${SMART_AGENTS_EMAIL}`}
                target="_blank"
                size="lg"
                sx={{
                  background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                  color: 'white',
                  px: 5,
                  py: 1.5,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ff3333, #ff0000)',
                    boxShadow: '0 0 4px rgba(255,0,0,0.4)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                  borderRadius: '50px',
                  fontWeight: 'bold',
                }}
                endDecorator={<ArrowForward />}
              >
                Contact Us
              </Button>
              <Button
                component={RouterLink}
                to="/courses"
                variant="outlined"
                size="lg"
                sx={{
                  borderColor: 'rgba(255,180,0,0.5)',
                  color: '#ffb400',
                  px: 5,
                  py: 1.5,
                  '&:hover': {
                    borderColor: '#ffb400',
                    color: '#ffb400',
                    background: 'rgba(255,180,0,0.1)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.3s ease',
                  borderRadius: '50px',
                }}
              >
                Explore Courses
              </Button>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default About;