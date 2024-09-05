import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function CreateTaskToggle({ handleClick, task, handleTaskReset}) {
  const createTask = () => {
    console.log(`creating new task...${task}`);  
    handleTaskReset();
  }
  return (
    <Stack spacing={2} direction="row" sx={{ dislay: 'flex', justifyContent: 'end',}}>
      <Button variant="contained" disabled={task === ''} onClick={createTask}>create</Button>
      <Button sx={{ color: '#37e2ff' }} variant="text" onClick={ handleClick }>cancel</Button>
    </Stack>
  );
}