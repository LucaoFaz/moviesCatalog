import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Criar</Link></li>
                <li><Link to="/change">Alterar</Link></li>
                <li><Link to="/delete">Deletar</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
