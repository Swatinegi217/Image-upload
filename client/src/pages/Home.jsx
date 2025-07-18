import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import heroImage from "../image/p1.png";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ffffff, #e3f2fd)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 4,
        py: 6,
      }}
    >
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        maxWidth="lg"
      >
        {/* Text Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome to <span style={{ color: "#1976d2" }}>MIDJ</span>
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>

          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/login"
            sx={{ mt: 2 }}
          >
            Get Started
          </Button>
        </Grid>

        {/* Image Section */}
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Box
            component="img"
            src={heroImage}
            alt=""
            sx={{
              width: { xs: "80%", sm: "70%", md: "100%" },
              maxWidth: 450,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
