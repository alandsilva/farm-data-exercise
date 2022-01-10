import React, { useEffect, useState } from 'react';
import farmsService from './services/farms';
import Box from '@mui/material/Box';
import FarmPage from './pages/FarmPage';
import NewFarmPage from './pages/NewFarmPage';
import { Link, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import NewUploadPage from './pages/NewUploadPage';

const App = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      const data = await farmsService.getInfo();
      setInfo(data);
      console.log(data);
    };

    getInfo().catch((err) => {
      console.log(err);
    });
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
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

      <Routes>
        <Route path='/' element={<FarmPage />} />
        <Route path='/create' element={<NewFarmPage />} />
        <Route path='/upload' element={<NewUploadPage />} />
        <Route
          path='*'
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </Box>
  );
};

export default App;
