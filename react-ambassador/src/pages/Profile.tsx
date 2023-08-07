import React, { Dispatch, SyntheticEvent, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios';
import { connect } from 'react-redux';
import { User } from '../models/user';
import { setUser } from '../redux/actions/setUserAction';

const Profile = (props: any) => {
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  });

  const handleChange = (event: any) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setProfile({
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      email: props.user.email,
      password: '',
      password_confirm: '',
    })
  }, [props.user])

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { data } = await axios.put('users/info', {
      first_name: profile.first_name,
      last_name: profile.last_name,
      email: profile.email,
    });

    props.setUser(data);
  };

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const data = {
      password: profile.password,
      password_confirm: profile.password_confirm,
    }
    await axios.put('users/password', data);

    setProfile({
      ...profile,
      password: '',
      password_confirm: '',
    });
  };

  return (
    <Layout>
      <h3>Account Information</h3>
      <form className="mt-4" onSubmit={infoSubmit}>
        <div className="mb-3">
          <label htmlFor="">First Name</label>
          <input type="text" className="form-control" defaultValue={profile.first_name} onChange={handleChange} name="first_name" />
        </div>
        <div className="mb-3">
          <label htmlFor="">Last Name</label>
          <input type="text" className="form-control" defaultValue={profile.last_name} onChange={handleChange} name="last_name" />
        </div>
        <div className="mb-3">
          <label htmlFor="">Email</label>
          <input type="email" className="form-control" defaultValue={profile.email} onChange={handleChange} name="email" />
        </div>
        <button className='btn btn-primary' type='submit'>Submit</button>
      </form>

      <h3 className='mt-4'>Change Password</h3>
      <form className="mt-4" onSubmit={passwordSubmit}>
        <div className="mb-3">
          <label htmlFor="">Password</label>
          <input type="password" className="form-control" defaultValue={profile.password} onChange={handleChange} name="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="">Confirm Password</label>
          <input type="password" className="form-control" defaultValue={profile.password_confirm} onChange={handleChange} name="password" />
        </div>
        <button className='btn btn-primary' type='submit'>Submit</button>
      </form>
    </Layout>
  )
}

const mapStateToProps = (state: { user: User }) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)