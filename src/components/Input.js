import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ColorTextFields({prop}) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField sx={{
          '& .MuiOutlinedInput-input': {
            height: '2rem',
            padding: '0.5rem',
          },
          '& .MuiOutlinedInput-root': {
            height: '2rem',
          }
        }} placeholder={prop}/>
    </Box>
  );
}