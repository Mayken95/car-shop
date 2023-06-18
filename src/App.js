import React  from 'react';
import './styles/index.css';
import './styles/form.css';
import FormClient from './FormClient' ;
import NavBar from './NavBar';

export function App(){

return (<>
    <NavBar name="MAXIMCAR SHOP"/>
    <div className="contenedor">
          <div className="cont-form">
           <FormClient/>
          </div>
      {/* {mensaje && <p>{mensaje}</p>} */}
    </div>
    </>
  );
  
    
}