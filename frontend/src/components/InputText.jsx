import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const InputText = ({name,type = "text",...props}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <>
      <div className='relative'>
      <input 
      type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        name={name}
        {...props}
        className='p-1 pl-1.5  text-black border border-amber-950 outline-0 text-0.5xl w-full'
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 cursor-pointer top-4 transform -translate-y-1/2"
        >
          {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
        </button>
      )}
      </div>
    </>
  )
}

export default InputText