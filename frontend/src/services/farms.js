import axios from 'axios';

const baseUrl = process.env.REACT_APP_BACKEND_URL;

const getInfo = async () => {
  const response = await axios.get(`${baseUrl}/farms/info`);
  return response.data;
};

const getFarms = async (query = '') => {
  const response = await axios.get(`${baseUrl}/farms/?${query}`);
  return response.data;
};

const createFarm = async (farmObject) => {
  const response = await axios.post(`${baseUrl}/farms/`, farmObject);
  return response.data;
};

const uploadCsv = async (formData) => {
  const response = await axios.post(`${baseUrl}/farms/csv`, formData, {
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });
  return response.data;
};

const services = {
  getInfo,
  getFarms,
  createFarm,
  uploadCsv,
};
export default services;
