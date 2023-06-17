import React, {useState, useReducer} from 'react';
import FormContext from './context/FormContext';
import formReducer from './context/FormReducer';
import './styles/form.css';
import './styles/button.css';
const FormContextClient = FormContext;
function FormClient ({ onContinuar }) {
	const [formData, setFormData] = useState({
		nombre: "",
		correo: "",
		contacto: "",
		infoId: "",
		typeId: "dni"
	  });
	
	const { nombre, correo, contacto, infoId, typeId } = formData;
	const [formState, dispatch] = useReducer(formReducer, formData);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}
	// Funcion que se encargara de validar los datos y enviar el formulario
	const handleSubmit = (e) => {
		e.preventDefault();
		if (nombre && correo && contacto && infoId && typeId) {
			dispatch({ type: 'SET_FORM_VALUES', payload: formState }); 
			dispatch({ type: 'RESET_FORM' }); // Reiniciar el formulario
		  console.log("formulario enviado");
		} else {
			alert("Faltan completar campos")
		  	console.log("PAra continuar deberá completar todos los campos");
		}
	};

	return (
		<>
			<FormContextClient.Provider  value={{ formState, dispatch}}>
				<div className="formulario">
				<div className="titleForm"><h1>Información del Cliente</h1></div>
				<div className="elemForm">
					<label htmlFor="nombre">Nombre del Cliente</label>
					<input
						type="text"
						name="nombre"
						placeholder="Nombre"
						id="nombre"
						value={nombre}
						onChange={handleChange}
					/>
				</div>

				<div className="elemForm">
					<label htmlFor="correo">Correo</label>
					<input
						type="email"
						name="correo"
						placeholder="Correo"
						id="correo"
						value={correo}
						onChange={handleChange}
					/>
				</div>

				<div className="elemForm">
					<label htmlFor="contacto">Número de Contacto</label>
					<input
						type="text"
						name="contacto"
						placeholder="Número de contacto"
						id="contacto"
						value={contacto}
						onChange={handleChange}
					/>
				</div>
				<div className="elemForm">
					<label htmlFor="typeId">Tipo de Identificación</label>
					<select name="typeId" key={typeId} value={typeId} onChange={ handleChange}>
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
						value={infoId}
						onChange={handleChange}
					/>
				</div>
				<button className="btn"  onClick={handleSubmit}>Continuar</button>
				</div>
			</FormContextClient.Provider>
		</>
	);
}

export default FormClient;