// src/pages/Home.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import WindowsIcon from '@mui/icons-material/Window';


const Home = () => {
  return (
    <Box
    
      sx={{
        height: '100vh',
        background: 'radial-gradient(circle at center, #000000, #0a0a0a, #000000)',
        color: '#eee',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: 2,
      }}
    >
      {/* Animated glowing product name */}
      <Typography
        variant="h2"
        sx={{
          mb: 2,
          fontWeight: 'bold',
          color: '#00bfff',
          animation: 'slideFadeIn 1.5s  forwards',
        }}
      >
        True Vision by ZunnaBerry
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4, maxWidth: 600, color: '#ccc' }}
      >
        Perception as a Service- HD clarity, GPU Shader magic and Transparency Like Never Before.
      </Typography>

      <WindowsIcon
        sx={{
          fontSize: 80,
          color: '#00bfff',
          mb: 3,
          animation: 'floatUpDown 4s ease-in-out infinite',
        }}
      />

      <Button
        variant="contained"
        href="/download/zunnaberry.exe"
        download
        sx={{
          backgroundColor: '#00bfff',
          '&:hover': {
            backgroundColor: '#0099cc',
            boxShadow: '0 0 20px #00bfff',
          },
          fontWeight: 'bold',
          fontSize: '1rem',
          px: 4,
          py: 1.5,
        }}
      >
        Download for Windows
      </Button>

      {/* Keyframe animations */}
      <style>
        {`
           @keyframes slideFadeIn {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

          @keyframes floatUpDown {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-15px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Home;
