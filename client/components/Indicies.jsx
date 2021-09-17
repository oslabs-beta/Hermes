import React from 'react';

function Indicies({name}){

  console.log(name);
  return(
    <div className="indicies">
      <h1>{name}</h1>
    </div>
  );
}

export default Indicies;