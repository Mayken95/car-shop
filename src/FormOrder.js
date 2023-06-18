import React, { useContext, useEffect, useState} from 'react';
import { FormContextClient } from './FormClient';
import { FormContextVehicle } from './FormVehicle';
import  {FormContextServices} from './Services';
import {services} from "./constants/Servicios"
import './styles/order.css';

export default function FormOrder() {
    

    
    const [dataMarcas, setDataMarcas] = useState(null);
    const [dataCombustible, setDataCombustible] = useState(null);
    const  {formState} = useContext(FormContextClient);
    const  {infoVehicle} = useContext( FormContextVehicle);
    const  {servicesChosen} = useContext( FormContextServices);
    const services= servicesChosen.info;
    

    const validateTypeInfoId = (tipoId)=>{
        switch (tipoId) {
            case "dni":
                return "Cédula";
                break;
            case "passport":
                return "Pasaporte";
            break;
            case "ruc":
                return "RUC";
            break;
            default:
                return tipoId;
                break;
        }
    }
    // function useMarcas() {
    //     useEffect(() => {
    //         marcasList();
    //     }, []);
    // }
    // function useCombustible() {
    //     useEffect(() => {
    //         fuelList();
    //     }, []);
    // }
    useEffect(() => {
        marcasList();
        fuelList();
    }, []);

   // useMarcas();
    //useCombustible();
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
    const marcaInfo = validateMarcas(parseInt(infoVehicle.inputMarca), dataMarcas);
    const combustible = validateCombustible(parseInt(infoVehicle.opCombustible), dataCombustible);
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
    const nivelFuel = nivInfoCombustible(parseInt(infoVehicle.opCombustible),parseInt(infoVehicle.opNivTanque),  dataCombustible);
    console.log(combustible);
	return (<>
              <div className="cont-title">
                        MAXIMCAR SHOP Orden
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

              <div className="cont-servicios">
                    <h2>Listado de Servicios Escogidos</h2>
                 
              </div>
            
		    </>
	);
}

