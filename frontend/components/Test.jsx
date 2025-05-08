import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios';

function Test() {

const [teachers,setTeachers] = useState([{}])
useEffect(()=>{
    axios.get('http://localhost:5000/teachers')
    .then(response => setTeachers(response.data))
    .catch(error=>console.error('Error',error));
},[]);
  return (
    <>
        <h1>Teachers List</h1>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={index}>{teacher.Name}</li>  // or adjust depending on your object shape
        ))}
      </ul>
    </>
  )
}

export default Test