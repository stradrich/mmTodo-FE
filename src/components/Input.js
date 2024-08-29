import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Input({prop, color}) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <TextField 
        placeholder={prop}
        sx={{
          '& .MuiOutlinedInput-input': {
            height: '2rem',
            padding: '0.5rem',
          },
          '& .MuiOutlinedInput-root': {
            height: '2rem',
            '& fieldset': {
              borderColor: color, // Use the color prop, default to #37e2ff
              borderWidth: '1px', // Ensure the border width is applied
            },
            '&:hover fieldset': {
              borderColor: color || '#37e2ff', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: color || '#37e2ff', // Border color when focused
            },
          },
        }} 
        />
    </Box>
  );
}