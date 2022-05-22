import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {useDispatch} from 'react-redux';
import { useNavigate  } from 'react-router-dom';

import { useEffect } from "react";
const cardStyle = { width: 348, height : 384, borderRadius : "8px", mr : "20px", mb : "24px"}


function RecipeCard(props){
  const dispatch = useDispatch();
  let navigate = useNavigate();

  function click(navigate, recipeId){
    navigate('/' + recipeId, { replace: false });
  }

  return(
    <CardActionArea sx={cardStyle} onClick={() => {click(navigate, props.recipe.id)}}>
        <Card sx={cardStyle}>
            <CardMedia
              component="img"
              height="196"
              image={props.recipe.thumbnail}
            />
            
            <Stack direction="row" spacing={1} className="chipsStack"
              sx={{
                display : 'flex',
                justifyContent : 'flex-end',
                position : 'absolute',
                right : '16px',
                top : '146px'
              }}>
              <Chip label={props.recipe.cookTime} sx={{bgcolor: 'base1'}}/>
              <Chip label={`${props.recipe.caloricity} kCal`} sx={{bgcolor: 'base1'}}/>
              <Chip label={props.recipe.cuisine.title} sx={{bgcolor: 'base1'}}/>
            </Stack>
            
            <CardContent align="left">
              <Typography variant="h3" component="div" sx={{mt : "24px", mb : "8px"}}>
               {props.recipe.title}
              </Typography>
              <Typography variant="body">{props.recipe.description}</Typography>
            </CardContent>
          </Card>
          
    </CardActionArea>
  );
}

export default RecipeCard;