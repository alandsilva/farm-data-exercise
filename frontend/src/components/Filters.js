import React from 'react';
import Filter from './Filter';
import DateFilter from './DateFilter';

const Filters = (props) => {
  return (
    <div>
      <Filter
        title='pH'
        min={props.filters.phMin}
        max={props.filters.phMax}
        setMin={props.setPhMin}
        setMax={props.setPhMax}
        minLimit={0}
        maxLimit={14}
      />
      <Filter
        title='temperature'
        min={props.filters.tempMin}
        max={props.filters.tempMax}
        setMin={props.setTempMin}
        setMax={props.setTempMax}
        minLimit={-50}
        maxLimit={100}
      />
      <Filter
        title='rainFall'
        min={props.filters.rainMin}
        max={props.filters.rainMax}
        setMin={props.setRainMin}
        setMax={props.setRainMax}
        minLimit={0}
        maxLimit={500}
      />
      <DateFilter />
    </div>
  );
};

export default Filters;
