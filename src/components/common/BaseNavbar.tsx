/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import SucursalService from '../../services/Sucursal';
import { useState } from 'react';
import { Dialog, DialogTitle, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

interface BaseNavBarProps{
  title: string;
}

export const BaseNavBar = ({ title} : BaseNavBarProps) =>{

  const[dialogOpen, setDialogOpen] = useState(false);

  const handleProfileMenuOpen = () => {
    setDialogOpen(true);
  }
  

  const handleMenuClose = () => {
    setDialogOpen(false);
  };

  const url = import.meta.env.VITE_API_URL;
  const {sucursalId} = useParams();
  const sucursalService = new SucursalService();
  const [sucursalName, setSucursalName] = useState('');
 

  const fetchSucursalData = async () => {
    try{
      if (sucursalId){
        const sucursal = await sucursalService.get(url + 'sucursales', sucursalId);
        setSucursalName(sucursal.nombre);
    }
  }catch(error){
    console.error("Error al obtener los datos: ", error);
  }
};

React.useEffect(() => {
  fetchSucursalData();
}, [sucursalId]);
  if(title === ''){
    title = `${sucursalName}`;
  }
return(
  <Box sx= {{ marginBottom: 1}}>
    <AppBar position="static" sx={{bgcolor: "#FB6376", height: 80, marginBottom: 1}}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow:1, justifyContent: 'center', fontSize: 24, fontWeight: 'bold'}}
          >
            {title}
          </Typography>
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
      </Toolbar>
    </AppBar>
    <Dialog onClose={handleMenuClose} open={dialogOpen}>
      <DialogTitle>Perfil</DialogTitle>
      <List>
        <ListItem button>
          <ListItemIcon>
            <Person2OutlinedIcon />
            
          </ListItemIcon>
          <ListItemText primary= "Perfil"/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary= "Configuración"/>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <LunchDiningOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary= "Cerrar Sesión"/>
        </ListItem>

      </List>
    </Dialog>
  </Box>
)
}
export default BaseNavBar;