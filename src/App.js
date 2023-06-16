import React, {useState}  from 'react';
import './styles/index.css';
import './styles/form.css';
import FormClient from './FormClient' ;
import FormVehicle from './FormVehicle' ;
import NavBar from './NavBar';
import Boton from './Button'

export function App(){
    const [showFormularioClient, setShowFormularioClient] = useState(true);
	  const [showFormularioVehicle, setShowVehicle] = useState(false);
    const handleClickForm = () => {
        setShowFormularioClient(!showFormularioClient);
        setShowVehicle(true);
    }
    const handleClickForm2 = () => {
        setShowVehicle(true);
        setShowFormularioClient(false)
    }

return (<>
    <NavBar/>
    <div className="contenedor">

      {showFormularioClient && (
        <div className="cont-form"><FormClient/><Boton text="Continuar" onClickForm={handleClickForm} /></div>
      )}
      {showFormularioVehicle && (
        <div className="cont-form"><FormVehicle/><Boton text="Continuar" onClickForm={handleClickForm2} /></div>
      )}
    </div>
    </>
  );
  
    
}