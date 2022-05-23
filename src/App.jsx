import './css/App.css';
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './customization/Theme';
import MainPageContainer from './Pages/MainPage';

function App() {
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
          <MainPageContainer/>
      </ThemeProvider>
    </div>
  );
}

export default App;
