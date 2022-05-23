
import { connect } from "react-redux";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { GetRecipeDetailsThunkCreator } from '../../redux/reducer';
import GroupInputContainer from './GroupInput';
import '../../css/header.css';
import '../../js/hdr';

function Header() {

    return (
        <Box id='navbar' sx={{ display: 'flex', alignItems: 'center' }}>
            <Container maxWidth="lg" sx={{ display: 'flex' }}>

                <Box id='headerInputBox' sx={{ textAlign: 'left' }}>
                    <Typography variant="h1" color="base0">Air Recipes</Typography>
                    <Typography variant="body" color="shade50">Best Recipes for Best People</Typography>
                    <GroupInputContainer />
                </Box>

            </Container>
        </Box>
    );
}

function mapStateToProps(state) {
    return { choosenRecipe: state.recipesPage.choosenRecipe }
}

const HeaderContainer = connect(mapStateToProps, { GetRecipeDetailsThunkCreator })(Header);
export default HeaderContainer;