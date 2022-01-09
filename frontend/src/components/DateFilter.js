import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const DateFilter = () => {
  const [date, setDate] = useState('2021-12-30');

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div>
      <Typography id='input-slider' gutterBottom>
        Date
      </Typography>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs>
          <TextField
            type='date'
            value={date}
            onChange={handleChange}
            variant='standard'
            label='Start'
          />
        </Grid>
        <Grid item xs>
          <TextField
            type='date'
            value={date}
            onChange={handleChange}
            variant='standard'
            label='End'
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default DateFilter;
