import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row" sx={{ dislay: 'flex', justifyContent: 'end',}}>
      <Button variant="contained" disabled>create</Button>
      <Button sx={{ color: '#37e2ff' }} variant="text">cancel</Button>
    </Stack>
  );
}