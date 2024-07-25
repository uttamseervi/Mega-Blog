import React from 'react'
import logo from "../assets/logo.png"
function Logo({ width = "20px" }) {
    return (
        <div>
            <img src={logo} className='w-48'  alt="" />
            
        </div>
    )
}

export default Logo
