import "./Navbar.css";
import { useState } from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    const [selectedTheme, setSelectedTheme] = useState('light_theme');
    const [theme, setTheme] = useState('Light');

    function changeTheme () {
        if (theme === 'Light') {
            setSelectedTheme('dark_theme');
            setTheme('Dark');
        }
        else {
            setSelectedTheme('light_theme');
            setTheme('Light');
        }

        document.body.className = selectedTheme;
    }

    function scrollToTop() {
        window.scrollTo(0, 0);
    }

    return (
        <div className="navbar flex justify_content_center">
            <div className="navbar_container flex justify_content_space_between">
                <Link to="/feed" onClick={scrollToTop} >
                    <div className="flex cursor brand_logo align_items_center">
                        <img className="navbar_logo" src="https://storage.googleapis.com/groww-assets/web-assets/img/website-logo/logo-dark-groww.svg"/>
                    </div>
                </Link>
                <button className="theme_button" onClick={changeTheme}>{theme}</button>
            </div>
        </div>
    );
}

export default Navbar;