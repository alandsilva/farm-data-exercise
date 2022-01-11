import React, { useState } from 'react';
import { TextField, Button, Box, Stack, Alert } from '@mui/material';
import farmsService from '../services/farms';

const NewUploadPage = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('farm', file);

    try {
      const result = await farmsService.uploadCsv(formData);
      console.log(result);
      setSuccessMessage(`${result.successful} farms succesfully added`);
      if (result.unsuccessful.count > 0)
        setAlertMessage(
          `${result.unsuccessful.count} could not be added due to invalid data in rows: ${result.unsuccessful.rows}`
        );
      setFile(null);
      setTimeout(() => {
        setSuccessMessage(null);
        setAlertMessage(null);
        setFile(null);
      }, 5000);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage(null);
        setFile(null);
      }, 5000);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
      {alertMessage && <Alert severity='warning'>{alertMessage}</Alert>}
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='60vh'
      >
        <form onSubmit={handleSubmit}>
          <h2>Upload CSV file</h2>
          <Stack spacing={2}>
            <TextField type='file' onChange={handleFileChange} />
            <div>
              <Button
                variant='contained'
                fullWidth={true}
                color='primary'
                type='submit'
              >
                Upload
              </Button>
            </div>
          </Stack>
        </form>
      </Box>
    </div>
  );
};

export default NewUploadPage;
