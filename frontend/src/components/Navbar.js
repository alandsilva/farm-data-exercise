import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const Navbar = () => {
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      {matches && (
        <AppBar position='relative'>
          <Toolbar>
            <Button color='inherit' component={Link} to='/'>
              home
            </Button>
            <Button color='inherit' component={Link} to='/create'>
              add+
            </Button>
            <Button color='inherit' component={Link} to='/upload'>
              upload+
            </Button>
          </Toolbar>
        </AppBar>
      )}
      {!matches && (
        <AppBar position='fixed' sx={{ top: 'auto', bottom: 0 }} elevation={3}>
          <Toolbar
            sx={{
              display: 'flex',
              aligngItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Button color='inherit' component={Link} to='/'>
              home
            </Button>
            <Button color='inherit' component={Link} to='/create'>
              add+
            </Button>
            <Button color='inherit' component={Link} to='/upload'>
              upload+
            </Button>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default Navbar;
