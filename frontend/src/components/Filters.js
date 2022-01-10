import React from 'react';
import Filter from './Filter';
import DateFilter from './DateFilter';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Filters = (props) => {
  return (
    <Stack spacing={2} direction='column'>
      <Filter
        title='pH'
        min={props.filters.phMin}
        max={props.filters.phMax}
        setMin={props.setPhMin}
        setMax={props.setPhMax}
        minLimit={0}
        maxLimit={14}
      />
      <Filter
        title='temperature'
        min={props.filters.tempMin}
        max={props.filters.tempMax}
        setMin={props.setTempMin}
        setMax={props.setTempMax}
        minLimit={-50}
        maxLimit={100}
      />
      <Filter
        title='rainFall'
        min={props.filters.rainMin}
        max={props.filters.rainMax}
        setMin={props.setRainMin}
        setMax={props.setRainMax}
        minLimit={0}
        maxLimit={500}
      />
      <DateFilter
        dateMin={props.filters.dateMin}
        dateMax={props.filters.dateMax}
        setDateMin={props.setDateMin}
        setDateMax={props.setDateMax}
      />
      <Button
        onClick={() => {
          props.resetFilters();
        }}
        variant='contained'
      >
        Reset Filters
      </Button>
    </Stack>
  );
};

export default Filters;
