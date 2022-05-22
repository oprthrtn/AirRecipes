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
import { Box, Checkbox } from '@mui/material';
import { useDispatch } from 'react-redux';
import Slider from '@mui/material/Slider';
import { ChangeCuisineTagThunkCreator, SetFilterRecipesListThunkCreator, SetkCalThunkCreator} from '../../Redux/reducer';

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
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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

  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  
  const minDistance = 150;
  const minMaxVal = props.filter.calories;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function showRecipes(){
    dispatch(SetFilterRecipesListThunkCreator(props.filter, props.listOfRecipes));
    setOpen(false);
  }

  function changeCheckbox(cuisineTag){
    dispatch(ChangeCuisineTagThunkCreator(props.filter, cuisineTag))
  }

  const [value1, setValue1] = React.useState(props.filter.calories);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  function setCurrentkCal() {
    dispatch(SetkCalThunkCreator(value1))
  }

  React.useEffect(() => {
    setValue1(props.filter.calories)
  }, [props.filter.calories])

  return (
    <div>
      <IconButton
        onClick={handleClickOpen}
        aria-label="delete" 
        size="large"
        sx={{
            border : 1,
            backgroundColor : 'white',
            borderColor : 'shade40',
            m : 3
        }}
      >
        <FilterListIcon fontSize="inherit"/>
      </IconButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth='sm' 
        fullWidth={true} 
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Filter
        </BootstrapDialogTitle>

        <DialogContent >
          {Object.keys(props.filter.allCuisines).map((cuisine, index) => {
            return(
              <Box key={index} sx={{display : 'flex', alignItems: 'center'}}>
                <Typography>
                  {cuisine}
                </Typography>
                <Checkbox 
                  checked={props.filter.allCuisines[cuisine]}
                  onClick={() => {changeCheckbox(cuisine)}}
                  ></Checkbox>
              </Box>)
          })}

          <Box sx={{ width: 300 }}>
            <Slider 
              valueLabelDisplay='on'
              value={value1}
              min={minMaxVal[0]}
              max={minMaxVal[1]}
              onChange={handleChange1}
              onChangeCommitted={setCurrentkCal}
              disableSwap
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={showRecipes}>
            Show Recipes
          </Button>
        </DialogActions>

      </BootstrapDialog>
    </div>
  );
}