import {airRecipesAPI} from '../API/AirRecipesAPI';

const GET_RECIPES_LIST = "GET_RECIPES_LIST";
const GET_RECIPE_DETAILS = "GET_RECIPE_DETAILS";
const CLEAR_RECIPE_DETAILS = 'CLEAR_RECIPE_DETAILS';

const FILTER_TITLE_RECIPES_LIST = 'FILTER_TITLE_RECIPES_LIST';
const SET_CUISINE_TAGS = 'SET_CUISINE_TAGS';
const SET_FILTER_RECIPES_LIST = 'SET_FILTER_RECIPES_LIST';
const CHANGE_CUISINE_TAG = 'CHANGE_CUISINE_TAG';

const SET_CALORIES_BORDER = 'SET_CALORIES_BORDER';
const SET_kCal ='SET_kCal';

const initialState = {
    listOfRecipes : {},
    filtredListOfRecipes : {},

    filter : {
        title : '',
        allCuisines : {},
        calories : [],
        choosenCalories : []
    },
    
    choosenRecipe : {},
};

export function recipesReducer(state = initialState, action) {
    let newState = {...state};
    let fltr = {...newState.filter}
    switch(action.type) {
        case GET_RECIPES_LIST:
            newState.listOfRecipes = action.value;
            newState.filtredListOfRecipes = action.value
            return newState;
        case GET_RECIPE_DETAILS:
            newState.choosenRecipe = action.value
            return newState;
        case CLEAR_RECIPE_DETAILS:
            newState.choosenRecipe = action.value
            return newState;
        case FILTER_TITLE_RECIPES_LIST:
            newState.filter = action.value;
            return newState;
        case SET_FILTER_RECIPES_LIST:
            newState.filtredListOfRecipes = action.value;
            return newState;
        case SET_CUISINE_TAGS:
            
            fltr.allCuisines = action.value;
            newState.filter = fltr;

            return newState;
        case CHANGE_CUISINE_TAG:
            newState.filter = action.value;
            return newState;
        case SET_CALORIES_BORDER:
            fltr.calories = action.value;
            newState.filter = fltr;
            return newState;
        case SET_kCal:
            fltr.choosenCalories = action.value;
            newState.filter = fltr;
            return newState;
        default: return newState;
    }
}


function GetRecipesListActionCreator(value) {
    return {
        type : GET_RECIPES_LIST,
        value : value
    };
}

function GetRecipeDetailsActionCreator(value) {
    return {
        type : GET_RECIPE_DETAILS,
        value : value
    };
}

function ClearRecipeDetailsActionCreator() {
    return {
        type : CLEAR_RECIPE_DETAILS,
        value : {}
    };
}

function FilterTitleRecipesListActionCreator(value) {
    return {
        type : FILTER_TITLE_RECIPES_LIST,
        value : value
    };
}

function SetFilterRecipesListActionCreator(value) {
    return {
        type : SET_FILTER_RECIPES_LIST,
        value : value
    };
}

function SetCuisinesTagsActionCreator(value) {
    return {
        type : SET_CUISINE_TAGS,
        value : value
    };
}

function ChangeCuisineTagActionCreator(value){
    return {
        type : CHANGE_CUISINE_TAG,
        value : value
    };
}

function SetCaloriesActionCreator(value){
    return {
        type : SET_CALORIES_BORDER,
        value : value
    };
}

function SetkCalActionCreator(value){
    return {
        type : SET_kCal,
        value : value
    };
}
export function GetRecipesListThunkCreator(){
    return(dispatch) => {
        airRecipesAPI.GetRecipesList().then(response => {
            if(response.status === 200){
                response = response.data.recipes;
                dispatch(SetCuisinesTagsAndCaloriesThunkCreator(response));
                dispatch(GetRecipesListActionCreator(response));
            }
        })
    }
}

export function GetRecipeDetailsThunkCreator(recipeId){
    return(dispatch) => {
        airRecipesAPI.GetRecipeDetails(recipeId).then(response => {

            if(response.status === 200){
                response = response.data.recipe;
                dispatch(GetRecipeDetailsActionCreator(response));
            }
        })
    }
}

export function ClearRecipeDetailsThunkCreator(){
    return(dispatch) => {
        dispatch(ClearRecipeDetailsActionCreator());
    }
}



export function FilterTitleRecipesListThunkCreator(filter, title, listOfRecipes){
    return(dispatch) => {
        let newFilter = {...filter}
        newFilter.title = title;
        dispatch(FilterTitleRecipesListActionCreator(newFilter));
        dispatch(SetFilterRecipesListThunkCreator(newFilter, listOfRecipes));
    }
}

export function SetFilterRecipesListThunkCreator(filter, listOfRecipes){
    console.log(filter)
    return(dispatch) => {
        let filtredListOfRecipes = listOfRecipes.filter((recipe) => {

            let isTitleValid = recipe.title.toLowerCase().includes(filter.title.toLowerCase());
            let isTagValid = filter.allCuisines[recipe.cuisine.title];
            let iskCalValid = (recipe.caloricity >= filter.choosenCalories[0] && recipe.caloricity <= filter.choosenCalories[1])
            if(isTitleValid && isTagValid && iskCalValid) return true;
            return false;
        })

        dispatch(SetFilterRecipesListActionCreator(filtredListOfRecipes));
    }
}

export function SetCuisinesTagsAndCaloriesThunkCreator(listOfRecipes){
    return(dispatch) => {
        let cuisinesTags = {};

        listOfRecipes.forEach((recipe) => {
            cuisinesTags[recipe.cuisine.title] = true;
        })


        let maxCaloricity = Math.max(...listOfRecipes.map(recipe => recipe.caloricity));
        let minCaloricity = Math.min(...listOfRecipes.map(recipe => recipe.caloricity));
        dispatch(SetCaloriesActionCreator([minCaloricity, maxCaloricity]));
        dispatch(SetCuisinesTagsActionCreator(cuisinesTags));
    }
}

export function ChangeCuisineTagThunkCreator(filter, cuisineTag){ //bruh
    return(dispatch) => {
        let newFilter = {...filter};
        let newCuisines = {...newFilter.allCuisines}
        newCuisines[cuisineTag] = !newCuisines[cuisineTag];
        newFilter.allCuisines =  newCuisines
        dispatch(ChangeCuisineTagActionCreator(newFilter));
    }
}


export function SetkCalThunkCreator(value){ 
    return(dispatch) => {
        dispatch(SetkCalActionCreator(value));
    }
}