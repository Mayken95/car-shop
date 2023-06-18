import './styles/nav.css';
import Switch from "@mui/material/Switch";
export default function NavBar({name,check, change}) {
        const label_button = { inputProps: { "aria-label": "Switch demo" } };

    return ( <nav className="back-gray navMain">
            <ul className="cont-navBar">
                <li>{name}</li>
                <li><span className="txt-mode">☾</span><Switch {...label_button} onChange={change} checked={check} /></li>
            </ul>
        
             </nav>)
}