import "./Navbar.css";
import { useState } from 'react';

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

    return (
        <div className="navbar flex justify_content_space_around">
            <div className="flex">
                <img className="navbar_logo" src="https://play-lh.googleusercontent.com/7q2dwnqAFr91NBSBRGcE1tZQCJL-FYbUKEuy103bTmQowLl3yNY73ozy5cf1mso4pCS4=w600-h300-pc0xffffff-pd"/>
                Groww Feed App
            </div>
            <button className="theme_button" onClick={changeTheme}>{theme}</button>
        </div>
    );
}

export default Navbar;