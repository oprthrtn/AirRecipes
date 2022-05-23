import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from "react-redux";

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import OutlinedInput from '@mui/material/OutlinedInput';

import CustomizedDialogs from './DialogFilter';
import { SetTitleInFilterThunkCreator } from '../../redux/reducer';
import { useNavigate } from 'react-router-dom';



function GroupInput(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const inputRef = useRef();
    const [isInputEmpty, setInputEmpty] = useState(false);


    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            dispatch(SetTitleInFilterThunkCreator(props.filter, inputRef.current.value, props.listOfRecipes));
            navigate('/', { replace: false });
        }
    }

    function handeOnChange(e) {
        setInputEmpty(inputRef.current.value ? true : false)
    }

    function clearInput() {
        inputRef.current.value = "";
        setInputEmpty(false)
        dispatch(SetTitleInFilterThunkCreator(props.filter, inputRef.current.value, props.listOfRecipes));
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

            <OutlinedInput
                inputRef={inputRef}
                onChange={handeOnChange}
                onKeyPress={handleKeyPress}

                placeholder="Search"
                sx={{ backgroundColor: 'white' }}

                startAdornment={<SearchIcon />}
                endAdornment={
                    <Fade in={isInputEmpty}>
                        <IconButton aria-label="delete" onClick={clearInput}>
                            <CancelIcon />
                        </IconButton>
                    </Fade>
                }
            />

            <CustomizedDialogs filter={props.filter} listOfRecipes={props.listOfRecipes}></CustomizedDialogs>
        </Box>
    );
}

function mapStateToProps(state) {
    return { filter: state.recipesPage.filter, listOfRecipes: state.recipesPage.listOfRecipes }
}

const GroupInputContainer = connect(mapStateToProps, { SetTitleInFilterThunkCreator })(GroupInput);
export default GroupInputContainer;