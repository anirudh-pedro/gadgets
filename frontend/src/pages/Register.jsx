import React from 'react'
import InputText from '../components/InputText'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    username:"",
    email:"",
    password:""
  }

  const [formData,setForm] = React.useState(initialValues);
  const [formErrors,setErrors] = React.useState({});

  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm(pre => ({
      ...pre, 
      [name] : value}))
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    const errors = validate(formData);
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Registration successful!');
          console.log(data);
          
          navigate("/login");
        } else {
          alert(data.error || "Something went wrong");
        } 
      } catch (err) {
        console.error(err);
        alert("Error connecting to server");
      }
    }
  }

  const validate = (data) => {
    const error = {};
    const reEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const reUserName = /^[a-zA-Z0-9_]{4,20}$/;
    const repassWord = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!data.email){
      error.email = "Email is required";
    }
    else if(!reEmail.test(data.email)){
      error.email = "Please enter a valid email address";
    }
    if(!data.username){
      error.username = "Username is required";
    }
    else if(!reUserName.test(data.username)){
      error.username = "Username must be 4-20 characters long and contain only letters, numbers, or underscores.s";
    }
    if(!data.password){
      error.password = "password is required";
    }
    else if(!repassWord.test(data.password)){
      error.password = "Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character (@$!%*?&).";
    }
    return  error;
  }

  return (
    <div className='w-full flex items-center justify-center h-screen bg-amber-200'>
      <pre> {JSON.stringify(formData,undefined,2)} </pre>
      <div className='shadow-[2px_8px_31px_-4px_#a8861b] bg-stone-100 p-10 flex flex-col gap-10 w-100 rounded-lg'>
      <div>
        <h1 className='text-4xl text-amber-950 text-shadow text-center'>Register Now</h1>
      </div>
      <form action="" method='POST' onSubmit={handleSubmit} className='flex flex-col align-middle justify-center gap-8'>
        <div className=''>
          <InputText type = "text" name = "username" value={formData.username} placeholder = "username" onChange = {handleChange} />
          {formErrors.username && <p className="text-red-500 text-[12px]">{formErrors.username}</p>}
        </div>
        <div>
          <InputText type = "email" name = "email" value = {formData.email} placeholder='email' onChange={handleChange}/>
          {formErrors.email && <p className="text-red-500 text-[12px]">{formErrors.email}</p>}
        </div>
        <div>
          <InputText type = "password" name = "password"  value={formData.password}placeholder='password' onChange={handleChange} />
          {formErrors.password && <p className="text-red-500 text-[12px]">{formErrors.password}</p>}
        </div>

        <div>
          <button className='bg-amber-500 cursor-pointer p-1 w-full border border-amber-100 rounded-md hover:bg-amber-600' type='submit'>Submit</button>
        </div>
      </form>
      <div className='flex gap-3 items-center justify-center'>
        <h2>Already have an account?</h2>
        <Link to='/login' className='text-amber-800 font-bold'>Login</Link>
      </div>
    </div>
    </div>
  )
}

export default Register