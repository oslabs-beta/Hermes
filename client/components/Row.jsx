import React from 'react';

// eslint-disable-next-line react/prop-types
function Row({ log, index }) {
  return (
    <tr className='table-row'>
      <td className='more-info-button'>&#9660;</td>
      <td>{log}</td>
    </tr>
  );
}

export default Row;
