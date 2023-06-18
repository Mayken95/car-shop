import React, { useContext} from 'react';
import { FormContextClient } from './FormClient';
import { FormContextVehicle } from './FormVehicle';

export default function FormOrder() {
    const {formState} = useContext(FormContextClient);
    const  {infoVehicle} = useContext( FormContextVehicle);
    console.log("Esto es infoVehicleeee"+formState.nombre);
    console.log("Esto es iormStateCl" + infoVehicle.inputPlaca);
	return (<>
              <h2>{formState.nombre}</h2>
		</>
	);
}

