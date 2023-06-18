import React, { createContext,useReducer} from 'react';

import formReducer from './context/FormReducer';
import FormVehicle from './FormVehicle' ;
import './styles/form.css';
import './styles/button.css';

export const FormContextClient = createContext();

function FormClient () {

	const formInitialState= {
		nombre: "",
		correo: "",
		contacto: "",
		infoId: "",
		typeId: "dni",
		isVisible: true
	  }
	
	const [formState, dispatch] = useReducer(formReducer, formInitialState);

	// Funcion que se encarga de cambiar el estado del inputNombre
	const handleInputNombre = (e) => {
		dispatch({ type: 'UPDATE_NOMBRE', payload: e.target.value })
	}
	// Funcion que se encarga de cambiar el estado del inputCorreo
	const handleInputCorreo = (e) => {
		dispatch({ type: 'UPDATE_CORREO', payload: e.target.value })
	}

	const handleInputContacto = (e) => {
		dispatch({ type: 'UPDATE_CONTACTO', payload: e.target.value })
	}

	const handleInputInfoId = (e) => {
		dispatch({ type: 'UPDATE_TYPEID', payload: e.target.value })
	}
	const handleOptionTypeId = (e) => {
		dispatch({ type: 'UPDATE_INFOID', payload: e.target.value })
	}
	// Funcion que se encargara de validar los datos y enviar el formulario
	const handleSubmit = (e) => {
		e.preventDefault();
		if (formState.nombre && formState.correo && formState.contacto && formState.infoId && formState.typeId) {
			//dispatch({ type: 'SET_FORM_VALUES', payload: formState }); 
			dispatch({ type: 'HIDE_FORM' }); 
			dispatch({ type: 'GET_INFO_CLIENT' }); // Reiniciar el formulario
			//console.log('Resumen:', formState);
		  //console.log("formulario enviado");
		} else {
			alert("Faltan completar campos")
		  //	console.log("PAra continuar deberá completar todos los campos");
		}
	}
	
	return (
			<FormContextClient.Provider value={{ formState }}>
			{formState.isVisible && (
				<div className="formulario">
				<div className="titleForm"><h1>Información del Cliente</h1></div>
				<div className="elemForm">
					<label htmlFor="nombre">Nombre del Cliente</label>
					<input
						type="text"
						name="nombre"
						placeholder="Nombre"
						id="nombre"
						value={formState.nombre}
						onChange={ handleInputNombre}
					/>
				</div>

				<div className="elemForm">
					<label htmlFor="correo">Correo</label>
					<input
						type="email"
						name="correo"
						placeholder="Correo"
						id="correo"
						value={formState.correo}
						onChange={handleInputCorreo}
					/>
				</div>

				<div className="elemForm">
					<label htmlFor="contacto">Número de Contacto</label>
					<input
						type="text"
						name="contacto"
						placeholder="Número de contacto"
						id="contacto"
						value={formState.contacto}
						onChange={handleInputContacto}
					/>
				</div>
				<div className="elemForm">
					<label htmlFor="typeId">Tipo de Identificación</label>
					<select name="typeId" key={formState.typeId} value={formState.typeId} onChange={ handleInputInfoId}>
						<option value="dni">Cédula</option>
						<option value="passport">Pasaporte</option>
						<option value="ruc">RUC</option>
					</select>
					{/* <p>Opcion prueba: {typeId}</p>  */}
				</div>
				<div className="elemForm">
					<label htmlFor="infoId">Identificación Fiscal</label>
					<input
						type="text"
						name="infoId"
						placeholder="Número de identificación"
						id="infoId"
						value={formState.infoId}
						onChange={handleOptionTypeId}
					/>
				</div>
				
				<button className="btn"  onClick={handleSubmit}>Continuar</button>
				</div>
			 	)}{!formState.isVisible && <FormVehicle />}
			</FormContextClient.Provider>
		
	);
}

export default FormClient;
