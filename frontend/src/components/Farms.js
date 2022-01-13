import React, { useState, useEffect } from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import FarmsTable from './FarmsTable';
import FarmsStatistics from './FarmsStatistics';

import farmsService from '../services/farms';

const Farms = (props) => {
  const [farms, setFarms] = useState([]);
  const [stats, setStats] = useState([]);
  const [count, setCount] = useState(0);
  const [tab, setTab] = React.useState('1');

  const [locationList, setLocationList] = useState([]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    const getFarms = async () => {
      const qs = Object.keys(props.filters)
        .map((key) => `${key}=${props.filters[key]}`)
        .join('&');
      const data = await farmsService.getFarms(qs);
      setFarms(data.farms);
      setCount(data.count);
      setStats(data.locationStats);
    };
    getFarms();
  }, [props.filters]);

  useEffect(() => {
    const getInfo = async () => {
      const data = await farmsService.getInfo();
      setLocationList(data.locations);
    };
    getInfo();
  }, []);
  return (
    <div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='Table' value='1' />
              <Tab label='Statistics' value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            <FarmsTable
              farms={farms}
              count={count}
              locationList={locationList}
              {...props}
            />
          </TabPanel>
          <TabPanel value='2'>
            <FarmsStatistics stats={stats} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Farms;
