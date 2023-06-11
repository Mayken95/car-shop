import React, {	useEffect,	useState} from 'react';
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

export default function FormVehicle() {
	const [inputPlaca, cambiarInputPlaca] = useState('');
	const [inputMarca, cambiarInputMarca] = useState('');
	const [inputModelo, cambiarInputModelo] = useState('');
	const [opCombustible, cambiarOpCombustible] = useState(0);
	const [opNivTanque, cambiarOpNivTanque] = useState('');
	const [textAreaInfoEstado, cambiartextAreaInfoEstado] = useState('');
	const marcas = useMarcas();
	const combustible = useCombustible();
	console.log(combustible);
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
	const handleOpCombustible = (e) => {
		cambiarOpCombustible(e.target.value);
	}
	const handleCargarOpNivTanque = (e) => {
		const opcion = e.target.value;
		cambiarOpNivTanque(opcion);
	}
	return ( <>
			<form action = "">
			<div className = "titleForm"><h1>Información del Vehículo </h1></div>
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
					<label htmlFor = "marca">Marca</label> 					
					<select name = "marca" value = {inputMarca}	onChange = {handleInputMarca}>
					<option value = "" > Seleccione una opción </option> {
					marcas.map(marca =>
							<option value = {marca.id}> {marca.info} </option>
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
					<select name = "combustible" value = {opCombustible}  onChange = {handleOpCombustible}onClick={handleCargarOpNivTanque}>
					<option value = "0" > Seleccione una opción </option> {
					combustible.map(combustible =>
							<option key={"combustible"+combustible.id} value= {combustible.id}> {combustible.tipo} </option>
					)} 
					</select> 
				</div> 
				<div>
					<label htmlFor = "nivelTanque"> Nivel de Tanque </label> 					
					<select name = "nivelTanque" value = {opNivTanque} onChange = {handleOpCombustible}>
					<option value = "0" > Seleccione una opción </option> 
					{
						opNivTanque>0 &&
						(
							combustible[(opNivTanque-1)].niveles.map((nivel,i)=>(
								<option key={"nivel"+i} value=""> {nivel} </option>
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
				</form> 
				</>
);
}