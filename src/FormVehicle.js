import React, {	useEffect,	useState, useContext, createContext} from 'react';
import './styles/form.css';
import {colores} from "./constants/ColoresInfo"
import { FormContextClient } from './FormClient';
import Services from './Services';
//Proporcionar la información del vehículo, como la marca, modelo, placa, nivel del tanque de gasolina,
// y un campo de texto donde 
// se podrán detallar abolladuras, rayones o cualquier dato relevante sobre el estado exterior del vehículo.
function useMarcas() {
	const [marcas, setMarcas] = useState([])
	useEffect(() => {
		fetch("data/json/marcas.json")
			.then(response => response.json())
			.then(datos => {
				setMarcas(datos)
			})
	}, []);
	return marcas;
}
function useCombustible() {
	const [infoCombustible, setInfoCombustible] = useState([])
	useEffect(() => {
		fetch("data/json/infoCombustible.json")
			.then(response => response.json())
			.then(datos => {
				setInfoCombustible(datos)
			})
	}, []);
	return infoCombustible;
}
export const FormContextVehicle = createContext();

export default function FormVehicle() {
	const { formState } = useContext(FormContextClient);

	const [inputPlaca, cambiarInputPlaca] = useState('');
	const [inputMarca, cambiarInputMarca] = useState('');
	const [inputModelo, cambiarInputModelo] = useState('');
	const [opColor, cambiarOpColor] = useState(-1);
	const [opCombustible, cambiarOpCombustible] = useState(-1);
	const [opNivTanque, cambiarOpNivTanque] = useState(-1);
	const [textAreaInfoEstado, cambiartextAreaInfoEstado] = useState('');
	const [isFormVisibleVeh, setFormVisibleVeh] = useState(true);
	const marcas = useMarcas();
	const combustible = useCombustible();

	const handleInputPlaca = (e) => {
		cambiarInputPlaca(e.target.value);
	}
	const handleInputMarca = (e) => {
		cambiarInputMarca(e.target.value);
	}
	const handleInputModelo = (e) => {
		cambiarInputModelo(e.target.value);
	}
	const handleTextAreaInfoEstado = (e) => {
		cambiartextAreaInfoEstado(e.target.value);
	}
	const handleOpNivTanque = (e) => {
		cambiarOpNivTanque(e.target.value);
	}
	const handleOpCombustible = (e) => {
		cambiarOpCombustible(e.target.value);
	}
	const handleCargarOpNivTanque = (e) => {
		//const opcion = e.target.value;
		cambiarOpNivTanque(-1);
	}
	const handleCargarOpColor = (e) => {
		cambiarOpColor(e.target.value);
	}
	const infoVehicle = {
		inputPlaca,
		inputMarca, inputModelo, opColor, opCombustible, opNivTanque, 
		textAreaInfoEstado
	}
	const handleSubmit = (e)=>{
		if (inputPlaca && inputMarca && inputModelo  && (opCombustible && opCombustible !==-1)&& ( opNivTanque && opNivTanque!==-1 )&& textAreaInfoEstado && (opColor&&opColor!==-1)) {
			setFormVisibleVeh(false);
			//console.log('Resumen VEHICULO:', infoVehicle);
		  } else {
			alert('Por favor, debe completar todos los campos del formulario');
		  }
	}
	
	return ( <>
	        <FormContextVehicle.Provider value={{ infoVehicle }}>
			{isFormVisibleVeh && (
			<div className="formulario" >
			<div className = "titleForm"><h1>Información del Vehículo </h1></div>
			    <div className="info-client">
					<p className="veh-client"><span className="veh-label">Cliente: </span> {formState.nombre}</p>
					<p className="veh-correo"><span className="veh-label">Correo: </span>  {formState.correo}</p>
				</div>				
				<div>
					<label htmlFor = "placa">Placa</label> 
					<input type = "text"
					name = "placa"
					placeholder = "Ingrese la placa"
					id = "placa"
					value = {inputPlaca} onChange = {handleInputPlaca}
					/> 
				</div>
				<div>
					<label htmlFor = "color">Color</label> 					
					<select name = "color" value = {opColor}	onChange = {handleCargarOpColor}>
					<option value = "-1" > Seleccione una opción </option> {
					colores.map(color =>
							<option key={color.id}> {color.info} </option>
					)} 
					</select> 
				</div> 	
				<div>
					<label htmlFor = "marca">Marca</label> 					
					<select name = "marca" value = {inputMarca}	onChange = {handleInputMarca}>
					<option value = "" > Seleccione una opción </option> {
					marcas.map(marca =>
							<option key={marca.id} value = {marca.id}> {marca.info} </option>
					)} 
					</select> 
				</div> 			
				<div>
					<label htmlFor = "modelo"> Modelo </label> 
					<input type = "text"
						name = "modelo"
						placeholder = "Ingrese el modelo"
						id = "modelo"
						value = {inputModelo}
						onChange = {handleInputModelo}
						/>
				</div> 
				<div>
					<label htmlFor = "combustible"> Combustible </label> 
					<select name = "combustible" value = {opCombustible}  onChange = {handleOpCombustible} onClick={handleCargarOpNivTanque}>
					<option value = "-1" > Seleccione una opción </option> {
					combustible.map(combustible =>
							<option key={"combustible"+combustible.id} value= {combustible.id}> {combustible.tipo} </option>
					)} 
					</select> 
				</div> 
				<div>
					<label htmlFor = "nivelTanque"> Nivel de Tanque </label> 					
					<select name = "nivelTanque" value = {opNivTanque} onChange = {handleOpNivTanque}>
					<option value = "-1" > Seleccione una opción </option> 
					{
						opCombustible>0 &&
						(
							combustible[(opCombustible-1)].niveles.map((nivel,i)=>(
								<option key={"nivel"+i} value={i}> {nivel} </option>
							))
						)
					}
					</select> 
				</div> 
				<div >
					<label htmlFor = "estado">Estado</label> 
					<textarea type = "text"
						name = "estado"
						placeholder = "Describa detalles sobre el estado de su vehículo"
						id = "estado"
						value = {textAreaInfoEstado}
						onChange = {handleTextAreaInfoEstado}
						/> 
				</div > 			
				
				<button className="btn"  onClick={handleSubmit}>Seleccionar servicios</button>
				</div> )}
				{!isFormVisibleVeh && <Services/>}
				</FormContextVehicle.Provider>
				</>
);
}