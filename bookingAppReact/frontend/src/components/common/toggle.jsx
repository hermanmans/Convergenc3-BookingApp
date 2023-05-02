import React, { useState } from 'react'
import Logs from '../rooms'
const LogicalNot = ({label}) => {

  //Using Inline Function and the The Logical Not (!) to toggle state
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <button 
            onClick={() => setToggle(!toggle)} 
            className="btn btn-primary mb-5">
          {label}
      </button>
      {toggle && (
        <p>
            Description...
        </p>
      )}
    </>
  )
}
export default LogicalNot