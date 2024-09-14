/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useLocation, useParams } from 'react-router-dom';
import SucursalService from '../../services/Sucursal';
import { useState } from 'react';
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BaseNavBarProps{
  title: string;
}

export const BaseNavBar = ({ title} : BaseNavBarProps) =>{
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const url = import.meta.env.VITE_API_URL;
  const {sucursalId} = useParams();
  const sucursalService = new SucursalService();
  const [sucursalName, setSucursalName] = useState('');
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently, user } = useAuth0();
  const location = useLocation();
  
  const handleLogin = () => {
    loginWithRedirect();
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGoBack = () => {
    window.history.back(); // Simular el comportamiento de navegar hacia atrás en el historial del navegador
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: "http://localhost:5173/"
      }
    });
  };

  

 

  const fetchSucursalData = async () => {
    try{
      if (sucursalId){
        const sucursal = await sucursalService.get(url + 'sucursales', sucursalId, await getAccessTokenSilently({}));
        setSucursalName(sucursal.nombre);
    }
  }catch(error){
    console.error("Error al obtener los datos: ", error);
  }
};

React.useEffect(() => {
  fetchSucursalData();
}, [sucursalId]);
    const displayedTitle = title === '' ? `Sucursal ${sucursalName}` : title;
return (
    <Box sx={{ marginBottom: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#9c27b0", height: 80, marginBottom: 1, display: 'flex', justifyContent: 'center' }}>
        <Toolbar>
          {location.pathname !== '/' && user && user['https://apiauth.com/roles'][0] === 'SUPERADMIN' && (
            <IconButton
              size="large"
              edge="start"
              aria-label="go back"
              color="inherit"
              sx={{ marginRight: 1 }}
              onClick={handleGoBack} // Manejar clic en el botón de flecha hacia atrás
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, fontSize: '1.7rem' }}
          >
            {displayedTitle}
          </Typography>
          <Box component="div" sx={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ margin: 0 }}>
              {user?.name}
            </p>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {!isAuthenticated && (
                <MenuItem onClick={() => { handleLogin(); handleMenuClose(); }}>
                  <ListItemIcon>
                    <LoginOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </MenuItem>
              )}
              {isAuthenticated && (
                <MenuItem onClick={() => { handleLogout(); handleMenuClose(); }}>
                  <ListItemIcon>
                    <LoginOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cerrar Sesión" />
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

export default BaseNavBar;