import React from 'react';
import { useState } from 'react';
import './App.scss'
 export default function App(){
  const [count,setCount]=useState(1)
  function handleAdd(){
    setCount(count+1);

  }
  function handleReset(){
    setCount(0);

  }
  function handleSub(){

    setCount(count-1)
  }
  return(
    <section className="counter-sec ">
          <div className='container counter'>
            <h1>React Counter App</h1>
            <p className='count'>{count}</p>
            <div className='buttons'>
              <button className='add'onClick={handleAdd}>++ Increment</button>
              <button className='reset' onClick={handleReset}>! Reset</button>
              <button className='subract' onClick={handleSub}>-- Decrement</button>
            </div>

          </div>
    </section>
  )
 }