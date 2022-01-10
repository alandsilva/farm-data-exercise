import React from 'react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const FarmsStatistics = (props) => {
  const phStats = props.stats.filter((loc) => loc._id.sensorType === 'pH');
  const tempStats = props.stats.filter(
    (loc) => loc._id.sensorType === 'temperature'
  );
  const rainStats = props.stats.filter(
    (loc) => loc._id.sensorType === 'rainFall'
  );
  return (
    <div>
      <BarChart width={700} height={250} data={phStats}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='_id.location' />
        <YAxis label={{ value: 'ph', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend />
        <Bar dataKey='min' fill='#8884d8' />
        <Bar dataKey='avg' fill='#82ca9d' />
        <Bar dataKey='max' fill='black' />
      </BarChart>
      <BarChart width={700} height={250} data={tempStats}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='_id.location' />
        <YAxis
          label={{ value: 'temperature', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey='min' fill='#8884d8' />
        <Bar dataKey='avg' fill='#82ca9d' />
        <Bar dataKey='max' fill='black' />
      </BarChart>
      <BarChart width={700} height={250} data={rainStats}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='_id.location' />
        <YAxis
          label={{ value: 'rainFall', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey='min' fill='#8884d8' />
        <Bar dataKey='avg' fill='#82ca9d' />
        <Bar dataKey='max' fill='black' />
      </BarChart>
    </div>
  );
};

export default FarmsStatistics;
