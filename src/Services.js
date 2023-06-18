import { useState,createContext} from "react";
import {services} from "./constants/Servicios"
import './styles/services-items.css';
import FormOrder from './FormOrder' ;
const getFormattedPrice = (costo) => `$${costo.toFixed(2)}`;

export const FormContextServices = createContext();
export default function Services() {
    const [checkedInputState, setCheckedInputState] = useState(
      (new Array(services.length).fill(false))
    );
    const [isFormVisibleServ, setFormVisibleServ] = useState(true);

  const [total, setTotal] = useState(0);
  // const findCostService = (position, seervices)=>{
  //   const posId= parseInt(position) + 1;
  //   console.log("aquiiiiiiiii ");
  //   console.log(seervices[posId].costo);
  //   return (seervices[{ posId}].costo);
  // }
  const validateServicesChosen=(estadoServicios)=>{
      let chosen= false;
      const contServices = estadoServicios.reduce((count, servicio) => {
        if (servicio === false) {
          return count + 1;
        }
        return count;
      }, 0);
      if(contServices===estadoServicios.length){
        chosen=true;
      }
      return chosen;
  }
  const handleSubmit = (e)=>{
    console.log(!validateServicesChosen(checkedInputState));
		if (checkedInputState && !validateServicesChosen(checkedInputState)) {
			setFormVisibleServ(false);
		  } else {
			alert('Por favor, debe seleccionar al menos un servicio');
		  }
	}
  const handleOnChange = (position) => {
   // console.log("Esta es la position"+ position);
   // console.log("Diste un clic "+checkedInputState);
     // const updatedCheckedInputState = checkedInputState.map((itemState, index) => index === position ? !itemState : itemState);
      const updatedCheckedInputState = checkedInputState;      
      updatedCheckedInputState[position]= !checkedInputState[position];
      setCheckedInputState(updatedCheckedInputState);
    //  console.log("Se ha actualizado clic "+checkedInputState);
      const totalPrice = checkedInputState.reduce((total, numero, index, array) => {
           let suma =0;
          if(numero===true){
            suma = services[index].costo
          }else{
            suma=0
          }
          return total + suma;
        }, 0);
      setTotal(totalPrice);
  };
  const servicesChosen={
    info: checkedInputState
  }
  return (
    <FormContextServices.Provider value={{servicesChosen}}>
    {isFormVisibleServ && (
    <>
    <div className="box-services">
        <h2>Nuestros servicios</h2>
        <p>Seleccione las servicios que desea: </p>
      
    </div>      
    <div className="App">
      <ul className="services-lista">
          <li>
              <div className="services-lista-items">
                <div className="group-check-items text-desc-items">
                   <strong><span>Descripción</span></strong>
                </div>
                <strong>Precio</strong>
              </div>
          </li>
        {services.map(({ id, tipo, costo,tiempo}, index) => {
          return (
            <li key={index}>
              <div className="services-lista-items">
                <div className="group-check-items">
                  <input
                    type="checkbox"
                    className="check-items"
                    id={`custom-checkbox-${index}`}
                    name={tipo}
                    value={index}
                    checked={checkedInputState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label className="label-items" htmlFor={`custom-checkbox-${index}`}>{tipo} ({tiempo}h)</label>
                </div>
                <div>{getFormattedPrice(costo)}</div>
              </div>
            </li>
          );
        })}
        <li>
          <div className="services-lista-item-total">
            <div className="section-total">Total a pagar:</div>
            <span className="section-total-value">{getFormattedPrice(total)}</span>
          </div>
        </li>
      </ul>
    </div>
    <button className="btn"  onClick={handleSubmit}>Generar orden</button>
    </>
    )}
    {!isFormVisibleServ && <FormOrder/>}
    </FormContextServices.Provider>
  );
}
