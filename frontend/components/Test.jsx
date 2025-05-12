import React from 'react'
import { useState , useEffect } from 'react'
import { Text } from 'react-native'
import axios from 'axios';

function Test() {

const [teachers,setTeachers] = useState("")
useEffect(()=>{
    axios.get('http://localhost:5000/teachers')
    .then(response => setTeachers(response.data))
    .catch(error=>console.error('Error',error));
},[]);
  return (
    <>
    <Text>Teachers List</Text>
    <Text>{teachers}</Text>
    </>
  )
}

export default Test