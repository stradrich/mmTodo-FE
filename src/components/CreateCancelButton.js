import * as React from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function CreateTaskDecision({ handleClick, task, handleTaskReset, setDbTask, setError}) {
  const createTask = async () => {
    if (task === '') return;

    const dueDate = new Date('2024-12-31').toISOString().split('T')[0];

    try {
      await axios.post('http://127.0.0.1:8000/tasks',{title: task, description: "none", status: 'incomplete', due_date: dueDate, priority: "medium"}); // Make sure to pass the right JSON structure to backend
    
      handleTaskReset();

      const response = await axios.get('http://127.0.0.1:8000/tasks');
      setDbTask(response.data);
    } catch (error) {
      setError('Failed to create tasks');
    }
      console.log(`creating new task...${task}`);  
  }
  return (
    <Stack spacing={2} direction="row" sx={{ dislay: 'flex', justifyContent: 'end',}}>
      <Button variant="contained" disabled={task === ''} onClick={createTask}>create</Button>
      <Button sx={{ color: '#37e2ff' }} variant="text" onClick={ handleClick }>cancel</Button>
    </Stack>
  );
}