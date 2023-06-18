import { useState} from "react";
import {services} from "./Servi"
import './styles/services-items.css';
const getFormattedPrice = (costo) => `$${costo.toFixed(2)}`;

export default function Services() {
    const [checkedInputState, setCheckedInputState] = useState(
      (new Array(services.length).fill(false))
    );
    
  const [total, setTotal] = useState(0);
  // const findCostService = (position, seervices)=>{
  //   const posId= parseInt(position) + 1;
  //   console.log("aquiiiiiiiii ");
  //   console.log(seervices[posId].costo);
  //   return (seervices[{ posId}].costo);
  // }
  const handleOnChange = (position) => {
    console.log("Esta es la position"+ position);
    console.log("Diste un clic "+checkedInputState);
     // const updatedCheckedInputState = checkedInputState.map((itemState, index) => index === position ? !itemState : itemState);
      const updatedCheckedInputState = checkedInputState;      
      updatedCheckedInputState[position]= !checkedInputState[position];
      setCheckedInputState(updatedCheckedInputState);
      console.log("Se ha actualizado clic "+checkedInputState);
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

  return (
    <div className="App">
      <ul className="services-lista">
          <li>
              <div className="services-lista-items">
                <div className="group-check-items">
                   <label className="label-items">Descripción</label>
                </div>
                <div className="right-section">Precio</div>
              </div>
          </li>
        {services.map(({ id, tipo, costo}, index) => {
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
                  <label className="label-items" htmlFor={`custom-checkbox-${index}`}>{tipo}</label>
                </div>
                <div className="right-section">{getFormattedPrice(costo)}</div>
              </div>
            </li>
          );
        })}
        <li>
          <div className="services-lista-item">
            <div className="left-section">Total:</div>
            <div className="right-section">{getFormattedPrice(total)}</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
