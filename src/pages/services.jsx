import { motion } from "framer-motion";
import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
//   CardContent,
  Avatar,
  Stack,
  Chip,
//   useTheme,
//   IconButton,
  Input,
//   Tabs,
//   TabList,
//   Tab,
//   TabPanel,
  Divider,
//   Link,
  // Badge,
//   Sheet,
  Modal,
  ModalDialog,
  ModalClose,
  List,
  ListItem,
  ListItemDecorator,
  ListItemContent,
} from '@mui/joy';
import {
  Search,
  FilterList,
//   Computer,
  Code,
//   GraphicEq,
//   Storage,
//   Router,
//   Dns,
//   Terminal,
//   PhotoCamera,
//   TrendingUp,
//   People,
//   Business,
//   Star,
  // Verified,
  ArrowForward,
//   GitHub,
//   LinkedIn,
//   Twitter,
//   WhatsApp,
  Email,
  Phone,
//   LocationOn,
  CheckCircle,
//   Shield,
//   DataUsage,
//   Wifi,
//   CellWifi,
//   Lan,
//   Hub,
//   Memory,
//   Mouse,
//   Extension,
//   Webhook,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { service_categories, services, SMART_AGENTS_EMAIL } from "../configs";
// import { useMediaQuery } from '@mui/material';

function Services() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
//   const [activeTab, setActiveTab] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // const getCategoryCount = (categoryId) => {
  //   if (categoryId === 'all') return services.length;
  //   return services.filter(s => s.category === categoryId).length;
  // };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

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
              Smart Agents Services
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
              Comprehensive technology solutions powered by Smart Agents IT Solutions
            </Typography>
          </Box>
        </motion.div>

        {/* Search & Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card
            sx={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,0,0,0.1)',
              p: 3,
              mb: 4,
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid xs={12} md={6}>
                <Input
                color='danger'
                  placeholder="Search services..."
                  value={searchTerm}
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
                  }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <FilterList sx={{ color: '#c0c0c0', mr: 1 }} />
                  {service_categories.map((category) => (
                    <Chip
                      key={category.id}
                      variant={selectedCategory === category.id ? 'solid' : 'outlined'}
                      color={selectedCategory === category.id ? 'danger' : 'neutral'}
                      onClick={() => setSelectedCategory(category.id)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                      startDecorator={<category.icon />}
                    >
                      {category.label}
                     
                    </Chip>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Card>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            {filteredServices.map((service) => (
              <Grid xs={12} md={6} lg={4} key={service.id}>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    sx={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,0,0,0.1)',
                      p: 3,
                      height: '100%',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'rgba(255,0,0,0.4)',
                        boxShadow: '0 0 30px rgba(255,0,0,0.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => handleServiceClick(service)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ color: '#ff0000' }}>
                        <service.icon sx={{ fontSize: 40 }} />
                      </Box>
                      <Chip
                        size="sm"
                        variant="soft"
                        sx={{
                          background: 'rgba(255,0,0,0.1)',
                          color: '#ff0000',
                          border: '1px solid rgba(255,0,0,0.2)',
                        }}
                      >
                        {service_categories.find(c => c.id === service.category)?.label}
                      </Chip>
                    </Box>

                    <Typography level="h4" sx={{ color: 'white', mb: 1 }}>
                      {service.title}
                    </Typography>
                    <Typography level="body2" sx={{ color: '#c0c0c0', mb: 2 }}>
                      {service.description}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography level="body3" sx={{ color: '#ffb400', fontWeight: 'bold', mb: 1 }}>
                        Key Features:
                      </Typography>
                      <Stack spacing={0.5}>
                        {service.keyFeatures.slice(0, 3).map((feature) => (
                          <Stack direction="row" spacing={1} alignItems="center" key={feature}>
                            <CheckCircle sx={{ color: '#ff0000', fontSize: 16 }} />
                            <Typography level="body3" sx={{ color: '#c0c0c0' }}>
                              {feature}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Box>

                    <Divider sx={{ my: 2, background: 'rgba(255,0,0,0.1)' }} />

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar
                          src={service.headOfDepartment.image}
                          alt={service.headOfDepartment.name}
                          size="sm"
                          sx={{ border: '2px solid #ff0000' }}
                        >
                          {service.headOfDepartment.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography level="body3" sx={{ color: 'white', fontSize: '0.8rem' }}>
                            {service.headOfDepartment.name}
                          </Typography>
                          <Typography level="body3" sx={{ color: '#c0c0c0', fontSize: '0.7rem' }}>
                            {service.headOfDepartment.title}
                          </Typography>
                        </Box>
                      </Stack>
                      <Button
                        size="sm"
                        sx={{
                          background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                          color: 'white',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #ff3333, #ff0000)',
                            boxShadow: '0 0 2px rgba(255,0,0,0.3)',
                          },
                        }}
                      >
                        View More
                      </Button>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          {filteredServices.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography level="h4" sx={{ color: '#c0c0c0' }}>
                No services found matching your criteria
              </Typography>
            </Box>
          )}
        </motion.div>

        {/* Service Detail Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <ModalDialog
            sx={{
              maxWidth: '800px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
              background: '#050505',
              border: '1px solid rgba(255,0,0,0.2)',
            }}
          >
            <ModalClose sx={{ color: '#c0c0c0' }} />
            {selectedService && (
              <Box sx={{ p: 2 }}>
                <Stack spacing={3}>
                  <Box>
                    <Chip
                      size="sm"
                      variant="soft"
                      sx={{
                        background: 'rgba(255,0,0,0.1)',
                        color: '#ff0000',
                        border: '1px solid rgba(255,0,0,0.2)',
                        mb: 2,
                      }}
                    >
                      {service_categories.find(c => c.id === selectedService.category)?.label}
                    </Chip>
                    <Typography level="h2" sx={{ color: 'white', mb: 1 }}>
                      {selectedService.title}
                    </Typography>
                    <Typography level="body1" sx={{ color: '#c0c0c0' }}>
                      {selectedService.description}
                    </Typography>
                  </Box>

                  <Divider sx={{ background: 'rgba(255,0,0,0.1)' }} />

                  <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                      <Typography level="h4" sx={{ color: '#ff0000', mb: 2 }}>
                        Key Features
                      </Typography>
                      <List>
                        {selectedService.keyFeatures.map((feature) => (
                          <ListItem key={feature}>
                            <ListItemDecorator>
                              <CheckCircle sx={{ color: '#ff0000' }} />
                            </ListItemDecorator>
                            <ListItemContent sx={{ color: '#c0c0c0' }}>
                              {feature}
                            </ListItemContent>
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                    <Grid xs={12} md={6}>
                      <Typography level="h4" sx={{ color: '#ffb400', mb: 2 }}>
                        Technologies
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                        {selectedService.technologies.map((tech) => (
                          <Chip
                            key={tech}
                            size="md"
                            variant="soft"
                            sx={{
                              background: 'rgba(255,180,0,0.1)',
                              color: '#ffb400',
                              border: '1px solid rgba(255,180,0,0.2)',
                            }}
                          >
                            {tech}
                          </Chip>
                        ))}
                      </Stack>
                    </Grid>
                  </Grid>

                  <Divider sx={{ background: 'rgba(255,0,0,0.1)' }} />

                  <Box>
                    <Typography level="h4" sx={{ color: '#ff6b00', mb: 2 }}>
                      Head of Department
                    </Typography>
                    <Card
                      sx={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,0,0,0.1)',
                        p: 2,
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={selectedService.headOfDepartment.image}
                          alt={selectedService.headOfDepartment.name}
                          sx={{
                            width: 80,
                            height: 80,
                            border: '3px solid #ff0000',
                          }}
                        >
                          {selectedService.headOfDepartment.name.charAt(0)}
                        </Avatar>
                        <Box flex={1}>
                          <Typography level="h4" sx={{ color: 'white' }}>
                            {selectedService.headOfDepartment.name}
                          </Typography>
                          <Typography level="body2" sx={{ color: '#ffb400' }}>
                            {selectedService.headOfDepartment.title}
                          </Typography>
                          <Typography level="body3" sx={{ color: '#c0c0c0' }}>
                            {selectedService.headOfDepartment.bio}
                          </Typography>
                          <Stack direction="row" spacing={2} mt={1}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Email sx={{ color: '#ff0000', fontSize: 16 }} />
                              <Typography level="body3" sx={{ color: '#c0c0c0' }}>
                                {selectedService.headOfDepartment.email}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Phone sx={{ color: '#ffb400', fontSize: 16 }} />
                              <Typography level="body3" sx={{ color: '#c0c0c0' }}>
                                {selectedService.headOfDepartment.phone}
                              </Typography>
                            </Stack>
                          </Stack>
                        </Box>
                      </Stack>
                    </Card>
                  </Box>

                  <Divider sx={{ background: 'rgba(255,0,0,0.1)' }} />

                  <Box>
                    <Typography level="h4" sx={{ color: '#ff3366', mb: 2 }}>
                      Featured Projects
                    </Typography>
                    <Grid container spacing={2}>
                      {selectedService.projects.map((project) => (
                        <Grid xs={12} sm={6} key={project}>
                          <Card
                            sx={{
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,0,0,0.1)',
                              p: 2,
                              '&:hover': {
                                borderColor: 'rgba(255,0,0,0.3)',
                              },
                            }}
                          >
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Code sx={{ color: '#ff0000' }} />
                              <Typography level="body2" sx={{ color: '#c0c0c0' }}>
                                {project}
                              </Typography>
                            </Stack>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  <Divider sx={{ background: 'rgba(255,0,0,0.1)' }} />

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    sx={{ mt: 2 }}
                  >
                    <Button
                      component="a"
                      href={`mailto:${selectedService.headOfDepartment.email}`}
                      target="_blank"
                      size="lg"
                      sx={{
                        background: 'linear-gradient(135deg, #ff0000, #cc0000)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #ff3333, #ff0000)',
                          boxShadow: '0 0 30px rgba(255,0,0,0.3)',
                        },
                      }}
                      endDecorator={<ArrowForward />}
                    >
                      Hire {selectedService.headOfDepartment.name}
                    </Button>
                    <Button
                      component={RouterLink}
                      to="/projects"
                      variant="outlined"
                      size="lg"
                      sx={{
                        borderColor: 'rgba(255,180,0,0.5)',
                        color: '#ffb400',
                        '&:hover': {
                          borderColor: '#ffb400',
                          color: '#ffb400',
                          background: 'rgba(255,180,0,0.1)',
                        },
                      }}
                    >
                      View Projects
                    </Button>
                    <Button
                      component="a"
                      href={`mailto:${SMART_AGENTS_EMAIL}`}
                      target="_blank"
                      variant="outlined"
                      size="lg"
                      sx={{
                        borderColor: 'rgba(255,255,255,0.2)',
                        color: '#c0c0c0',
                        '&:hover': {
                          borderColor: '#ff0000',
                          color: '#ff0000',
                          background: 'rgba(255,0,0,0.1)',
                        },
                      }}
                    >
                      Contact Smart Agents
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            )}
          </ModalDialog>
        </Modal>

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
              mt: 6,
              textAlign: 'center',
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
              <Typography
                level="h2"
                sx={{
                  color: '#ff0000',
                  mb: 2,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  fontWeight: 'bold',
                }}
              >
                Need Tech Solutions?
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
                Whether you need networking, software development, maintenance, or design services,
                Smart Agents IT Solutions has you covered. Let's discuss your project today!
              </Typography>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
              >
                <Button
                  component="a"
                  href={`mailto:${SMART_AGENTS_EMAIL}`}
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
                  Contact Smart Agents
                </Button>
                <Button
                  component={RouterLink}
                  to="/projects"
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
                  View All Projects
                </Button>
              </Stack>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Services;