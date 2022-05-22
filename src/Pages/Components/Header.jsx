import headerImg from '../../Images/HeaderImg.png';
import GroupInput from './GroupInput';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import '../../CustomizationAndCSS/Header.css'
import '../../CustomizationAndCSS/hdr'
import Container from '@mui/material/Container';
import GroupInputContainer from './GroupInput';
function Header(){
    return(
        <Box data-aos="fade-down" id='navbar' sx={{display : 'flex', alignItems : 'center'}}>
            <Container maxWidth="lg" wrap="wrap" sx={{display : 'flex'}}>
                <Box id='headerInputBox' sx={{display : 'inline-flex', flexDirection : 'column', textAlign: 'left'}}> 
                    <Typography  variant="h1" >Air Recipes</Typography>
                    <Typography variant="body"color="shade50">Best Recipes for Best People</Typography>
                    <GroupInputContainer/>
                </Box>
            </Container>
        </Box>
    );
}

export default Header;