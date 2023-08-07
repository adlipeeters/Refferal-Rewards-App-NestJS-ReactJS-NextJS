import React from 'react'
import { NavLink } from 'react-router-dom'

const Menu = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" >
            <ul className="nav flex-column">
                <li className="nav-item">
                    <NavLink to={'/users'} className="nav-link d-flex align-items-center gap-2 active" aria-current="page">
                        Users
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/products'} className="nav-link d-flex align-items-center gap-2 active" aria-current="page">
                        Products
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/orders'} className="nav-link d-flex align-items-center gap-2 active" aria-current="page">
                        Orders
                    </NavLink>
                </li>
                {/* <hr className="my-3" /> */}
                {/* <ul className="nav flex-column mb-auto">
                    <li className="nav-item">
                        <a className="nav-link d-flex align-items-center gap-2" href="#">
                            Settings
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link d-flex align-items-center gap-2" href="#">
                            Sign out
                        </a>
                    </li>
                </ul> */}
            </ul>
        </nav>
    )
}

export default Menu