import './Input.css'
import React from 'react'

interface InputTextProps {
    onChange:(()=> void) | ((e:any)=>void),
    placeholder?: string,
    value:string,
    id: string,
    name: string,
    label: string
}

const InputText = ({onChange, placeholder, value, id, name, label}:InputTextProps) => {
  return (
    <div className='container_input'>
        { label && <label htmlFor={name}>{label}</label>} 
        <input 
            type="text" 
            value={value}  
            onChange={onChange} 
            placeholder={placeholder}
            id={id}
            name={name}    
            />
    </div>
  )
}

export default InputText