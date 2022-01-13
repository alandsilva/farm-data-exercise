import React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Input = styled(MuiInput)`
  width: 60px;
`;

function valuetext(value) {
  return `${value}`;
}
const Filter = (props) => {
  const handleChange = (event, newValue) => {
    if (newValue[0] !== props.min) props.setMin(newValue[0]);
    else props.setMax(newValue[1]);
  };

  const handleMinChange = (event) => {
    props.setMin(Number(event.target.value));
  };

  const handleMaxChange = (event) => {
    props.setMax(Number(event.target.value));
  };

  return (
    <Box>
      <Paper variant='outlined' style={{ padding: 10 }}>
        <Typography id='input-slider' gutterBottom>
          {props.title}
        </Typography>
        <Grid container spacing={2} alignItems='center'>
          <Grid item>
            <Input
              value={props.min}
              size='small'
              onChange={handleMinChange}
              inputProps={{
                step: 1,
                min: props.minLimit,
                max: props.maxLimit,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>

          <Grid item xs>
            <Slider
              value={[props.min, props.max]}
              onChange={handleChange}
              valueLabelDisplay='auto'
              min={props.minLimit}
              max={props.maxLimit}
              getAriaValueText={valuetext}
            />
          </Grid>

          <Grid item>
            <Input
              value={props.max}
              size='small'
              onChange={handleMaxChange}
              inputProps={{
                step: 1,
                min: props.minLimit,
                max: props.maxLimit,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Filter;
