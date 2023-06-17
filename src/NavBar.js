import './styles/nav.css';
export default function NavBar({name}) {
    return ( <nav className="back-gray navMain">
            <ul className="cont-navBar">
                <li>{name}</li>
                <li>Modo DARK</li>
            </ul>
        
             </nav>)
}