 const formReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_NAME':
        return { ...state, nombre: action.payload };
      case 'UPDATE_CORREO':
        return { ...state, correo: action.payload };
      case 'UPDATE_CONTACTO':
        return { ...state, contacto: action.payload };
      case 'UPDATE_DNI':
        return { ...state, typeId: action.payload };
      case 'UPDATE_INFODNI':
        return { ...state, infoId: action.payload };
      case 'RESET_FORM':
        return { name: '', age: '' };
      case 'SET_FORM_VALUES':
        return { ...state, formValores: action.payload };
      default:
        return state;
    }
  };

  export default formReducer;