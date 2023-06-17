import React, {useState}  from 'react';
import './styles/index.css';
import './styles/form.css';
import Services from './Services' 
import FormClient from './FormClient' ;
import FormVehicle from './FormVehicle' ;
import NavBar from './NavBar';
import Boton from './Button'

export function App(){
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [nombre, setNombre] = useState('');
  //const [correo, setCorreo] = useState('');
  // const { formState } = useContext(FormContextClient );
  // const showFormVeh = ( formState ) => {
  //   setNombre( formState.nombre);
  //   setMostrarMensaje(true);
  // };

  // if(formState.nombre){
  //   setNombre( formState.nombre);
  //   setMostrarMensaje(true);
  // }


    // const handleClickForm = (e) => {
    //     e.preventDefault();
        
    //     setShowFormularioClient(!showFormularioClient);
    //     setShowVehicle(true);
    // }
    // const handleClickForm2 = () => {
    //     setShowVehicle(true);
    //     setShowFormularioClient(false)
    // }

return (<>
    <NavBar name="MAXIMCAR SHOP"/>
    <div className="contenedor">
      {!mostrarMensaje ? (
          <div className="cont-form">
           <FormClient/>
          </div>
        ) : (
          <div className="cont-form">
            <FormVehicle />
             </div>
        )}

      {/* {mensaje && <p>{mensaje}</p>} */}
    </div>
    </>
  );
  
    
}