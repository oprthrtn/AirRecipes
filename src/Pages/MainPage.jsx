import { connect } from "react-redux";
import Grid from '@mui/material/Grid';
import RecipeCard from './Components/RecipeCard';
import Container from '@mui/material/Container';
import Header from './Components/Header';
import {GetRecipesListThunkCreator, SetFilterRecipesListThunkCreator} from "../Redux/reducer";
import { useEffect } from "react";
import Skeleton from '@mui/material/Skeleton';
import {
    BrowserRouter,
    Route,
    Routes
  } from "react-router-dom";
import RecipeDetails from "./Components/RecipeDetails";
import ImageSlider from "./Components/ImageSlider";


function MainPage(props){
    useEffect(() => {
        props.GetRecipesListThunkCreator()
    }, [])

    let listOfRecipes = props.mainPage.filtredListOfRecipes;
    let choosenRecipe = props.mainPage.choosenRecipe;
    return(
        <div>
            <Header/>
            <Container id='content' maxWidth="lg" wrap="wrap" sx={{mt : "32px", mb : "32px", display : 'flex'}}>
                <Grid container >
                    <BrowserRouter>
                        <Routes>
                            <Route path ='/' element={
                                 
                                    listOfRecipes.length ? (
                                        listOfRecipes.map(recipe => {
                                            return(<RecipeCard recipe={recipe} key={recipe.id} />)
                                        })
                                    ) : (
                                        <div></div>
                                    )
                                
                            }/>
                            {
                                listOfRecipes.length ? (
                                    listOfRecipes.map(recipe => {
                                        return(
                                            <Route 
                                                path={'/' + recipe.id} 
                                                key={recipe.id} 
                                                element={<RecipeDetails id={recipe.id} details={choosenRecipe}/>}/>
                                            )
                                    })
                                ) : (
                                    <Route path={'/'}/>
                                )
                            }
                            
                        </Routes>
                    </BrowserRouter>
                </Grid>
            </Container>
        </div>
        
    );
}

function mapStateToProps(state){
    return {mainPage : state.recipesPage}
}
const MainPageContainer = connect(mapStateToProps, {GetRecipesListThunkCreator}) (MainPage);
export default MainPageContainer;