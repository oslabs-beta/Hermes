import React, {useState, useEffect} from 'react';
// import {useAxios} from '../hooks/useAxios';
import Indicies from '../components/Indicies';
const CreateIndex = () =>{
  const [alias, setAlias] = useState([]);

  const [input, setInput] = useState('');


  useEffect(() => {
    fetch('/logs/esindices').then(res => res.json()).then(res => setAlias(res));
    
  }, [setAlias]);
 
  if(alias){
    console.log(alias['logstash-2021.09.11']);
    console.log(alias);
  }
  const arr = [];

  for(let key in alias){
    arr.push(key);
  }
  
  function poster(data) {
    fetch(`/logs/indexpattern`, {
      method: 'POST',
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
  function truer(arr, input){
    for (let i = 0; i < arr.length; i++){
      if(arr[i].includes(input)) return true;
    }
    return false;
  }

  return(
    <div className="index-container">
      <header className="alerts-display-header">
        <h1 className="index-titler">Define an index pattern</h1>
        <input type="text" className="index-field" value={input} onChange={(e)=> setInput(e.target.value)}/>
        {truer(arr, input) && <button type="button" onClick={()=> poster({'indexPattern': input})}>Add Index</button>};
      </header>
      <div className="sources-container">
        <h1>Sources</h1>
        {arr && arr.map((ele, i)=>{
          
          return <Indicies key={i} name={ele}/>;
          
        })}
      </div>

    </div>
  );
};

export default CreateIndex;
