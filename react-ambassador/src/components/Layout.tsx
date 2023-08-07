import React, { Dispatch, useEffect, useState } from 'react'
import Nav from './Nav'
import Header from './Header'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';

const Layout = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        (async () => {
            try {
                const { data } = await axios.get('user')
                // setUser(data)
                props.setUser(data)
                // console.log(data)
            } catch (error) {
                // navigate('/login');
            }
        })()
    }, [])

    let header;
    if (location.pathname === '/' || location.pathname === '/backend') {
        header = (<Header />)
    }
    return (
        <div>
            <Nav />
            <main>
                {header}
                <div className="album py-5 bg-body-tertiary">
                    <div className="container">
                        {props.children}
                    </div>
                </div>
            </main>
        </div>
    )
}

const mapStateToProps = (state: { user: User }) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);