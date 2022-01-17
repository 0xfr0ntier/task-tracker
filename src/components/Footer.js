import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <p>Built with ❤️ by 0xfr0ntier.</p>
            <Link to="/about">About</Link>
        </footer>
    );
};

export default Footer;
