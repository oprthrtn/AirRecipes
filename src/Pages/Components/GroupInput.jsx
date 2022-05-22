import OutlinedInput from '@mui/material/OutlinedInput';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import {useRef} from 'react';
import { useDispatch } from 'react-redux';
import { FilterTitleRecipesListThunkCreator} from '../../Redux/reducer';
import CustomizedDialogs from './DialogFilter';
import { connect } from "react-redux";

function GroupInput(props){
    
    const inputRef = useRef(null);
    const dispatch = useDispatch();

    function handleKeyPress(e){
        
        if(e.key === 'Enter'){
            dispatch(FilterTitleRecipesListThunkCreator(props.filter, inputRef.current.value, props.listOfRecipes));
        }
    }
    
    return(
        <Box sx={{display : 'flex', alignItems : 'center'}}>
            <OutlinedInput 
                inputRef={inputRef}
                onKeyPress ={handleKeyPress}
                placeholder="Search"
                sx={{borderRadius : '28px', backgroundColor : 'white',}}
                startAdornment={<SearchIcon style={{color : '#A9A9A9'}}/>}
            />
            
            <CustomizedDialogs filter={props.filter} listOfRecipes={props.listOfRecipes}></CustomizedDialogs>
        </Box>
    );
}

function mapStateToProps(state){
    return {filter : state.recipesPage.filter, listOfRecipes : state.recipesPage.listOfRecipes}
}

const GroupInputContainer = connect(mapStateToProps, {FilterTitleRecipesListThunkCreator}) (GroupInput);
export default GroupInputContainer;