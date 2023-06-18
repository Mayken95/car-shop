import { useState} from "react";
import {services} from "./Servi"
import './styles/services-items.css';
const getFormattedPrice = (costo) => `$${costo.toFixed(2)}`;

export default function Services() {
    const [checkedInputState, setCheckedInputState] = useState(
      new Array(services.length).fill(false)
    );
    
  const [total, setTotal] = useState(0);
  // const findCostService = (position, seervices)=>{
  //   const posId= parseInt(position) + 1;
  //   console.log("aquiiiiiiiii ");
  //   console.log(seervices[posId].costo);
  //   return (seervices[{ posId}].costo);
  // }
  const handleOnChange = (position) => {
    
      const updatedCheckedInputState = checkedInputState.map((itemState, index) => index === position ? !itemState : itemState);
      console.log(checkedInputState);
      setCheckedInputState(updatedCheckedInputState);
      
      const totalPrice =updatedCheckedInputState.reduce(
        (suma, currentElemen, index) => {
          console.log(currentElemen);
          if (currentElemen === true) {
            return (suma + services[position].costo);
          }
          return suma;
        }, 
        0);
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
        {services.map(({ tipo, costo}, index) => {
          return (
            <li key={index}>
              <div className="services-lista-items">
                <div className="group-check-items">
                  <input
                    type="checkbox"
                    className="check-items"
                    id={`custom-checkbox-${index}`}
                    name={tipo}
                    value={checkedInputState[index]}
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
