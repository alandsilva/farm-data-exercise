import React, { useEffect, useState } from 'react';
import farmsService from './services/farms';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Farms from './components/Farms';
import Filters from './components/Filters';
import FarmPage from './pages/FarmPage';

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
      <FarmPage />
    </Box>
  );
};

export default App;
