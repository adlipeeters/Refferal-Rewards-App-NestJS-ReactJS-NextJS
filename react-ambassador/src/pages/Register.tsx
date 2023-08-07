import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../login.css'

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const [redirect, setRedirect] = useState(false);

    const handleChange = (event: any) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        });
    };

    const submit = async (e: any) => {
        e.preventDefault();

        await axios.post('http://localhost:3500/api/admin/register', {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.email,
            password: user.password,
            password_confirm: user.passwordConfirm,
        });

        setRedirect(true);
    };

    useEffect(() => {
        if (redirect) {
            navigate('/login');
        }
    }, [redirect, navigate]);

    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="First Name" name="firstName" onChange={handleChange} />
                    <label htmlFor="floatingInput">First Name</label>
                </div>
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Last Name" name="lastName" onChange={handleChange} />
                    <label htmlFor="floatingInput">Last Name</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" placeholder="name@example.com" name="email" onChange={handleChange} />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange} />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Confirm Password" name="passwordConfirm" onChange={handleChange} />
                    <label htmlFor="floatingPassword">Confirm Password</label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
            </form>
        </main>
    );
};

export default Register;
