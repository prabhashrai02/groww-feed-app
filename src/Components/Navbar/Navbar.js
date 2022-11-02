import "./Navbar.css";
import { useState } from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    const [darkTheme, setdarkTheme] = useState(false);
    const [theme, setTheme] = useState('Light');

    function changeTheme () {
        if (darkTheme) {
            setdarkTheme(false);
            setTheme('Light');
        }
        else {
            setdarkTheme(true);
            setTheme('Dark');
        }
    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <div className="navbar flex justify_content_center">
            <div className="navbar_container flex justify_content_space_between">
            <Link to="/feed" onClick={scrollToTop}>
                <div className="flex cursor">
                    <img className="navbar_logo" src="https://play-lh.googleusercontent.com/7q2dwnqAFr91NBSBRGcE1tZQCJL-FYbUKEuy103bTmQowLl3yNY73ozy5cf1mso4pCS4=w600-h300-pc0xffffff-pd"/>
                    Groww Feed App
                </div>
            </Link>
            <button className="theme_button" onClick={changeTheme}>{theme}</button>
            </div>
        </div>
    );
}

export default Navbar;