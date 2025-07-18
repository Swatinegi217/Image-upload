import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Login", path: "/login" },
  ];

  const handleLogout = () => {
    // Clear auth token (optional)
    localStorage.removeItem("token");
    // Redirect to login
    window.location.href = "/login";
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.label} component={Link} to={item.path}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <ListItem button onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" }, mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            MIDJ
          </Typography>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
