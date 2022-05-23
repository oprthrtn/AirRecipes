import './css/App.css';
import { ThemeProvider } from '@emotion/react';
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
