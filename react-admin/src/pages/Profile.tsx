import React, { Dispatch, SyntheticEvent, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { Button, TextField } from '@mui/material'
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

    // (async () => {
    //   const { data } = await axios.get('user')
    //   setProfile({
    //     first_name: data.first_name,
    //     last_name: data.last_name,
    //     email: data.email,
    //     password: '',
    //     password_confirm: '',
    //   })
    // })()
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
          <TextField label="First Name" value={profile.first_name} onChange={handleChange} name="first_name" />
        </div>
        <div className="mb-3">
          <TextField label="Last Name" value={profile.last_name} onChange={handleChange} name="last_name" />
        </div>
        <div className="mb-3">
          <TextField label="Email" value={profile.email} onChange={handleChange} name="email" />
        </div>
        <Button variant="contained" color="primary" type='submit'>Submit</Button>
      </form>

      <h3 className='mt-4'>Change Password</h3>
      <form className="mt-4" onSubmit={passwordSubmit}>
        <div className="mb-3">
          <TextField type="password" label="Password" name="password" value={profile.password} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <TextField type="password" label="Confirm Password" name="password_confirm" value={profile.password_confirm} onChange={handleChange} />
        </div>
        <Button variant="contained" color="primary" type='submit'>Submit</Button>
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