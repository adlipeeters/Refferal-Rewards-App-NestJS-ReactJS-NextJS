import React, { useState, useEffect, SyntheticEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../login.css'


const Login = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const [redirect, setRedirect] = useState(false);

    const handleChange = (event: any) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('login', {
            email: user.email,
            password: user.password,
        });

        setRedirect(true);
    };

    useEffect(() => {
        if (redirect) {
            navigate('/');
        }
    }, [redirect, navigate]);

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please login</h1>
                <div className="form-floating">
                    <input type="email" className="form-control" placeholder="name@example.com" name="email" onChange={handleChange} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
            </form>
        </main>
    );
};

export default Login;
