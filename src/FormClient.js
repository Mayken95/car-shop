import React, {useState} from 'react';

function FormClient () {
	const [inputNombre, cambiarInputNombre] = useState('');
	const [inputCorreo, cambiarInputCorreo] = useState('');
	const [inputContacto, cambiarInputContacto] = useState('');
	const [inputInfoId, cambiarInputInfoId] = useState('');
	const [optionTypeId, cambiarOptionTypeId] = useState('dni');
	
	// Funcion que se encargara de validar los datos y enviar el formulario
	const handleSubmit = (e) => {
		e.preventDefault();

		// Comprobamos validacion del formulario ...
		// Si todo es correcto enviamos el formulario

		console.log('Formulario Enviado!');
	}

	// Funcion que se encarga de cambiar el estado del inputNombre
	const handleInputNombre = (e) => {
		cambiarInputNombre(e.target.value);
	}
	
	// Funcion que se encarga de cambiar el estado del inputCorreo
	const handleInputCorreo = (e) => {
		cambiarInputCorreo(e.target.value);
	}

	const handleInputContacto = (e) => {
		cambiarInputContacto(e.target.value);
	}

	const handleInputInfoId = (e) => {
		cambiarInputInfoId(e.target.value);
	}
	const handleOptionTypeId = (e) => {
		cambiarOptionTypeId(e.target.value);
	}
	return (
		<>
			<form action="" onSubmit={handleSubmit}>
				<div className="titleForm"><h1>Información del Cliente</h1></div>
				<div className="elemForm">
					<label htmlFor="nombre">Nombre del Cliente</label>
					<input
						type="text"
						name="nombre"
						placeholder="Nombre"
						id="nombre"
						value={inputNombre}
						onChange={handleInputNombre}
					/>
				</div>

				<div className="elemForm">
					<label htmlFor="correo">Correo</label>
					<input
						type="email"
						name="correo"
						placeholder="Correo"
						id="correo"
						value={inputCorreo}
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
						value={inputContacto}
						onChange={handleInputContacto}
					/>
				</div>
				<div className="elemForm">
					<label htmlFor="typeId">Tipo de Identificación</label>
					<select name="typeId" value={optionTypeId} onChange={ handleOptionTypeId}>
						<option value="dni">Cédula</option>
						<option value="passport">Pasaporte</option>
						<option value="ruc">RUC</option>
					</select>
					<p>Opcion prueba: {optionTypeId}</p>
				</div>
				<div className="elemForm">
					<label htmlFor="infoId">Identificación Fiscal</label>
					<input
						type="text"
						name="infoId"
						placeholder="Número de identificación"
						id="infoId"
						value={inputInfoId}
						onChange={handleInputInfoId}
					/>
				</div>
			
			</form>
		</>
	);
}
 
export default FormClient;