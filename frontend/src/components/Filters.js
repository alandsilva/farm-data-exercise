import React from 'react';
import Filter from './Filter';
import DateFilter from './DateFilter';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Filters = (props) => {
  return (
    <Box>
      <h3>Filters</h3>
      <Grid
        container
        spacing={2}
        xs={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Grid item md={12} sm={6} xs={12}>
          <Filter
            title='pH'
            min={props.filters.phMin}
            max={props.filters.phMax}
            setMin={props.setPhMin}
            setMax={props.setPhMax}
            minLimit={0}
            maxLimit={14}
          />
        </Grid>
        <Grid item md={12} sm={6} xs={12}>
          <Filter
            title='temperature'
            min={props.filters.tempMin}
            max={props.filters.tempMax}
            setMin={props.setTempMin}
            setMax={props.setTempMax}
            minLimit={-50}
            maxLimit={100}
          />
        </Grid>
        <Grid item md={12} sm={6} xs={12}>
          <Filter
            title='rainFall'
            min={props.filters.rainMin}
            max={props.filters.rainMax}
            setMin={props.setRainMin}
            setMax={props.setRainMax}
            minLimit={0}
            maxLimit={500}
          />
        </Grid>
        <Grid item md={12} sm={6} xs={12}>
          <DateFilter
            dateMin={props.filters.dateMin}
            dateMax={props.filters.dateMax}
            setDateMin={props.setDateMin}
            setDateMax={props.setDateMax}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => {
              props.resetFilters();
            }}
            variant='contained'
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Filters;
