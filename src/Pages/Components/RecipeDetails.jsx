import Typography from '@mui/material/Typography';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ClearRecipeDetailsThunkCreator, GetRecipeDetailsThunkCreator } from '../../Redux/reducer';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import ImageSlider from './ImageSlider';

function getDifficultyIcon(difficulty){
  let clr;
  if(difficulty === 'easy') clr = '#2FB65D';
  else if(difficulty === 'hard') clr = '#EB3C31';
  else if(difficulty === 'medium') clr = '#EB8A31';

  return(
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="path-1-inside-1_36_487" fill="white">
  <path fillRule="evenodd" clipRule="evenodd" d="M5.91742 3.39448C6.7439 1.40166 8.70826 0 11 0C13.2917 0 15.2561 1.40167 16.0826 3.3945C16.3955 3.3325 16.719 3.29999 17.0501 3.29999C19.7839 3.29999 22.0001 5.51618 22.0001 8.24999C22.0001 10.4053 20.6226 12.2388 18.7 12.9183V21.9H3.30003V12.9183C1.37745 12.2388 0 10.4053 0 8.24999C0 5.51618 2.21619 3.29999 4.95 3.29999C5.28107 3.29999 5.60455 3.33249 5.91742 3.39448Z"/>
  </mask>
  <path fill={clr} d="M5.91742 3.39448L5.6259 4.86588L6.83197 5.10483L7.30299 3.96911L5.91742 3.39448ZM16.0826 3.3945L14.697 3.96912L15.168 5.10487L16.3741 4.86589L16.0826 3.3945ZM18.7 12.9183L18.2002 11.5041L17.2 11.8576V12.9183H18.7ZM18.7 21.9V23.4H20.2V21.9H18.7ZM3.30003 21.9H1.80003V23.4H3.30003V21.9ZM3.30003 12.9183H4.80003V11.8576L3.79989 11.5041L3.30003 12.9183ZM7.30299 3.96911C7.90526 2.5169 9.33564 1.5 11 1.5V-1.5C8.08088 -1.5 5.58253 0.286423 4.53185 2.81984L7.30299 3.96911ZM11 1.5C12.6644 1.5 14.0948 2.51691 14.697 3.96912L17.4682 2.81987C16.4175 0.286434 13.9191 -1.5 11 -1.5V1.5ZM16.3741 4.86589C16.5915 4.82281 16.8174 4.79999 17.0501 4.79999V1.79999C16.6206 1.79999 16.1994 1.84218 15.791 1.9231L16.3741 4.86589ZM17.0501 4.79999C18.9555 4.79999 20.5001 6.3446 20.5001 8.24999H23.5001C23.5001 4.68775 20.6123 1.79999 17.0501 1.79999V4.79999ZM20.5001 8.24999C20.5001 9.74981 19.5422 11.0298 18.2002 11.5041L19.1999 14.3326C21.7031 13.4479 23.5001 11.0607 23.5001 8.24999H20.5001ZM17.2 12.9183V21.9H20.2V12.9183H17.2ZM18.7 20.4H3.30003V23.4H18.7V20.4ZM4.80003 21.9V12.9183H1.80003V21.9H4.80003ZM3.79989 11.5041C2.45789 11.0298 1.5 9.7498 1.5 8.24999H-1.5C-1.5 11.0607 0.297011 13.4479 2.80017 14.3326L3.79989 11.5041ZM1.5 8.24999C1.5 6.34461 3.04462 4.79999 4.95 4.79999V1.79999C1.38776 1.79999 -1.5 4.68775 -1.5 8.24999H1.5ZM4.95 4.79999C5.18267 4.79999 5.40852 4.82281 5.6259 4.86588L6.20894 1.92308C5.80058 1.84217 5.37947 1.79999 4.95 1.79999V4.79999Z" mask="url(#path-1-inside-1_36_487)"/>
</svg>)
}

function RecipeDetails(props){
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ClearRecipeDetailsThunkCreator());
    dispatch(GetRecipeDetailsThunkCreator(props.id));
  }, [])

  const details = props.details;

  return(
    <div data-aos="fade-down" style={{display : 'flex', flexGrow : 1}}>
    {
       Object.keys(details).length ? (
         <Grid  container wrap='nowrap'>
          <Grid item xs={6} sx={{display : 'flex', flexDirection : 'column', textAlign: 'left'}}> 
            <Typography variant="h2" >{details.title}</Typography>
            <Typography variant="body"color="base0">{details.description}</Typography>

            <Box >
              {getDifficultyIcon(details.difficulty)}
              <Typography variant="body"color={details.difficulty}>{details.difficulty}</Typography>
            </Box>

            <Typography  variant="h3" >Ingredients</Typography>
            <ul>
              {details.ingredients.map((ingredient, index) => {
                return(<li key={index} >{ingredient} </li>)
              })}
            </ul>

            <Typography  variant="h3" >Instructions</Typography>
            <ul>
              {details.instructions.map((ingredient, index) => {
                return(<li key={index}>{ingredient}</li>)
              })}
            </ul>
          </Grid>
          <Grid item  xs={6} > 
            <ImageSlider images={details.images}/>
          </Grid>
        </Grid>

      ) : (
        <div>LOADING</div>
      )
    }
    </div>
  );
} 

export default RecipeDetails;