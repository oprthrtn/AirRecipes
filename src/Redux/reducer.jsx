import {airRecipesAPI} from '../api/airRecipesAPI';

const GET_RECIPES_LIST = "GET_RECIPES_LIST";
const SET_RECIPE_DETAILS = "SET_RECIPE_DETAILS";
const SET_FILTER = 'SET_FILTER';

const SET_CUISINE_TAGS = 'SET_CUISINE_TAGS';
const APPLY_FILTER = 'APPLY_FILTER';

const SET_MAX_MIN_CALORIES = 'SET_MAX_MIN_CALORIES';
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
        case SET_RECIPE_DETAILS:
            newState.choosenRecipe = action.value 
            return newState;
        case SET_FILTER: 
            newState.filter = action.value;
            return newState;
        case APPLY_FILTER:
            newState.filtredListOfRecipes = action.value;
            return newState;
        case SET_CUISINE_TAGS: 
            fltr.allCuisines = action.value;
            newState.filter = fltr;
            return newState;
        case SET_MAX_MIN_CALORIES:
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

function SetRecipeDetailsActionCreator(value) {
    return {
        type : SET_RECIPE_DETAILS,
        value : value
    };
}

function ApplyFilterActionCreator(value) {
    return {
        type : APPLY_FILTER,
        value : value
    };
}

function SetCuisinesTagsActionCreator(value) {
    return {
        type : SET_CUISINE_TAGS,
        value : value
    };
}

function SetFilterActionCreator(value){
    return {
        type : SET_FILTER,
        value : value
    };
}

function SetMaxMinCaloriesActionCreator(value){
    return {
        type : SET_MAX_MIN_CALORIES,
        value : value
    };
}

function SetkCalActionCreator(value){
    return {
        type : SET_kCal,
        value : value
    };
}



function convertSecToMinOrHrs(seconds){
    let minutes = seconds / 60;
    return minutes >= 60 ? `${minutes / 60} hours` :`${minutes} min`;
}

export function GetRecipesListThunkCreator(){
    return(dispatch) => {
        airRecipesAPI.GetRecipesList().then(response => {
            if(response.status === 200){
                response = response.data.recipes;

                for(let recipe of response){
                    recipe.cookTime = convertSecToMinOrHrs(recipe.cookTime);
                }
                
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
                response.cookTime = convertSecToMinOrHrs(response.cookTime);
                dispatch(SetRecipeDetailsActionCreator(response));
            }
        })
    }
}

export function ClearRecipeDetailsThunkCreator(){
    return(dispatch) => {
        dispatch(SetRecipeDetailsActionCreator({}));
    }
}


export function ApplyFilterThunkCreator(filter, listOfRecipes){
    return(dispatch) => {
        let filtredListOfRecipes = listOfRecipes.filter((recipe) => {

            let isTitleValid = recipe.title.toLowerCase().includes(filter.title.toLowerCase());
            let isTagValid = filter.allCuisines[recipe.cuisine.title];
            let iskCalValid = (recipe.caloricity >= filter.choosenCalories[0] && recipe.caloricity <= filter.choosenCalories[1])
            if(isTitleValid && isTagValid && iskCalValid) return true;
            return false;
        })

        dispatch(ApplyFilterActionCreator(filtredListOfRecipes));
    }
}

export function SetTitleInFilterThunkCreator(filter, title, listOfRecipes){
    return(dispatch) => {
        let newFilter = {...filter}
        newFilter.title = title;
        dispatch(SetFilterActionCreator(newFilter));
        dispatch(ApplyFilterThunkCreator(newFilter, listOfRecipes));
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

        dispatch(SetkCalActionCreator([minCaloricity, maxCaloricity]))
        dispatch(SetMaxMinCaloriesActionCreator([minCaloricity, maxCaloricity]));
        dispatch(SetCuisinesTagsActionCreator(cuisinesTags));
    }
}

export function ChangeCuisineTagThunkCreator(filter, cuisineTag){ //bruh
    return(dispatch) => {
        let newFilter = {...filter};
        let newCuisines = {...newFilter.allCuisines}
        newCuisines[cuisineTag] = !newCuisines[cuisineTag];
        newFilter.allCuisines =  newCuisines
        dispatch(SetFilterActionCreator(newFilter));
    }
}

export function SetToDefaultCuisinesTagsThunkCreator(filter){
    return(dispatch) => {
        let newFilter = {...filter};
        let newCuisines = {...newFilter.allCuisines}

        for(let tag in newCuisines){
            newCuisines[tag] = true;
        }

        newFilter.allCuisines =  newCuisines
        dispatch(SetFilterActionCreator(newFilter));
    }
}

export function SetkCalThunkCreator(value){ 
    return(dispatch) => {
        dispatch(SetkCalActionCreator(value));
    }
}