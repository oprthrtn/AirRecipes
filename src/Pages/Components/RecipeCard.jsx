import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Skeleton } from "@mui/material";
import Fade from '@mui/material/Fade';


function RecipeCard(props) {
  let navigate = useNavigate();
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  function click(recipeId) {
    navigate('/' + recipeId, { replace: false });
  }

  function handleOnLoad() {
    setImageIsLoaded(true)
  }

  useEffect(() => {
    setImageIsLoaded(false);
  }, [])

  return (
    <Fade in={true} timeout={700}>
      <CardActionArea sx={props.cardStyle} onClick={() => { click(props.recipe.id) }}>
        <Card sx={props.cardStyle}>

          {
            imageIsLoaded ? (
              <CardMedia
                component="img"
                height="196"
                image={props.recipe.thumbnail}
              />
            ) : (
              <Skeleton animation="wave" variant='rectangular' width='100%'>
                <CardMedia
                  component="img"
                  height="196"
                  image={props.recipe.thumbnail}
                  onLoad={handleOnLoad}
                />
              </Skeleton>
            )
          }

          <Stack direction="row" spacing={1} className="chipsStack"
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '16px',
              top: '146px'
            }}>
            <Chip label={props.recipe.cookTime} sx={{ bgcolor: 'base1.main' }} />
            <Chip label={`${props.recipe.caloricity} kCal`} sx={{ bgcolor: 'base1.main' }} />
            <Chip label={props.recipe.cuisine.title} sx={{ bgcolor: 'base1.main' }} />
          </Stack>

          <CardContent align="left" sx={{ p: '24px' }}>
            <Typography variant="h3">{props.recipe.title}</Typography>
            <Typography
              component="div"
              style={{
                paddingTop: '8px',
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {props.recipe.description}
            </Typography>

          </CardContent>
        </Card>

      </CardActionArea>
    </Fade>
  );
}

export default RecipeCard;