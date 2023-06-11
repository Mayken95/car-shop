import React, {useState}  from 'react';
import './index.css';
import FormClient from './FormClient' ;
import FormVehicle from './FormVehicle' ;
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

return (
    <div className="formulario">
      {showFormularioClient && (
        <><FormClient /><Boton text="Continuar" onClickForm={handleClickForm} /></>
      )}
      {showFormularioVehicle && (
        <><FormVehicle /><Boton text="Continuar" onClickForm={handleClickForm2} /></>
      )}
    </div>
  );
  
    
}