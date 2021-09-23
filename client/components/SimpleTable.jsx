import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function SimpleTable({ rows, title, alignment }) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        style={{ border: 'hidden', margin: 0, backgroundColor: 'whitesmoke' }}
        size='small'
        aria-label='a dense table'
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: '1.6rem', textAlign: 'center' }}>
              {title}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component='th'
                scope='row'
                style={{ fontSize: '1.3rem', textAlign: alignment }}
              >
                {row}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
