import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DropdownForEditInput from './DropdownForEditInput';

const Input = React.forwardRef(({value, onChange, onKeyDown, type, prop, color}, ref) => {
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 2, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
      >
      <TextField
        inputRef={ref}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        type={type} 
        placeholder={prop}
        inputProps={{maxLength: 30}}
        sx={{
          '& .MuiOutlinedInput-input': {
            height: '2rem',
            padding: '1rem',
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
          }
        }} 
        />
         {/* <DropdownForEditInput/>  */}
    </Box>
  );
});

export default Input;