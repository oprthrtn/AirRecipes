import { useEffect } from "react";

import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Grid from '@mui/material/Grid';
import { Skeleton } from "@mui/material";
import Container from '@mui/material/Container';

import RecipeCard from './components/RecipeCard';
import HeaderContainer from './components/Header';
import RecipeDetails from "./components/RecipeDetails";
import { GetRecipesListThunkCreator } from "../redux/reducer";



const cardStyle = { width: 348, height: 384, borderRadius: "8px"};

function MainPage(props) {

    useEffect(() => {
        props.GetRecipesListThunkCreator()
    }, [])

    let filtredlistOfRecipes = props.mainPage.filtredListOfRecipes;
    let choosenRecipe = props.mainPage.choosenRecipe;

    return (
        <div>
            <HeaderContainer />

            <Container id='content' >
                <Grid container  sx={{gap : '24px 20px'}}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={
                                props.mainPage.listOfRecipes.length ? (
                                    filtredlistOfRecipes.map(recipe => {
                                        return (<RecipeCard cardStyle={cardStyle} recipe={recipe} key={recipe.id} />)
                                    })
                                ) : (
                                    <div style={{ display: 'flex' }}>
                                        <Skeleton animation="wave" variant='rectangular' sx={cardStyle}></Skeleton>
                                        <Skeleton animation="wave" variant='rectangular' sx={cardStyle}></Skeleton>
                                        <Skeleton animation="wave" variant='rectangular' sx={cardStyle}></Skeleton>
                                    </div>
                                )

                            } />
                            {
                                props.mainPage.listOfRecipes.length ? (
                                    props.mainPage.listOfRecipes.map(recipe => {
                                        return (
                                            <Route
                                                path={'/' + recipe.id}
                                                key={recipe.id}
                                                element={<RecipeDetails id={recipe.id} details={choosenRecipe} />} 
                                            />
                                        )
                                    })
                                ) : (
                                    <Route path={'/'} />
                                )
                            }
                        </Routes>
                    </BrowserRouter>
                </Grid>
            </Container>
        </div>
    );
}

function mapStateToProps(state) {
    return { mainPage: state.recipesPage }
}

const MainPageContainer = connect(mapStateToProps, { GetRecipesListThunkCreator })(MainPage);
export default MainPageContainer;