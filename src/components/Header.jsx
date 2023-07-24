import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className='header'>
            <h1 className='site_title'>Income Expense Tracker App</h1>
            <nav className='navbar'>
                <ul>
                    <li>
                        <NavLink exact to='/' className='active'>
                            Income
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/expenses' className='active'>
                            Expenses
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
