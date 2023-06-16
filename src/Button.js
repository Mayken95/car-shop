import './styles/button.css';
function Boton({text, onClickForm}){    
    return <button className="btn" onClick={onClickForm}>
        {text}
    </button>
}

export default Boton;