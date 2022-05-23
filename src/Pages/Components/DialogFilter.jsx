import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Fade from '@mui/material/Fade';

import { SetToDefaultCuisinesTagsThunkCreator, ApplyFilterThunkCreator, SetkCalThunkCreator } from '../../redux/reducer';
import CuisineCheckboxes from './CuisineCheckboxes';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle variant="h3" sx={{ ml: '32px', mt: '32px', mb: '28px', p: 0 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


export default function CustomizedDialogs(props) {

  const [open, setOpen] = useState(false);
  const [filterIsChanged, setFilterIsChanged] = useState(false);
  const dispatch = useDispatch();
  const minDistance = 150;
  const minMaxVal = props.filter.calories;

  function handleClickOpen() {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  };

  function showRecipes() {
    dispatch(ApplyFilterThunkCreator(props.filter, props.listOfRecipes));
    setOpen(false);
  }

  const [calories, setCalories] = useState(props.filter.calories);

  function handleChangeCheckBox(event, newValue, activeThumb) {
    if (!Array.isArray(newValue)) {
      return;
    }

    setFilterIsChanged(true);
    if (activeThumb === 0) {
      setCalories([Math.min(newValue[0], calories[1] - minDistance), calories[1]]);
    } else {
      setCalories([calories[0], Math.max(newValue[1], calories[0] + minDistance)]);
    }
  };

  function setCurrentkCal() {
    dispatch(SetkCalThunkCreator(calories))
  }

  function resetFilter() {
    dispatch(SetToDefaultCuisinesTagsThunkCreator(props.filter))
    dispatch(SetkCalThunkCreator(props.filter.calories))
    setCalories(props.filter.calories);
    setFilterIsChanged(false)
  }

  useEffect(() => {
    setCalories(props.filter.calories)
  }, [props.filter.calories])


  return (
    <div >
      <IconButton
        onClick={handleClickOpen}
        aria-label="delete"
        size="large"
        sx={{
          border: 1,
          backgroundColor: 'white',
          borderColor: 'shade40',
          m: 3
        }}
      >
        <FilterListIcon />
      </IconButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth='xs'
        fullWidth={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Filter
        </BootstrapDialogTitle>

        <DialogContent style={{ overflow: "hidden", padding: 0 }}>
          <CuisineCheckboxes filter={props.filter} setFilterIsChanged={setFilterIsChanged} />

          <Box sx={{ mx: '32px', mt: '72px' }}>
            <Slider
              valueLabelDisplay='on'
              value={calories}
              min={minMaxVal[0]}
              max={minMaxVal[1]}
              onChange={handleChangeCheckBox}
              onChangeCommitted={setCurrentkCal}
              disableSwap
            />
            <Typography variant="body" color="base0">Calories, kCal</Typography>
          </Box>

        </DialogContent>

        <DialogActions style={{ padding: 0, margin: '62px 32px 32px 32px', justifyContent: 'space-between' }}>

          <Fade in={filterIsChanged}>
            <Button
              autoFocus
              onClick={resetFilter}
              variant="outlined"
              style={{ color: '#82786A', borderColor: '#82786A' }}
            >
              <Typography variant="body">Clear</Typography>
            </Button>
          </Fade>

          <Button
            autoFocus onClick={showRecipes}
            variant="contained"
            style={{ backgroundColor: '#82786A' }}
          >
            Show Recipes
          </Button>
        </DialogActions>

      </BootstrapDialog>
    </div>
  );
}