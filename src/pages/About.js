// src/pages/About.js
import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const features = [
  {
    title: "Fast Performance",
    description: "ZunnaBerry is optimized for speed and efficiency.",
  },
  {
    title: "Secure",
    description: "Your data is protected with advanced security features.",
  },
  {
    title: "Easy Integration",
    description: "Easily integrates with your existing tools and workflows.",
  },
  {
    title: "User Friendly",
    description: "Simple UI with powerful functionality under the hood.",
  },
];

const About = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#000",
        color: "#fff",
        py: 6,
        px: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h2"
        align="center"
        sx={{
          mb: 5,
          fontWeight: "bold",
          color: "#00bfff",
          animation: "slideFadeIn 1s ease-out forwards",
        }}
      >
        Features
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        className="feature-grid"
      >
        {features.map((feature, index) => (
          <Grid
            item
            key={index}
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              animation: `slideFadeIn 0.8s ease-out ${index * 0.2}s both`,
            }}
          >
            <Card
              sx={{
                backgroundColor: "#111",
                color: "#fff",
                border: "2px solid transparent rgb(246, 248, 248)",
                borderImage:
                  "linear-gradient(45deg, #00bfff, #1e90ff, #00bfff) 1",
                boxShadow: "0 0 10px rgba(0, 191, 255, 0.3)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                animation: "borderPulse 4s linear infinite",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 0 20px rgba(0, 191, 255, 0.4)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold", color: "#00bfff" }}
                >
                  {feature.title}
                </Typography>
                <Box height="16px" /> {/* One line gap */}
                <Typography variant="body2" sx={{ color: "#ccc" }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes slideFadeIn {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
            .feature-grid {
                display : flex;
                flex-direction : column;
            }
        `}
      </style>
    </Box>
  );
};

export default About;
