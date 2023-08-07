import React, { Dispatch } from 'react'
import { connect } from 'react-redux';
import { User } from '../models/user';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '../redux/actions/setUserAction';
import { NavLink } from 'react-router-dom';


const Nav = (props: any) => {
    // console.log(props.user?.id)
    const logout = async () => {
        await axios.post('logout');
        props.setUser(null);
    }
    let menu;

    if (props.user?.id) {
        menu = (<div className="col-md-3 text-end">
            <Link to={'/rankings'} className="btn">Rankings</Link>
            <Link to={'/stats'} className="btn">Stats</Link>
            <button type="button" className="btn btn-outline-primary me-2" onClick={logout}>Logout</button>
            <Link to={'/profile'} className="btn btn-primary">{props?.user.first_name} {props.user?.last_name}</Link>
        </div>)
    } else {
        menu = (<div className="col-md-3 text-end">
            <Link to={'/login'} type="button" className="btn btn-outline-primary me-2">Login</Link>
            <Link to={'/register'} type="button" className="btn btn-primary me-2">Register</Link>
        </div>)
    }

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><NavLink to={'/'} className={isActive => "nav-link px-2" + (isActive ? "active" : "")}
                        style={({ isActive, isPending }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "black",
                            };
                        }}
                    >Frontend</NavLink></li>
                    <li><NavLink to={'/backend'} className={isActive => "nav-link px-2" + (isActive ? "active" : "")}
                        style={({ isActive, isPending }) => {
                            return {
                                fontWeight: isActive ? "bold" : "",
                                color: isPending ? "red" : "black",
                            };
                        }}
                    >Backend</NavLink></li>
                </ul>
                {menu}
            </header>
        </div >
    )
}
const mapStateToProps = (state: { user: User }) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav)