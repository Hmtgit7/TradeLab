import React from 'react';
import Box from '@mui/material/Box';
import { Toolbar, Typography, IconButton, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../redux/UserSlice';
import { removeToken, removeUserInfo } from '../../auth';
import { toggleSidebar } from '../../redux/SidebarSlice';
import { toggleMobileMenu } from '../../redux/MobileMenuSlice';
import MenuIcon from '@mui/icons-material/Menu';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';
import { setMode } from '../../redux/DarkModeSlice';

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.neutral.main,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function Header() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    removeUserInfo();
    dispatch(clearUser());
    navigate('/');
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleMobileMenuToggle = () => {
    dispatch(toggleMobileMenu());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between', px: 2}}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                if (window.innerWidth < 900) {
                  handleMobileMenuToggle();
                } else {
                  handleSidebarToggle();
                }
              }}
              sx={{ mr: 2 }}
            >
              <MenuIcon sx={{ fontSize: 25 }} />
            </IconButton>
            <img src={process.env.PUBLIC_URL + '/tradelab-logo.svg'} alt="Tradelab Logo" style={{height:32,verticalAlign:'middle',marginRight:8}} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 600 }}>
              Tradelab
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => dispatch(setMode())} sx={{ ml: 1 }}>
              {theme.palette.mode === 'dark' ? (
                <LightModeOutlined sx={{ fontSize: 25 }} />
              ) : (
                <DarkModeOutlined sx={{ fontSize: 25 }} />
              )}
            </IconButton>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleLogout}
              sx={{ ml: 2, borderColor: theme.palette.secondary.main, color: theme.palette.secondary.main }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}