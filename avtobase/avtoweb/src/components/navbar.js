import { useContext } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Chip,
  Toolbar,
  Typography,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { UserContext } from "../store/user-context";

// Absolute paths: relative ones ("admin") resolved against the current route,
// so the links broke as soon as you were on /details.
const links = [
  { label: "Home", to: "/", icon: <DirectionsCarIcon /> },
  { label: "Admin", to: "/admin", icon: <AdminPanelSettingsIcon /> },
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userCtx = useContext(UserContext);

  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 700, mr: 3 }}
        >
          Avtoweb
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexGrow: 1 }}>
          {links.map((link) => (
            <Button
              key={link.to}
              component={RouterLink}
              to={link.to}
              color="inherit"
              startIcon={link.icon}
              sx={{
                borderBottom: pathname === link.to ? '2px solid currentColor' : '2px solid transparent',
                borderRadius: 0,
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>

        {userCtx.isLoggedIn ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              size="small"
              color="secondary"
              label={userCtx.isAdmin ? `${userCtx.user.username} (admin)` : userCtx.user.username}
            />
            <Button color="inherit" startIcon={<LogoutIcon />} onClick={userCtx.logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button
            color="inherit"
            startIcon={<LoginIcon />}
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
