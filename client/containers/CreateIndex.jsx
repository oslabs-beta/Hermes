import React, { useState, useEffect } from 'react';
// import {useAxios} from '../hooks/useAxios';
import Indices from '../components/Indices';
const CreateIndex = () => {
  const [alias, setAlias] = useState([]);

  const [input, setInput] = useState('');

  const [patterns, setPatterns] = useState([]);

  const [marked, setMarked] = useState('');

  useEffect(() => {
    fetch('/indexpatterns').then(res => res.json()).then(res => setPatterns(res));
    
  }, [marked]);

  console.log(patterns);


  useEffect(() => {
    fetch('/logs/esindices')
      .then((res) => res.json())
      .then((res) => setAlias(res));
  }, [setAlias]);

  if (alias) {
    console.log(alias['logstash-2021.09.11']);
    console.log(alias);
  }
  const arr = [];

  for (let key in alias) {
    arr.push(key);
  }

  function deleter(data) {
    fetch(`/indexpatterns`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then((data) => {
        console.log(data);
      })
      
      .catch(err => console.log('Login error:', err));
  }
  
  function poster(data) {
    fetch(`/indexpatterns`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      })

      .catch((err) => console.log('Login error:', err));
  }
  function truer(arr, input) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].includes(input) || input.charAt(input.length - 1) === '*') return true;
    }
    return false;
  }

  return(
    <div className="index-container">
      <header className="alerts-display-header">
        <h1 className="index-titler">Manage Indicies</h1>
        <input type="text" className="index-field" value={input} onChange={(e)=> setInput(e.target.value)}/>
        {truer(arr, input) && <button type="button" onClick={()=> poster({'indexPattern': input})}>Add Index</button>}
        <div className="delete-indexes">
          <select name="patterns" className="index-patterns" onChange={(e)=> setMarked(e.target.value)}>
            {patterns && patterns.map((index, i)=>{
              return <option value={index} key ={i}>{index}</option>;
            })}
          </select><button type="button" onClick={()=> deleter({'indexPattern': marked})}>delete</button></div>
      </header>
      <div className='sources-container'>
        <h1>Existing Elasticsearch Indices</h1>
        {arr &&
          arr.map((ele, i) => {
            return <Indices key={i} name={ele} />;
          })}
      </div>
    </div>
  );
};

export default CreateIndex;
