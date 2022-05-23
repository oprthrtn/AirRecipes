
import { connect } from "react-redux";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { GetRecipeDetailsThunkCreator } from '../../redux/reducer';
import GroupInputContainer from './GroupInput';
import '../../css/header.css';

import { useEffect, useState } from "react";



function Header(props) {
    const [headerState, setHeaderState] = useState('headerDefault');
    let difficultyOfhoosenRecipe = props.choosenRecipe.difficulty ? props.choosenRecipe.difficulty : 'none';

    function handeScroll() {
        let currentScroll = document.documentElement.scrollTop;

        if (currentScroll > 0) setHeaderState('headerCompressed');
        else if (currentScroll === 0) setHeaderState('headerDefault');
    }

    function Typographycustom(props) {
        return (
            <Typography
                className='headerText'
                variant={props.variant}
                color={(headerState === 'headerCompressed' && difficultyOfhoosenRecipe !== 'none') ? 'base1' : 'base0'}
            >{props.children}
            </Typography>
        )
    }

    useEffect(() => {
        window.addEventListener('scroll', handeScroll)
    }, [])


    
    return (
        <div>

            <Box
                className={`${headerState} header`}
                sx={{ display: 'flex', alignItems: 'center' }}
            >

                <Container maxWidth="lg" sx={{ display: 'flex' }}>

                    <Box id='headerInputBox' sx={{ textAlign: 'left' }}>

                        <Typographycustom variant="h1">
                            Air Recipes
                        </Typographycustom>

                        <Typographycustom variant="body">
                            Best Recipes for Best People
                        </Typographycustom>
                        <GroupInputContainer />
                    </Box>
                    <Box
                        id='tst'
                        sx={{
                            bgcolor: headerState === 'headerCompressed' ? difficultyOfhoosenRecipe : 'none',
                            transition: headerState === 'headerCompressed' ? '0.5s' : '0.1s'
                        }}>
                    </Box>
                </Container>

            </Box>

        </div>
    );
}

function mapStateToProps(state) {
    return { choosenRecipe: state.recipesPage.choosenRecipe }
}

const HeaderContainer = connect(mapStateToProps, { GetRecipeDetailsThunkCreator })(Header);
export default HeaderContainer;