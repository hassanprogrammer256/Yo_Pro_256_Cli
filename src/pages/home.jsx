import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
  useTheme,
  IconButton,
//   CardMedia,
//   Divider,
} from '@mui/joy';
import {
  // Code,
  // School,
  People,
  ArrowForward,

//   EmojiEvents,
  DeveloperMode,
//   Terminal,
//   Storage,
//   Speed,
//   Star,
  Verified,
  Wifi,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { roles, instructors, contacts,SMART_AGENTS_EMAIL,floatAnimation, hero_services, hero_courses, HP_256_WHATSAPP_LINK } from "../configs";

function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);




  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = roles[currentRole];
      
      if (isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
      
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
      }

      if (!isDeleting && displayText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
    
      }
    };

    const timer = setTimeout(handleTyping, 10);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  return (
    <Box sx={{ background: '#000', minHeight: '100vh', color: 'white' }}>
      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 8, md: 0 },
        }}
      >
        {/* Background glow effects */}
        <Box
          sx={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            zIndex: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-30%',
            left: '-20%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(255,180,0,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            zIndex: 0,
          }}
        />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid xs={12} md={7}>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  fontSize: isMobile ? '2.5rem' : isTablet ? '3.5rem' : '4.5rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  lineHeight: 1.2,
                }}
              >
                <span style={{
                  background: 'linear-gradient(135deg, #ff0000, #ff6b6b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  HASSAN
                </span>
                <span style={{
                  background: 'linear-gradient(135deg, #fff, #ccc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {' '}PROGRAMMER{' '}
                </span>
                <span style={{
                  background: 'linear-gradient(135deg, #ffb400, #fa930d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  256
                </span>
              </motion.h1>

              <Box sx={{ minHeight: '60px', mb: 2 }}>
                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{
                    fontSize: isMobile ? '1.3rem' : '1.8rem',
                    color: '#c0c0c0',
                    fontWeight: 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {/* <span style={{ color: '#ff0000' }}>$</span> */}
                  <span style={{ color: '#ffb400' }}>A </span> 
                  <span style={{ color: '#c0c0c0' }}>{displayText}</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    style={{
                      color: '#ff0000',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                    }}
                  >
                    |
                  </motion.span>
                </motion.h2>
              </Box>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{
                  fontSize: isMobile ? '1rem' : '1.2rem',
                  color: '#ffb400',
                  marginBottom: '2rem',
                  maxWidth: '600px',
                  lineHeight: 1.8,
                }}
              >
                <span style={{ color: '#c0c0c0' }}>Teching</span> You{' '}
                <span style={{ color: '#ff0000', fontWeight: 'bold' }}>Ahead</span>
                
                <br />
                <span style={{ color: '#c0c0c0', fontSize: '0.9rem' }}>
                  Full Stack Engineer • DevOps • Software Engineer • Python Programmer
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ mb: 4 }}
                >
                  <Button
                    component={Link}
                    to="/courses"
                    size="lg"
                    sx={{
                      background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #ff3333, #ff0000)',
                        boxShadow: '0 0 30px rgba(255,0,0,0.4)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                      borderRadius: '50px',
                      fontWeight: 'bold',
                    }}
                    endDecorator={<ArrowForward />}
                  >
                    Start Learning
                  </Button>
                  <Button
                    component={Link}
                    to="/projects"
                    variant="outlined"
                    size="lg"
                    sx={{
                      borderColor: 'rgba(255,0,0,0.5)',
                      color: '#c0c0c0',
                      px: 4,
                      py: 1.5,
                      '&:hover': {
                        borderColor: '#ff0000',
                        color: '#ff0000',
                        background: 'rgba(255,0,0,0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                      borderRadius: '50px',
                    }}
                  >
                    View Projects
                  </Button>
                </Stack>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
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
              </motion.div>
            </Grid>

            <Grid xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '400px',
                    height: '400px',
                  }}
                >
                  <motion.div
                    // animate={floatAnimation}
                    style={{
                      width: '100%',
                      height: '100%',
                      // borderRadius: '50%',
                      // background: 'linear-gradient(135deg, rgba(255,0,0,0.2), rgba(255,180,0,0.1))',
                      background: 'trannsparent',
                      // border: '2px solid rgba(255,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    {/* <Avatar */}
                    <img
                      src="/images/instructors/hp256.png"
                      alt="Hassan Programmer 256"
                      // sx={{
                      //   width: '450px',
                      //   height: '450px',
                      //   // border: '4px solid #ff0000',
                      //   boxShadow: '0 0 10px rgba(255,0,0,0.3)',
                      // }}
                    />
                      {/* HP */}
                    {/* </Avatar> */}


                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      {/* <Box component="section" sx={{ py: 8, background: 'rgba(255,0,0,0.02)' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Grid container spacing={3} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid xs={6} md={3} key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,0,0,0.1)',
                        textAlign: 'center',
                        py: 3,
                        '&:hover': {
                          borderColor: 'rgba(255,0,0,0.3)',
                          boxShadow: '0 0 30px rgba(255,0,0,0.1)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <CardContent>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Typography
                            level="h1"
                            sx={{
                              color: '#ff0000',
                              fontSize: { xs: '2rem', md: '3rem' },
                              fontWeight: 'bold',
                            }}
                          >
                            {stat.number}
                          </Typography>
                        </motion.div>
                        <Typography
                          level="body1"
                          sx={{
                            color: '#c0c0c0',
                            fontSize: { xs: '0.9rem', md: '1rem' },
                          }}
                        >
                          {stat.label}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box> */}

   {/* About Hassan Programmer Section - Updated */}
<Box component="section" sx={{ py: 8 }}>
  <Container maxWidth="xl">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Typography
        level="h2"
        sx={{
          color: '#ff0000',
          textAlign: 'center',
          mb: 2,
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 'bold',
        }}
      >
        About Hassan Programmer 256
      </Typography>
      <Typography
        level="body1"
        sx={{
          color: '#c0c0c0',
          textAlign: 'center',
          mb: 6,
          maxWidth: '700px',
          mx: 'auto',
        }}
      >
        Full Stack Engineer • DevOps • Software Engineer • Python Programmer
      </Typography>
    </motion.div>

    <Grid container spacing={6} alignItems="center">
      {/* Images Side - 2 Pictures */}
      <Grid xs={12} md={6}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Box
                sx={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,0,0,0.2)',
                  '&:hover': {
                    borderColor: 'rgba(255,0,0,0.6)',
                    transform: 'scale(1.02)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 0 40px rgba(255,0,0,0.15)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <img
                  src="/images/instructors/hp256.png"
                  alt="Hassan Programmer 256 - Profile"
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'contain',
                  }}
                  onError={(e) => {
                    e.target.src = '/images/logos/hp_256.png';
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Grid>

      {/* Profile Content Side */}
      <Grid xs={12} md={6}>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ pl: { md: 4 } }}>

            <Typography
              level="h3"
              sx={{
                color: 'white',
                mb: 2,
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 'bold',
              }}
            >
              Hi, I'm{' '}
              <span style={{
                background: 'linear-gradient(135deg, #ff0000, #ff6b6b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Hassan
              </span>
            </Typography>

            <Typography
              level="body1"
              sx={{
                color: '#ffb400',
                mb: 3,
                fontSize: '1.1rem',
              }}
            >
              Full Stack Engineer • DevOps Expert • Python Programmer
            </Typography>

            <Typography
              level="body1"
              sx={{
                color: '#c0c0c0',
                mb: 3,
                lineHeight: 1.8,
              }}
            >
              I am a passionate Full Stack Engineer with over 5 years of experience in 
              software development, DevOps, and cloud architecture. I specialize in building 
              scalable web applications, automating deployment pipelines, and mentoring the 
              next generation of developers.
            </Typography>

            <Typography
              level="body1"
              sx={{
                color: '#c0c0c0',
                mb: 4,
                lineHeight: 1.8,
              }}
            >
              As a Member of <span style={{ color: '#ff0000', fontWeight: 'bold' }}>Smart Agents IT Solutions</span>, 
              We are dedicated to providing cutting-edge technology solutions and comprehensive 
              tech education. My mission is to "Tech You Ahead" by sharing knowledge and 
              empowering others to succeed in the tech industry.
            </Typography>

            {/* Skills Tags */}
            {/* <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 4, gap: 1 }}>
              <Chip
                size="md"
                variant="soft"
                sx={{
                  background: 'rgba(255,0,0,0.1)',
                  color: '#ff0000',
                  border: '1px solid rgba(255,0,0,0.2)',
                }}
              >
                React / Next.js
              </Chip>
              <Chip
                size="md"
                variant="soft"
                sx={{
                  background: 'rgba(255,180,0,0.1)',
                  color: '#ffb400',
                  border: '1px solid rgba(255,180,0,0.2)',
                }}
              >
                Python
              </Chip>
              <Chip
                size="md"
                variant="soft"
                sx={{
                  background: 'rgba(255,107,0,0.1)',
                  color: '#ff6b00',
                  border: '1px solid rgba(255,107,0,0.2)',
                }}
              >
                Node.js
              </Chip>
              <Chip
                size="md"
                variant="soft"
                sx={{
                  background: 'rgba(255,51,102,0.1)',
                  color: '#ff3366',
                  border: '1px solid rgba(255,51,102,0.2)',
                }}
              >
                Docker / Kubernetes
              </Chip>
              <Chip
                size="md"
                variant="soft"
                sx={{
                  background: 'rgba(255,255,255,0.05)',
                  color: '#c0c0c0',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                DevOps
              </Chip>
            </Stack> */}

          </Box>
        </motion.div>
      </Grid>
    </Grid>
  </Container>
</Box>

      {/* Services Section */}
      <Box component="section" sx={{ py: 8, background: 'rgba(255,0,0,0.02)' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              level="h2"
              sx={{
                color: '#ff0000',
                textAlign: 'center',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 'bold',
              }}
            >
              What We Offer At Smart Agents
            </Typography>
            <Typography
              level="body1"
              sx={{
                color: '#c0c0c0',
                textAlign: 'center',
                mb: 6,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Comprehensive solutions to help you grow and succeed in the tech industry
            </Typography>
          </motion.div>

          <Grid container spacing={3}>
            {hero_services.map((service, index) => (
              <Grid xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Card
                    sx={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,0,0,0.1)',
                      textAlign: 'center',
                      p: 3,
                      height: '100%',
                      '&:hover': {
                        borderColor: `rgba(255,0,0,0.3)`,
                        boxShadow: `0 0 30px rgba(255,0,0,0.1)`,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent>
                      <motion.div
                        animate={floatAnimation}
                        style={{
                          display: 'inline-block',
                          color: service.color,
                          marginBottom: '1rem',
                        }}
                      >
                        <service.icon sx={{ fontSize: 40 }} />
                      </motion.div>
                      <Typography
                        level="h4"
                        sx={{
                          color: 'white',
                          mb: 1,
                          fontWeight: 'bold',
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        level="body2"
                        sx={{
                          color: '#c0c0c0',
                          fontSize: '0.9rem',
                        }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Instructors Section */}
      <Box component="section" sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              level="h2"
              sx={{
                color: '#ff0000',
                textAlign: 'center',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 'bold',
              }}
            >
              Meet Your Instructors
            </Typography>
            <Typography
              level="body1"
              sx={{
                color: '#c0c0c0',
                textAlign: 'center',
                mb: 6,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Learn from industry experts with years of experience
            </Typography>
          </motion.div>

          <Grid container spacing={4} justifyContent="center">
            {instructors.map((instructor, index) => (
              <Grid xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <Card
                    sx={{

                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,0,0,0.1)',
                      p: 3,
                      '&:hover': {
                        borderColor: 'rgba(255,0,0,0.3)',
                        boxShadow: '0 0 30px rgba(255,0,0,0.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <CardContent>
                      <Stack direction={{xs:'column',sm:'row'}} spacing={3} alignItems="center">
                        <Avatar
                          src={instructor.image}
                          alt={instructor.name}
                          sx={{
                            background:'transparent',
                            objectFit: 'contain',
                            width: 200,
                            height: 200,
                            border: '1px solid #ff0000',
                          }}
                        >
                          {instructor.name.charAt(0)}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography level="h4" sx={{ color: '#ff0000', fontWeight: 'bold' }}>
                            {instructor.name}
                          </Typography>
                          <Typography level="body2" sx={{ color: '#ffb400', mb: 1 }}>
                            {instructor.title}
                          </Typography>
                          <Typography level="body2" sx={{ color: '#c0c0c0', mb: 2 }}>
                            {instructor.bio}
                          </Typography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                            {instructor.expertise.map((skill) => (
                              <Chip
                                key={skill}
                                size="sm"
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
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Courses Preview Section */}
      <Box component="section" sx={{ py: 8, background: 'rgba(255,0,0,0.02)' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              level="h2"
              sx={{
                color: '#ff0000',
                textAlign: 'center',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 'bold',
              }}
            >
              Featured Courses
            </Typography>
            <Typography
              level="body1"
              sx={{
                color: '#c0c0c0',
                textAlign: 'center',
                mb: 6,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Start your learning journey with SmartAgents top-rated courses
            </Typography>
          </motion.div>

          <Grid container spacing={4}>
            {hero_courses.map((course, index) => (
              <Grid xs={12} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                >
                  <Card
                    sx={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,0,0,0.1)',
                      overflow: 'hidden',
                      height: '100%',
                      '&:hover': {
                        borderColor: 'rgba(255,0,0,0.3)',
                        boxShadow: '0 0 30px rgba(255,0,0,0.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Box
                      sx={{
                        height: 300,
                        background: 'linear-gradient(135deg, rgba(255,0,0,0.2), rgba(255,180,0,0.1))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                      }}
                    >
                      <Box
                        component="img"
                        src={course.thumbnail}
                        alt={course.title}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          background: 'rgba(255,0,0,0.9)',
                          px: 2,
                          py: 0.5,
                          borderRadius: '20px',
                        }}
                      >
                        <Typography level="body3" sx={{ color: 'white', fontSize: '0.75rem' }}>
                          {course.level}
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent>
                      <Typography level="h4" sx={{ color: 'white', mb: 1 }}>
                        {course.title}
                      </Typography>
                      <Typography level="body2" sx={{ color: '#c0c0c0', mb: 2 }}>
                        {course.description}
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Chip
                          size="sm"
                          variant="soft"
                          sx={{
                            background: 'rgba(255,180,0,0.1)',
                            color: '#ffb400',
                            border: '1px solid rgba(255,180,0,0.2)',
                          }}
                        >
                          {course.duration}
                        </Chip>
                        <Button
                          component={Link}
                          to={`/courses/${course?.title.toLowerCase().replace(/\s+/g, '-')}`}
                          size="sm"
                          sx={{
                            background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                            color: 'white',
                            ml: 'auto',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #ff3333, #ff0000)',
                            },
                          }}
                        >
                          Learn More
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
               <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-5 text-center"
        >
          <div className="inline-block bg-black/60 backdrop-blur-sm border border-amber-500 rounded-2xl px-8 py-6">
            <p className="text-gray-300 mb-4">
              <span className="text-hassan-green font-bold">Limited Time Offer:</span> Get 20% off when you enroll in any course!
            </p>
           <Link to={'/courses'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-black text-gray-200 font-bold rounded-lg hover:shadow-sm border hover:border-yellow-900/30  transition-all"
            >
              Browse All Courses →
            </motion.button>
           </Link>
          </div>
        </motion.div>
        </Container>
      </Box>

      {/* Smart Agents & Hiring Section */}
      <Box component="section" sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, rgba(255,0,0,0.15), rgba(255,180,0,0.08))',
                border: '2px solid rgba(255,0,0,0.2)',
                borderRadius: '20px',
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Typography
                  level="h2"
                  sx={{
                    color: '#ff0000',
                    mb: 2,
                    fontSize: { xs: '2rem', md: '2.8rem' },
                    fontWeight: 'bold',
                  }}
                >
                  <Verified sx={{ fontSize: 40, verticalAlign: 'middle', mr: 2 }} />
                  Smart Agents IT Solutions
                </Typography>
              </motion.div>
              <Typography
                level="body1"
                sx={{
                  color: '#ffb400',
                  mb: 3,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                }}
              >
                Hassan Programmer 256 is proudly part of Smart Agents
              </Typography>
              <Typography
                level="body1"
                sx={{
                  color: '#c0c0c0',
                  mb: 4,
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.8,
                }}
              >
                We provide cutting-edge IT solutions, software development, and tech education.
                Our team of experts is ready to help you build your next big idea.
              </Typography>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid xs={12} md={4}>
                  <Stack spacing={1} alignItems="center">
                    <DeveloperMode sx={{ color: '#ff0000', fontSize: 40 }} />
                    <Typography level="h4" sx={{ color: 'white' }}>
                      Custom Software
                    </Typography>
                    <Typography level="body2" sx={{ color: '#c0c0c0' }}>
                      Tailored solutions for your business needs
                    </Typography>
                  </Stack>
                </Grid>
                <Grid xs={12} md={4}>
                  <Stack spacing={1} alignItems="center">
                    <Wifi sx={{ color: '#ffb400', fontSize: 40 }} />
                    <Typography level="h4" sx={{ color: 'white' }}>
                      Networking
                    </Typography>
                    <Typography level="body2" sx={{ color: '#c0c0c0' }}>
                      Scalable networking services and infrastructures
                    </Typography>
                  </Stack>
                </Grid>
                <Grid xs={12} md={4}>
                  <Stack spacing={1} alignItems="center">
                    <People sx={{ color: '#ff6b00', fontSize: 40 }} />
                    <Typography level="h4" sx={{ color: 'white' }}>
                      Tech Training
                    </Typography>
                    <Typography level="body2" sx={{ color: '#c0c0c0' }}>
                      Comprehensive courses and mentorship
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  component="a"
                  href={HP_256_WHATSAPP_LINK}
                  target='_blank'
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
                  Hire Hassan Programmer
                </Button>
                <Button
                  component="a"
                  href={`mailto:${SMART_AGENTS_EMAIL}`}
                  target="_blank"
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
                  Contact Smart Agents
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box component="section" sx={{ py: 8, background: 'rgba(255,0,0,0.02)' }}>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                background: 'linear-gradient(135deg, rgba(255,0,0,0.1), rgba(255,180,0,0.05))',
                border: '1px solid rgba(255,0,0,0.2)',
                borderRadius: '20px',
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-20%',
                  width: '400px',
                  height: '400px',
                  background: 'radial-gradient(circle, rgba(255,0,0,0.1), transparent)',
                  borderRadius: '50%',
                }}
              />
              <motion.div
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 2,
                }}
                style={{
                  position: 'absolute',
                  bottom: '-40%',
                  left: '-20%',
                  width: '300px',
                  height: '300px',
                  background: 'radial-gradient(circle, rgba(255,180,0,0.08), transparent)',
                  borderRadius: '50%',
                }}
              />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Typography
                    level="h2"
                    sx={{
                      color: '#ff0000',
                      mb: 2,
                      fontSize: { xs: '1.8rem', md: '2.5rem' },
                      fontWeight: 'bold',
                    }}
                  >
                    Ready to Level Up?
                  </Typography>
                </motion.div>
                <Typography
                  level="body1"
                  sx={{
                    color: '#c0c0c0',
                    mb: 4,
                    maxWidth: '600px',
                    mx: 'auto',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                  }}
                >
                  Join thousands of students who have transformed their careers through our comprehensive courses and mentorship programs.
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  justifyContent="center"
                >
                  <Button
                    component={Link}
                    to="/courses"
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
                    Get Started Today
                  </Button>
                  <Button
                    component={Link}
                    to="/community"
                    variant="outlined"
                    size="lg"
                    sx={{
                      borderColor: 'rgba(255,0,0,0.5)',
                      color: '#c0c0c0',
                      px: 5,
                      py: 1.5,
                      '&:hover': {
                        borderColor: '#ff0000',
                        color: '#ff0000',
                        background: 'rgba(255,0,0,0.1)',
                        transform: 'scale(1.05)',
                      },
                      transition: 'all 0.3s ease',
                      borderRadius: '50px',
                    }}
                  >
                    Join Community
                  </Button>
                </Stack>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </Box>
  );
}

export default Home;