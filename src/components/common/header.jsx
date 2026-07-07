import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Container,
  Avatar,
  useTheme,
  Stack,
} from '@mui/joy';
import {
  Menu as MenuIcon,
  // ExpandMore,
  // ExpandLess,
  Close,
  GitHub,
  LinkedIn,
  WhatsApp,
} from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { navVariants, menuItems, itemVariants, HP_256_GITHUB_LINK, HP_256_LINKEDIN_LINK, HP_256_WHATSAPP_LINK } from '../../configs';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSubMenuToggle = (title) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleMouseEnter = (title) => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenSubMenus((prev) => ({
      ...prev,
      [title]: false,
    }));
  };

  const handleMouseLeave = (title) => {
  
    timeoutRef.current = setTimeout(() => {
      setOpenSubMenus((prev) => ({
        ...prev,
        [title]: false,
      }));
      timeoutRef.current = null;
    }, 200);
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };



  return (
    <AnimatePresence>
      <Box
        component={motion.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          position: 'fixed',
          top: 0,
          right:0,
          left: 0,
          zIndex: 1100,
          background: scrolled ? 'rgba(5, 5, 5, 0.95)' : 'rgba(5, 5, 5)',
          backdropFilter: 'blur(10px)',
          borderBottom: scrolled ? '1px solid rgba(255,0,0,0.2)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: { xs: '8px 16px', md: '12px 24px' },
              minHeight: { xs: '70px', md: '80px' },
            }}
          >
            <Logo />

            {!isMobile && (
              <DesktopNav
                isActive={isActive}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                handleSubMenuToggle={handleSubMenuToggle}
                openSubMenus={openSubMenus}
              />
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {/* Social Icons - Desktop */}
              {!isMobile && (
                <Stack direction="row" spacing={1}>
                  <IconButton
                    component="a"
                    href={HP_256_GITHUB_LINK}
                    target="_blank"
                    size="sm"
                    sx={{
                      color: '#c0c0c0',
                      '&:hover': {
                        color: '#ff0000',
                      },
                    }}
                  >
                    <GitHub />
                  </IconButton>
                  <IconButton
                    component="a"
                    href={HP_256_LINKEDIN_LINK}
                    target="_blank"
                    size="sm"
                    sx={{
                      color: '#c0c0c0',
                      '&:hover': {
                        color: '#ff0000',
                      },
                    }}
                  >
                    <LinkedIn />
                  </IconButton>
                </Stack>
              )}

              {/* Mobile Menu Toggle */}
              {isMobile && (
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    color: '#c0c0c0',
                    '&:hover': {
                      color: '#ff0000',
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {isMobile && (
        <MobileNav
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          isActive={isActive}
          handleSubMenuToggle={handleSubMenuToggle}
          openSubMenus={openSubMenus}
        />
      )}
    </AnimatePresence>
  );
};

export default Header;

  const MobileNav = ({mobileOpen,handleDrawerToggle,isActive,handleSubMenuToggle}) => (
<Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} sx={{'& .MuiDrawer-paper': {
          background: '#050505',
          width: '80%',
          maxWidth: '320px',
        }
      }}
    >
      <Box sx={{ p: 2, background: '#050505', height: '100vh' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Logo />
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#c0c0c0' }}>
            <Close />
          </IconButton>
        </Box>

        <List sx={{ width: '100%' }}>
          {menuItems.map((item) => (
            <Box key={item.title}>
              <ListItem
              component={Link}
              to={item.path}
              >
                <ListItemButton
                  onClick={() => {
                    // if (item.subItems.length === 0) {
                      handleDrawerToggle();
                    // }
                  }}
                  sx={{
                    color: isActive(item.path) ? '#ff0000 !important' : '#c0c0c0 !important',
                    borderRadius: '5px',
                    '&:hover': {
                      color: isActive(item.path) ? '#ff0000 !important' : '#ffb400 !important',
                      background: isActive(item.path) ? 'transparent !important' : '#423b3b !important',
                    },
                    gap: '8px',
                  }}
                >
                  {item.icon && <item.icon sx={{ fontSize: '24px' }} />}
                  <ListItemContent>{item.title}</ListItemContent>
                  {item.subItems.length > 0 && (
                    <IconButton
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSubMenuToggle(item.title);
                      }}
                      sx={{ color: 'inherit' }}
                    >
                      {/* {openSubMenus[item.title] ? <ExpandLess /> : <ExpandMore />} */}
                    </IconButton>
                  )}
                </ListItemButton>
              </ListItem>

              {/* Submenu with Framer Motion Collapse */}
              {/* {item.subItems.length > 0 && (
                <AnimatePresence initial={false}>
                  {openSubMenus[item.title] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: 'hidden' }}
                    >
                      <List component="div" sx={{ pl: 4 }}>
                        {item.subItems.map((subItem) => (
                          <ListItem key={subItem.title}>
                            <ListItemButton
                              component={Link}
                              to={subItem.path}
                              onClick={handleDrawerToggle}
                              sx={{
                                borderRadius: '5px',
                                color: isActive(subItem.path) ? '#ffb400' : '#c0c0c0',
                                '&:hover': {
                                  color: isActive(subItem.path)
                                    ? '#ffb400 !important'
                                    : '#ff0000 !important',
                                  background: isActive(subItem.path)
                                    ? 'transparent !important'
                                    : '#050505 !important',
                                },
                              }}
                            >
                              <ListItemContent>{subItem.title}</ListItemContent>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </motion.div>
                  )}
                </AnimatePresence>
              )} */}
            </Box>
          ))}
        </List>

        {/* Social Media Links in Mobile */}
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255,0,0,0.2)' }}>
          <Typography level="body2" sx={{ color: '#ffb400', mb: 2, textAlign: 'center' }}>
            Connect with us
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <IconButton
              component="a"
              href={HP_256_GITHUB_LINK}
              target="_blank"
              sx={{ color: '#c0c0c0', '&:hover': { color: '#ff0000' } }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              component="a"
              href={HP_256_LINKEDIN_LINK}
              target="_blank"
              sx={{ color: '#c0c0c0', '&:hover': { color: '#ff0000' } }}
            >
              <LinkedIn />
            </IconButton>
            <IconButton
              component="a"
              href={HP_256_WHATSAPP_LINK}
              target="_blank"
              sx={{ color: '#c0c0c0', '&:hover': { color: '#ff0000' } }}
            >
              <WhatsApp />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );


  // Desktop Navigation
  const DesktopNav = ({ isActive, handleMouseEnter,handleMouseLeave,openSubMenus }) => (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
    >
      {menuItems.map((item) => (
        <motion.div key={item.title} variants={itemVariants}>
          <Box 
            sx={{ position: 'relative' }}
            onMouseEnter={() => item.subItems.length > 0 && handleMouseEnter(item.title)}
            onMouseLeave={() => item.subItems.length > 0 && handleMouseLeave(item.title)}
          >
            <Button
              component={Link}
              to={item.path}
              variant="plain"
              sx={{
                color: isActive(item.path) ? '#ff0000' : '#c0c0c0',
                fontWeight: isActive(item.path) ? 'bold' : 'normal',
                '&:hover': {
                  color: '#ff0000',
                  background: 'transparent !important',
                },
                transition: 'all 0.3s ease',
                gap: '4px',
              }}
            >
              {item.icon && <item.icon sx={{ fontSize: '20px' }} />}
              {item.title}
              {/* {item.subItems.length > 0 && (
                <ExpandMore
                  sx={{
                    fontSize: '16px',
                    transform: openSubMenus[item.title] ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              )} */}
            </Button>

            {/* Submenu dropdown */}
            {item.subItems.length > 0 && (
              <AnimatePresence>
                {openSubMenus[item.title] && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: 'tween', duration: 0.2 }}
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      minWidth: '200px',
                      background: '#0a0a0a',
                      border: '1px solid #ff0000',
                      borderRadius: '8px',
                      boxShadow: '0 8px 32px rgba(255,0,0,0.2)',
                      zIndex: 1000,
                      padding: '8px 0',
                      marginTop: '8px',
                    }}
                  >
                    {item.subItems.map((subItem) => (
                      <Button
                        key={subItem.title}
                        component={Link}
                        to={subItem.path}
                        variant="plain"
                        fullWidth
                        sx={{
                          color: isActive(subItem.path) ? '#ff0000' : '#c0c0c0',
                          justifyContent: 'flex-start',
                          padding: '8px 16px',
                          borderRadius: 0,
                          '&:hover': {
                            color: '#ffb400 !important',
                            background: 'transparent !important',
                          },
                        }}
                      >
                        {subItem.title}
                      </Button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </Box>
        </motion.div>
      ))}
    </motion.nav>
  );

    // Logo component
  const Logo = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          src="/images/logos/hp_256.png"
          alt="Hassan Programmer 256"
          sx={{
            width: 48,
            height: 48,
            border: '2px solid #ff0000',
          }}
        >
          HP
        </Avatar>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography
            level="h6"
            sx={{
              color: '#ff0000',
              fontWeight: 'bold',
              fontSize: { xs: '0.9rem', md: '1.1rem' },
            }}
          >
            HASSAN
          </Typography>
          <Typography
            level="body3"
            sx={{
              color: '#c0c0c0',
              fontSize: '0.7rem',
              letterSpacing: '1px',
            }}
          >
            PROGRAMMER 256
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );