 const formReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_NOMBRE':
        return { ...state, nombre: action.payload };
      case 'UPDATE_CORREO':
        return { ...state, correo: action.payload };
      case 'UPDATE_CONTACTO':
        return { ...state, contacto: action.payload };
      case 'UPDATE_TYPEID':
        return { ...state, typeId: action.payload };
      case 'UPDATE_INFOID':
        return { ...state, infoId: action.payload };
      case 'RESET_FORM_TOV':
        return {
            nombre: '',
            correo: '',
            contacto: '',
            infoId: '',
            typeId: 'dni',
            isVisible: false
          }
       case 'HIDE_FORM':
        return { ...state, isVisible: false };
        case 'GET_INFO_CLIENT':
        return state;
      case 'SET_FORM_VALUES':
        return { ...state, formValores: action.payload };
      case 'TURN_FORM':
        return { ...state, isVisible: !state.isVisible };
      default:
        return state;
    }
  };


  export default formReducer;