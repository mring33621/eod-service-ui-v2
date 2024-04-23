import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Intro Page</Link>
                </li>
                <li>
                    <Link to="/marketdata">Market Data Page</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar