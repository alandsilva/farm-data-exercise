import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import farmsService from '../services/farms';

const Farms = (props) => {
  const [farms, setFarms] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getFarms = async () => {
      const qs = Object.keys(props.filters)
        .map((key) => `${key}=${props.filters[key]}`)
        .join('&');
      const data = await farmsService.getFarms(qs);
      console.log(data);
      setFarms(data.farms);
      setCount(data.count);
    };
    getFarms();
  }, [props.filters]);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell align='right'>date</TableCell>
              <TableCell align='right'>sensor</TableCell>
              <TableCell align='right'>value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {farms.map((farm) => (
              <TableRow
                key={farm._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {farm.location}
                </TableCell>
                <TableCell align='right'>{farm.datetime}</TableCell>
                <TableCell align='right'>{farm.sensorType}</TableCell>
                <TableCell align='right'>{farm.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={count}
        rowsPerPage={props.filters.limit}
        page={props.filters.page}
        onPageChange={(event, newPage) => {
          props.setPage(newPage);
        }}
        onRowsPerPageChange={(event) => {
          props.setLimit(parseInt(event.target.value, 10));
        }}
      />
    </div>
  );
};

export default Farms;