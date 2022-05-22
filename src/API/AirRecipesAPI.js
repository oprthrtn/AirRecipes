import axios from "axios";

const apiUrl = 'https://test.kode-t.ru/';
const recipesList = 'list.json';

async function GetRecipesList(){
    return await axios.get(apiUrl + recipesList).then((response) => {
        return response;
    });
}

async function GetRecipeDetails(recipeId){
    return await axios.get(apiUrl + `/detail_${recipeId}.json`).then((response) => {
        return response;
    });
}

export const airRecipesAPI = {
    GetRecipesList : GetRecipesList,
    GetRecipeDetails : GetRecipeDetails
}