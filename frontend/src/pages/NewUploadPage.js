import React, { useState } from 'react';
import { TextField, Button, Box, Stack, Alert } from '@mui/material';
import farmsService from '../services/farms';

const NewUploadPage = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('farm', file);

    try {
      const result = await farmsService.uploadCsv(formData);
      console.log(result);
      setSuccessMessage('Farm succesfully added');
      setFile(null);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setTimeout(() => {
        setErrorMessage(null);
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
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='60vh'
      >
        <form onSubmit={handleSubmit}>
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
