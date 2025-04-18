import React from 'react'
import { useEffect, useState } from 'react';
import InputText from '../components/InputText'
import {Link, useNavigate} from 'react-router-dom';
const Login = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      navigate('/home'); 
    }
  }, []);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    console.log("Login data: ", formData);

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/home'); 

    } catch (err) {
      console.error('Login failed:', err);
      setError('Failed to connect to server');
    }
  };
  return (
    <>
      <div className='w-full flex items-center justify-center h-screen bg-amber-200'>
      <div className='shadow-[2px_8px_31px_-4px_#a8861b] bg-stone-100 p-10 flex flex-col gap-11 w-100 rounded-lg'>
      <div>
        <h1 className='text-4xl text-amber-950 text-shadow text-center'>Login</h1>
      </div>
      <form method='POST' onSubmit={handleSubmit} className='flex flex-col align-middle justify-center gap-10'>
        <div>
          <InputText type = "email" name = "email" placeholder='email' value={formData.email} onChange={handleChange}/>
        </div>
        <div>
          <InputText type = "password" name = "password" placeholder='password' value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <button className='bg-amber-500 cursor-pointer p-1 w-full border border-amber-100 rounded-md hover:bg-amber-600'>Submit</button>
        </div>
      </form>
      <div className='flex gap-3 items-center justify-center'>
        <h2>Don't have an account?</h2>
        <Link to='/register' className='text-amber-800 font-bold'>Sign Up</Link>
      </div>
    </div>
    </div>
    </>
  )
}

export default Login