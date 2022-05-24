import Typography from '@mui/material/Typography';
import { Checkbox } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { ChangeCuisineTagThunkCreator } from '../../redux/reducer';
import { useDispatch } from 'react-redux';

function CuisineCheckboxes(props) {

  const dispatch = useDispatch();
  function changeCheckbox(cuisineTag) {
    props.setFilterIsChanged(true);
    dispatch(ChangeCuisineTagThunkCreator(props.filter, cuisineTag));
  }

  return (
    <List sx={{ mx: '32px', p: 0 }}>
      {Object.keys(props.filter.allCuisines).map((cuisine, index) => {
        return (
          <div key={index}>
            <ListItem
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: '0',
                py: '5px',
              }}
            >
              <Typography variant="body" color="base0">
                {cuisine}
              </Typography>
              <Checkbox
                checked={props.filter.allCuisines[cuisine]}
                onClick={() => { changeCheckbox(cuisine) }}
                sx={{
                  px: 0,
                  color: 'shade40.main',
                  '&.Mui-checked': {
                    color: 'shade50.main',
                  },
                }}
              />
            </ListItem>
            <Divider />
          </div>
        )
      })
      }
    </List>
  )
}

export default CuisineCheckboxes;