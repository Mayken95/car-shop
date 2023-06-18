import React, {useState} from 'react';
import './styles/index.css';
import './styles/form.css';
import FormClient from './FormClient' ;
import NavBar from './NavBar';
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
export function App(){
  const [darkMode, setDarkMode] = useState(false);
  const themeDark = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
return (<>

    <NavBar name="MAXIMCAR SHOP" check={darkMode} change={()=>setDarkMode(!darkMode)}/>
    <ThemeProvider theme={themeDark}>
    <CssBaseline />
        <div className="contenedor">
              <div className="cont-form">
              <FormClient/>
              </div>
        </div>
    </ThemeProvider>
    </>
  );
  
    
}