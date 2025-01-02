import React, { useState } from 'react'
import './TextInputfiled.css'


const TextInputfield = (props) => {
    return (
        <div className="custominputbox">
            {props.icon}
            <input className='custominput' style={{ width: props.width }} name={props.name} id={props.id} onChange={props.onChange} onBlur={props.onBlur} type={props.type} value={props.value}></input>
            <span className='customspan'>{props.placeholder}</span>
        </div>
    )
}
export default TextInputfield