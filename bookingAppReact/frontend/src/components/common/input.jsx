import React from 'react';
const Input = ({name,label,value,onChange,type,error,min}) => {
    return ( 
        <div className="mb-3">
            <label htmlFor={name} className="htmlForm-label">{label}</label>
            <input 
            value={value}
            onChange={onChange}
            name={name}
            id={name}
            type={type} 
            className="htmlForm-control"
            min={min} 
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
     );
}
 
export default Input;