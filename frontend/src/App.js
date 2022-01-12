import React from 'react';
import Box from '@mui/material/Box';
import FarmPage from './pages/FarmPage';
import NewFarmPage from './pages/NewFarmPage';
import { Routes, Route } from 'react-router-dom';
import NewUploadPage from './pages/NewUploadPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar />
      <Routes>
        <Route path='/' element={<FarmPage />} />
        <Route path='/home' element={<FarmPage />} />
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
