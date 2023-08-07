import React, { Dispatch, useEffect, useState } from 'react'
import Menu from './Menu'
import Nav from './Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { User } from '../models/user';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';

const Layout = (props: any) => {
    const navigate = useNavigate();
    // const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        (async () => {
            try {
                const { data } = await axios.get('user')
                // setUser(data)
                props.setUser(data)
                // console.log(data)
            } catch (error) {
                navigate('/login');
            }
        })()
    }, [])

    return (
        <div>
            <Nav />
            <div className="container-fluid">
                <div className="row">
                    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
                        <div className="offcanvas-lg offcanvas-end bg-body-tertiary" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">

                                <Menu />

                            </div>
                        </div>
                    </div>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div >
                            {props.children}
                        </div>
                    </main>
                </div>
            </div>
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