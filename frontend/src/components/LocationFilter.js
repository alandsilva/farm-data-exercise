import React from 'react';
import Menu from '@mui/material/Menu';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

const LocationFilter = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLocationChange = (event) => {
    props.setLocation(event.target.value);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <Badge color='secondary' variant='dot'>
          <FilterListIcon />
        </Badge>
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <RadioGroup
          defaultValue=''
          name='radio-buttons-group'
          value={props.location}
          onChange={onLocationChange}
        >
          <FormControlLabel value='' control={<Radio />} label='All' />
          {props.locationList.map((location) => (
            <FormControlLabel
              key={location._id}
              value={location._id}
              control={<Radio />}
              label={location._id}
            />
          ))}
        </RadioGroup>
      </Menu>
    </>
  );
};

export default LocationFilter;
