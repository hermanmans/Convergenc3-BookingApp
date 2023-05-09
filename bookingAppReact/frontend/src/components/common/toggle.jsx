import React, { useState } from 'react'
import Logs from '../rooms'
const LogicalNot = ({label,description}) => {

  //Using Inline Function and the The Logical Not (!) to toggle state
  const [toggle, setToggle] = useState(false)

  return (
    <React.Fragment>
      <button 
            onClick={() => setToggle(!toggle)} 
            className="btn btn-primary mb-2">
          {label}
      </button>
      {toggle && (
        <div style={{width:"100%"}}>
           {description}
        </div>
      )}
    </React.Fragment>
  )
}
export default LogicalNot