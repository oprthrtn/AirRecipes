import './App.css';
import MainPageContainer from './Pages/MainPage';
import {theme} from './CustomizationAndCSS/Theme';
import { ThemeProvider } from '@emotion/react';
import {BrowserRouter} from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
          <MainPageContainer/>
      </ThemeProvider>
    </div>
  );
}

export default App;
