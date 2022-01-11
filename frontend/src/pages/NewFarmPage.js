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
      console.log(error.response.data);
      setErrorTip(error.response.data);
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const setErrorTip = (error) => {
    switch (error.field) {
      case 'location':
        location.setHelperText(error.tip);
        break;
      case 'datetime':
        datetime.setHelperText(error.tip);
        break;
      case 'sensorType':
        sensorType.setHelperText(error.tip);
        break;
      case 'value':
        value.setHelperText(error.tip);
        break;
      default:
        break;
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
          <h2>Create Farm</h2>
          <Stack spacing={2}>
            <TextField
              label='location'
              type={location.type}
              onChange={location.onChange}
              value={location.value}
              helperText={location.helperText}
              error={location.error}
            />
            <TextField
              label='date'
              InputLabelProps={{ shrink: true }}
              type={datetime.type}
              onChange={datetime.onChange}
              value={datetime.value}
              helperText={datetime.helperText}
              error={datetime.error}
            />
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Sensor</InputLabel>
              <Select
                type={sensorType.type}
                onChange={sensorType.onChange}
                value={sensorType.value}
                error={sensorType.error}
              >
                <MenuItem value={'pH'}>pH</MenuItem>
                <MenuItem value={'temperature'}>temperature</MenuItem>
                <MenuItem value={'rainFall'}>rainFall</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label='value'
              type={value.type}
              onChange={value.onChange}
              value={value.value}
              helperText={value.helperText}
              error={value.error}
            />
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
