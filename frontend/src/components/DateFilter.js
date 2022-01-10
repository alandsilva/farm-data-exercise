import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Paper } from '@mui/material';

const DateFilter = (props) => {
  return (
    <Box>
      <Paper variant='outlined' style={{ padding: 10 }}>
        <Typography id='input-slider' gutterBottom>
          Date
        </Typography>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs>
            <TextField
              type='date'
              value={props.dateMin}
              onChange={(event) => {
                props.setDateMin(event.target.value);
              }}
              variant='standard'
              label='Start'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs>
            <TextField
              type='date'
              value={props.dateMax}
              onChange={(event) => {
                props.setDateMax(event.target.value);
              }}
              variant='standard'
              label='End'
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default DateFilter;
