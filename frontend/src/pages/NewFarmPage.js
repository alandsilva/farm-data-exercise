import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import useField from '../hooks/useField';
import farmsService from '../services/farms';

const NewFarmPage = () => {
  const location = useField('text');
  const datetime = useField('date');
  const sensorType = useField('text');
  const value = useField('number');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const farmObject = {
      location: location.value,
      datetime: datetime.value,
      sensorType: sensorType.value,
      value: value.value,
    };

    try {
      await farmsService.createFarm(farmObject);
      setSuccessMessage('Farm succesfully added');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      console.log(error.response.data.error);
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='60vh'
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label='location' {...location} />
            <TextField
              label='date'
              {...datetime}
              InputLabelProps={{ shrink: true }}
            />
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Sensor</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Age'
                {...sensorType}
              >
                <MenuItem value={'pH'}>pH</MenuItem>
                <MenuItem value={'temperature'}>temperature</MenuItem>
                <MenuItem value={'rainFall'}>rainFall</MenuItem>
              </Select>
            </FormControl>
            <TextField label='value' {...value} />
            <div>
              <Button
                variant='contained'
                fullWidth={true}
                color='primary'
                type='submit'
              >
                Create
              </Button>
            </div>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default NewFarmPage;
