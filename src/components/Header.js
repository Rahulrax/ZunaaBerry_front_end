import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Header = () => {
  const location = useLocation();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#003366',
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            cursor: 'default',
            transition: 'color 0.4s ease',
            '&:hover': {
              color: '#66aaff',
            },
          }}
        >
          ZunnaBerry
        </Typography>

        <Box>
          {navItems.map(({ text, path }) => {
            const isActive = location.pathname === path;
            return (
              <Button
                key={text}
                component={Link}
                to={path}
                color="inherit"
                sx={{
                  color: isActive ? '#ffcc00' : '#fff',
                  fontWeight: isActive ? 'bold' : 'normal',
                  transition: 'color 0.3s ease, transform 0.2s ease',
                  '&:hover': {
                    color: isActive ? '#ffcc00' : '#99cfff', 
                    transform: isActive ? 'none' : 'scale(1.05)', // slight scale only for non-active
                  },
                }}
              >
                {text}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
