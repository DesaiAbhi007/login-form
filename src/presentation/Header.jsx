import { Link } from "react-router-dom";
import { AppBar, Avatar, Box, Container, IconButton, List, ListItem, Menu, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const headerList = [
    {
      linkName: "Crud operation",
      navigate: "/crud",
    },
    {
      linkName: "Counter",
      navigate: "/counter",
    },
  ];

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                MENU
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <List>
                  {headerList.map((item, i) => {
                    return (
                      <ListItem key={i}>
                        <Link to={item?.navigate}>{item?.linkName}</Link>
                      </ListItem>
                    );
                  })}
                </List>
              </Menu>
            </Box>
            <IconButton sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>M</IconButton>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <List sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {headerList.map((item, i) => {
                return (
                  <ListItem key={i}>
                    <Link to={item?.navigate}>{item?.linkName}</Link>
                  </ListItem>
                );
              })}
            </List>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
