import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'

const App = () => {
const [data,setData]=useState([])
const [childData,setChildData]=useState([])

const GetPokeData=async(api)=>{
  let dataApi = 'https://pokeapi.co/api/v2'
  const data= await axios.get(api? api : dataApi);
  if(api){
    setChildData(data?.data?.results)
  }
  else{
  setData(data.data)}
}
useEffect(()=>{
  GetPokeData();
},[])
  const keyValueArray = Object.keys(data).map(key => ({
    key: key,
    value: data[key]
  }));
  
  return (
<div >
  <table>
    <thead>
      <tr>
        <th>Data</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      {childData.length > 0 ? (
        childData.map((item, index) => (
          <tr key={index}>
            <td style={{fontWeight:'bold', paddingLeft:'12px'}} >{item.name}</td>
            <td>{item.url}</td>
          </tr>
        ))
      ) : (
        keyValueArray.map((item, index) => (
          <tr key={index}>
            <td style={{cursor:'pointer', fontWeight:'bold', paddingLeft:'12px'}} onClick={() => { GetPokeData(item.value) }}>{item.key}</td>
            <td >{item.value}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

  
  
  )
}

export default App
