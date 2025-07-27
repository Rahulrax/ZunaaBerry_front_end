import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // for redirect

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add backend API call here for admin login
    try {
      const res = await axios.post(
        "https://zunnaberry-server.onrender.com/api/auth/login",
        {
          email: form.email,
          password: form.password,
        },
      );

      // Save token if needed
      localStorage.setItem("token", res.data.token);

      // Redirect to home
      navigate("/contact-details");
    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background:
          "radial-gradient(circle at center, #000000, #0a0a0a, #000000)",
        color: "#eee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        textAlign: "center",
      }}
    >
      <AdminPanelSettingsIcon
        sx={{
          fontSize: 80,
          color: "#00bfff",
          mb: 2,
          animation: "floatUpDown 4s ease-in-out infinite",
        }}
      />

      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: "bold",
          color: "#00bfff",
          animation: "slideFadeIn 1.2s forwards",
        }}
      >
        Admin Panel Login
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          variant="outlined"
          value={form.email}
          onChange={handleChange}
          required
          InputProps={{
            sx: {
              backgroundColor: "#1a1a1a",
              color: "#fff",
            },
          }}
          InputLabelProps={{ sx: { color: "#aaa" } }}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={form.password}
          onChange={handleChange}
          required
          InputProps={{
            sx: {
              backgroundColor: "#1a1a1a",
              color: "#fff",
            },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                  sx={{ color: "#00bfff" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ sx: { color: "#aaa" } }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#00bfff",
            "&:hover": {
              backgroundColor: "#0099cc",
              boxShadow: "0 0 20px #00bfff",
            },
            fontWeight: "bold",
            fontSize: "1rem",
            py: 1.5,
          }}
        >
          Login
        </Button>
      </Box>

      {/* Keyframe Animations */}
      <style>
        {`
        @keyframes slideFadeIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
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

export default AdminLogin;
