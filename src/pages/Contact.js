// src/pages/Contact.js
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await fetch(
        "https://zunnaberry-server.onrender.com/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" }); // Clear form
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
    // Clear form or send to backend here
  };

  return (
    <Box
      sx={{ backgroundColor: "#000", color: "#fff", minHeight: "100vh", py: 6 }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h3"
          align="center"
          sx={{
            mb: 4,
            animation: "slideFadeIn 1s ease-out forwards",
          }}
        >
          Contact Us
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Message sent successfully!
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            backgroundColor: "#111",
            padding: 4,
            borderRadius: 2,
            boxShadow: "0 0 10px rgba(0, 191, 255, 0.2)",
            animation: "slideFadeIn 1s ease-out forwards",
          }}
        >
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            sx={{
              input: { color: "#fff" },
              label: { color: "#ccc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#00bfff" },
                "&:hover fieldset": { borderColor: "#1e90ff" },
              },
            }}
          />

          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{
              input: { color: "#fff" },
              label: { color: "#ccc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#00bfff" },
                "&:hover fieldset": { borderColor: "#1e90ff" },
              },
            }}
          />

          <TextField
            name="message"
            label="Your Message"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={form.message}
            onChange={handleChange}
            sx={{
              textarea: { color: "#fff" },
              label: { color: "#ccc" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#00bfff" },
                "&:hover fieldset": { borderColor: "#1e90ff" },
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#00bfff",
              color: "#000",
              "&:hover": {
                backgroundColor: "#1e90ff",
                boxShadow: "0 0 10px #1e90ff",
              },
              fontWeight: "bold",
            }}
          >
            Send Message
          </Button>
        </Box>

        <style>
          {`
            @keyframes slideFadeIn {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
      </Container>
    </Box>
  );
};

export default Contact;
