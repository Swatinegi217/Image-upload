import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import heroImage from "../image/p1.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ffffff, #e3f2fd)",
        px: 4,
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          {/* Left section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              Welcome to <span style={{ color: "#1976d2" }}>MIDJ</span>
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <Typography component="li" variant="body1" color="textSecondary">
                AI-powered image prompt management system.
              </Typography>
              <Typography component="li" variant="body1" color="textSecondary">
                Easily upload, manage, and view images with associated prompts.
              </Typography>
              <Typography component="li" variant="body1" color="textSecondary">
                Supports seamless collaboration across teams.
              </Typography>
              <Typography component="li" variant="body1" color="textSecondary">
                Categorizes uploads intuitively by team identity.
              </Typography>
              <Typography component="li" variant="body1" color="textSecondary">
                Centralized dashboard for efficient content oversight.
              </Typography>
            </Box>
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

          {/* Right image section */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              component="img"
              src={heroImage}
              alt="hero"
              sx={{
                width: { xs: "80%", sm: "70%", md: "100%" },
                maxWidth: 450,
              }}
            />
          </Grid>
        </Grid>

        {/* Features Section */}
        <Box sx={{ py: 6, backgroundColor: "#f9f9f9" }}>
          <Container maxWidth="md">
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              mb={4}
            >
              Features
            </Typography>

            <Grid container spacing={3} direction="column">
              <Grid item xs={12}>
                <Card
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <CloudUploadIcon fontSize="large" color="primary" />
                  <Box>
                    <Typography fontWeight="bold">Upload Images</Typography>
                    <Typography variant="body2">
                      Easily upload images with associated prompts using a simple UI.
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <GroupIcon fontSize="large" color="primary" />
                  <Box>
                    <Typography fontWeight="bold">Team-Based Sorting</Typography>
                    <Typography variant="body2">
                      All uploads are categorized based on team identity.
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card
                  elevation={3}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <DashboardIcon fontSize="large" color="primary" />
                  <Box>
                    <Typography fontWeight="bold">Admin Dashboard</Typography>
                    <Typography variant="body2">
                      View, filter and manage uploaded content from a central dashboard.
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
