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

export default { getInfo, getFarms, createFarm };
