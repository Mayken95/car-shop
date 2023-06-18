import React, { useContext, useEffect, useState} from 'react';
import { FormContextClient } from './FormClient';
import { FormContextVehicle } from './FormVehicle';
import  {FormContextServices} from './Services';
import {services} from "./constants/Servicios";
import FormOrderSuccess from './FormOrderSuccess' ;
import './styles/order.css';
import './styles/services-items.css';
export default function FormOrder() {
    

    
    const [dataMarcas, setDataMarcas] = useState(null);
    const [dataCombustible, setDataCombustible] = useState(null);    
    const  {formState} = useContext(FormContextClient);
    const  {infoVehicle} = useContext( FormContextVehicle);
    const  {servicesChosen} = useContext( FormContextServices);
    const  servicesArray= servicesChosen.info;
    const [visibleFormOrder, setvisibleFormOrder] = useState(true);
    const validateTypeInfoId = (tipoId)=>{
        switch (tipoId) {
            case "dni":
                return "Cédula";
            case "passport":
                return "Pasaporte";
            case "ruc":
                return "RUC";
            default:
                return tipoId;
        }
    }
    
    useEffect(() => {
        marcasList();
        fuelList();
    }, []);

    const marcasList = async () => {
        try {
        const response = await fetch("data/json/marcas.json");
        const lista = await response.json();
        setDataMarcas(lista);
        } catch (error) {
        console.error('Error al obtener la lista:', error);
        }
    };
    const fuelList = async () => {
        try {
        const response = await fetch("data/json/infoCombustible.json");
        const lista = await response.json();
        setDataCombustible(lista);
        } catch (error) {
        console.error('Error al obtener la lista:', error);
        }
    };
    const validateMarcas = (idMarca, listaMarcas) => {
        const listMarcas =  listaMarcas;
        if (listMarcas) {
          const marcaExists = listMarcas.find((marca) => marca.id === idMarca);
          if (marcaExists) {
            return marcaExists.info;
          }
        }
        return null;
      };
      const validateCombustible = (idCombustible, listaCombustible) => {
        const listFuel =  listaCombustible;
        if (listFuel) {
          const fuelExists = listaCombustible.find((fuel) => fuel.id === idCombustible);
          if (fuelExists) {
            return fuelExists.tipo;
          }
        }
        return null;
      };
   
    const nivInfoCombustible = (idCombustible,idNivel,  listaCombustible)=>{
        const listFuel =  listaCombustible;
        if (listFuel) {
          const fuelExists = listaCombustible.find((fuel) => fuel.id === idCombustible);
          if (fuelExists) {
            const fuelNivel = fuelExists.niveles.find((value,index) => index === idNivel);
            if(fuelNivel){
                return  fuelNivel;
            }
          }
        }
        return null;
    }
    const getFormattedPrice = (costo) => `$${costo.toFixed(2)}`;
    const marcaInfo = validateMarcas(parseInt(infoVehicle.inputMarca), dataMarcas);
    const combustible = validateCombustible(parseInt(infoVehicle.opCombustible), dataCombustible);
    const nivelFuel = nivInfoCombustible(parseInt(infoVehicle.opCombustible),parseInt(infoVehicle.opNivTanque),  dataCombustible);
    const totalaPagar = servicesArray.reduce((total, numero, index, array) => {
        let suma =0;
       if(numero===true){
         suma = services[index].costo
       }else{
         suma=0
       }
       return total + suma;
     }, 0);
     const totalEnHoras = servicesArray.reduce((total, servicio, index, array) => {
        let suma =0;
       if( servicio===true){
         suma = services[index].tiempo
       }else{
         suma=0
       }
       return total + suma;
     }, 0);
    const sumarHoras = (horas) => {
        const fechaActual = new Date();
        const fechaEstimada = new Date(fechaActual.getTime() + (horas * 3600000)); // para convertir 3600000 milisegundos en una hora
        return fechaEstimada;
    };

    const fechaEstimada = sumarHoras(totalEnHoras);
    const handleSubmit = (e)=>{
      const pago = totalaPagar;
      const fechaEntrega= fechaEstimada.toLocaleString();

     alert(`Al dar clic, YO , ${formState.nombre} con Identificación ${formState.infoId} me comprometo a pagar la cantidad de: ${getFormattedPrice(pago)}, aceptando la fecha estimada de entrega ${fechaEntrega}`);
     setvisibleFormOrder(false);
	}

	return (<>{visibleFormOrder && (
                <div>
              <div className="cont-title">
                        MAXIMCAR SHOP Orden
              </div>
              <div>
                Revisado por: Mayken Salavarría Tutivén
              </div>
              <div className="cont-client">                                
                    <h2>Información del Cliente</h2>
                    <p className="infoOrder"><span className="label-order">Nombre:</span><span className="cont-order">{formState.nombre}</span></p>
                    <p className="infoOrder"><span className="label-order">Correo:</span><span className="cont-order">{formState.correo}</span></p>
                    <p className="infoOrder"><span className="label-order">Contacto:</span><span className="cont-order">{formState.contacto}</span></p>
                    <p className="infoOrder"><span className="label-order">Tipo de Identificación:</span><span className="cont-order">{validateTypeInfoId(formState.typeId)}</span></p>
                    <p className="infoOrder"><span className="label-order">Identificación Fiscal:</span><span className="cont-order">{formState.infoId}</span></p>
              </div>
              <div className="cont-vehicle">
                    <h2>Información del Vehículo</h2>
                    <p className="infoOrder"><span className="label-order">Placa:</span><span className="cont-order">{infoVehicle.inputPlaca}</span></p>
                    <p className="infoOrder"><span className="label-order">Color:</span><span className="cont-order">{infoVehicle.opColor}</span></p>
                    <p className="infoOrder"><span className="label-order">Marca:</span><span className="cont-order">{marcaInfo}</span></p> 
                    <p className="infoOrder"><span className="label-order">Modelo:</span><span className="cont-order">{infoVehicle.inputModelo}</span></p>
                    <p className="infoOrder"><span className="label-order">Combustible:</span><span className="cont-order">{combustible}</span></p>
                    <p className="infoOrder"><span className="label-order">Nivel de Tanque:</span><span className="cont-order">{nivelFuel}</span></p>
                    <p className="infoOrder"><span className="label-order">Estado:</span><span className="cont-order">{infoVehicle.textAreaInfoEstado}</span></p>
              </div>
              <div className="cont-services">
                    <h2>Listado de Servicios Escogidos</h2>
                   
                    <ul className="services-lista">
                        <li>
                            <div className="services-lista-items">
                                <div className="group-check-items text-desc-items">
                                <strong><span>Descripción</span></strong>
                                </div>
                                <strong>Precio</strong>
                            </div>
                        </li>
                        {services.map((service, index) => (
                            servicesArray[index]&&(
                            <li key={index}>
                            <div className="services-lista-items">
                                <div className="group-check-items items-lighter">
                                <input
                                        type="checkbox"
                                        className="check-items"
                                        id={`custom-checkbox-${index}`}
                                        name={service.tipo}
                                        value={index}
                                        checked={true} readOnly
                                    />
                                 <label className="label-items">{service.tipo} ({service.tiempo}h)</label>
                                </div>
                                <div>{getFormattedPrice(service.costo)}</div>
                            </div>
                            </li>                       
                       )))}
                        <li>
                        <div className="services-lista-item-total">
                            <div className="section-total">Total a pagar:</div>
                            <span className="section-total-value">{getFormattedPrice(totalaPagar)}</span>
                        </div>
                        </li>
                    </ul>
              </div>
              <div className="cont-dates">
                    <p>Fecha de orden generada: {new Date().toLocaleString()}</p>
                    <p>Fecha estimada de entrega: {fechaEstimada.toLocaleString()}</p>
                    <p>Total a pagar: {getFormattedPrice(totalaPagar)}</p>
              </div>
              <button className="btn"  onClick={handleSubmit}>Aceptar términos</button>
              </div>
              
            )}
            {!visibleFormOrder && <FormOrderSuccess/>}
            </>
	);
}

