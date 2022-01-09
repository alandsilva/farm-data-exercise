import React, { useState } from 'react';
import Farms from '../components/Farms';
import Filters from '../components/Filters';
import Grid from '@mui/material/Grid';

const FarmPage = () => {
  const [filters, setFilters] = useState({
    page: 0,
    limit: 10,
    phMin: 0,
    phMax: 14,
    tempMin: -50,
    tempMax: 100,
    rainMin: 0,
    rainMax: 500,
    dateMin: '',
    dateMax: '',
  });

  const setPage = (value) => {
    setFilters({ ...filters, page: value });
  };

  const setLimit = (value) => {
    setFilters({ ...filters, limit: value });
  };

  const setPhMin = (value) => {
    console.log('called with:', value);
    setFilters({ ...filters, phMin: value });
  };
  const setPhMax = (value) => {
    setFilters({ ...filters, phMax: value });
  };
  const setTempMin = (value) => {
    setFilters({ ...filters, tempMin: value });
  };
  const setTempMax = (value) => {
    setFilters({ ...filters, tempMax: value });
  };
  const setRainMin = (value) => {
    setFilters({ ...filters, rainMin: value });
  };
  const setRainMax = (value) => {
    setFilters({ ...filters, rainMax: value });
  };
  const setDateMin = (value) => {
    setFilters({ ...filters, dateMin: value });
  };
  const setDateMax = (value) => {
    setFilters({ ...filters, dateMax: value });
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Farms filters={filters} setPage={setPage} setLimit={setLimit} />
        </Grid>
        <Grid item xs={4}>
          <Filters
            filters={filters}
            setPhMin={setPhMin}
            setPhMax={setPhMax}
            setTempMin={setTempMin}
            setTempMax={setTempMax}
            setRainMin={setRainMin}
            setRainMax={setRainMax}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default FarmPage;
