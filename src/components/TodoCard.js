import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import {Card, CardActions, CardContent, Typography, Box } from '@mui/material';
import { FixedSizeList } from 'react-window';
import Input from './Input';
import CreateTaskDecision from './CreateCancelButton';
import CreateTaskIcon from './PlusIcon';
import DropdownButton from './DropdownButton';
import Copyright from './Copyright';
import '/home/aldrich/mmTodoFs/mmtodofe/src/scrollbar.css'; 
import Row from './Row';

export default function TodoCard({ borderColor }) {
  const [isVisible, setIsVisible] = useState(false);
  const [task, setTask] = useState('');
  const [checkedTasks, setCheckedTask] = useState({});
  const [dbTask, setDbTask] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskInputValue, setTaskInputValue] = useState('');
  const dueDate = new Date('2024-12-31').toISOString().split('T')[0];

  // On mount, fetch task from backend 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tasks');
        setDbTask(response.data);
      } catch (error) {
        setError('Failed to fetch tasks');
      }
    };

    fetchData();
  }, []);

  const handleClick = (taskId) => {
    setIsVisible(!isVisible);
    handleTaskReset();
    setEditingTaskId(taskId);
  };

  // Focus on create input when <CreateTaskIcon />  is triggered
  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isVisible]);

  const handleCreateKeyDown = async (e) => {
    if (task === '') return;

    if (e.key === 'Enter') {
      e.preventDefault();

      try {
        await axios.post('http://127.0.0.1:8000/tasks', {
          title: task,
          description: 'none',
          status: 'incomplete',
          due_date: dueDate,
          priority: 'medium',
        });

        handleTaskReset();

        const response = await axios.get('http://127.0.0.1:8000/tasks');
        setDbTask(response.data);
      } catch (error) {
        setError('Failed to create tasks');
      }
      console.log(`Task Entered:`, task);
    }
  };

  const handleCheckBox = (taskId) => {
    setCheckedTask((prevCheckedTasks) => ({
      ...prevCheckedTasks,
      [taskId]: !prevCheckedTasks[taskId],
    }));
    console.log(checkedTasks);
    console.log(taskId);
  };

  // Reset task
  const handleTaskReset = () => {
    setTask(''); // Reset task
  };

  const handleEditInput = (taskId, taskTitle) => {
    console.log(`Link onEdit event from ParentComponent to ChildComponent`);
    console.log(`Selecting task to be edited with the id of ${taskId}....`);

    setEditingTaskId(taskId);
    setTaskInputValue(taskTitle);
  };

  // Focus on edit input when editingTaskId changes
  useEffect(() => {
    if (editingTaskId) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [editingTaskId]);

  const handleEditInputKeyDown = async (e) => {
    console.log(editingTaskId);
    console.log(taskInputValue);

    if (e.key === 'Enter') {
      if (taskInputValue === '') {
        console.log('Task input is empty, not saving.');
        return;
      }

      console.log('Editing Task ID:', editingTaskId);
      console.log('Input value:', taskInputValue);

      try {
        // PUT REQUEST (input enter) to update DB
        await axios.put(`http://127.0.0.1:8000/tasks/${editingTaskId}`, {
          title: taskInputValue,
          description: 'none',
          status: 'incomplete',
          due_date: dueDate,
          priority: 'medium',
        });

        // GET REQUEST after update
        const response = await axios.get('http://127.0.0.1:8000/tasks');
        setDbTask(response.data);

        console.log('Task Edited Successfully:', response.data);

        // Clear the input and exit edit mode
        setTaskInputValue('');
        setEditingTaskId(null);
      } catch (error) {
        console.error('Failed to edit task:', error);
        setError('Failed to edit task');
      }
    }
  };

  const handleClickEdit = async () => {
    if (taskInputValue === '') return;

    try {
      // PUT REQUEST (button click) to update task
      await axios.put(`http://127.0.0.1:8000/tasks/${editingTaskId}`, {
        title: taskInputValue,
        description: 'none',
        status: 'incomplete',
        due_date: dueDate,
        priority: 'medium',
      });

       // GET REQUEST after update
      const response = await axios.get('http://127.0.0.1:8000/tasks');
      setDbTask(response.data);

      console.log('Task Edited Successfully:', response.data);

      // Clear the input and exit edit mode
      setTaskInputValue('');
      setEditingTaskId(null);
    } catch (error) {
      console.error('Failed to edit task:', error);
      setError('Failed to edit task');
    }
  };

  const handleCancelClickEdit = () => {
    setEditingTaskId(null);
  };

  // Prepare data to pass to Row
  const itemData = {
    dbTask,
    checkedTasks,
    handleCheckBox,
    editingTaskId,
    handleEditInput,
    handleEditInputKeyDown,
    taskInputValue,
    setTaskInputValue,
    handleClickEdit,
    handleCancelClickEdit,
    borderColor,
    setError,
    inputRef
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ display: 'flex', flexDirection: 'column', width: '40rem', boxShadow: 8 }}>
        <CardContent sx={{ flexGrow: 1 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ mt: 1 }}>TEST LIST</Typography>

            <Box sx={{ display: 'flex' }}>
              <div onClick={handleClick}>
                <CreateTaskIcon />
              </div>
              {/* Ensure task.id exists; if not, adjust accordingly */}
              <DropdownButton
                optionsRange={[0, 1]}
                setDbTask={setDbTask}
                dbTask={dbTask}
                setError={setError}
                // Remove taskId or provide a valid taskId
                taskId={task.id}
              />
            </Box>
          </Box>

          <hr />

          {/* List of tasks */}
          <FixedSizeList
            height={418}
            itemSize={100}
            itemCount={dbTask.length}
            itemData={itemData}
            width="100%"
            className="transparent-scrollbars"
          >
            {Row}
          </FixedSizeList>

          {/* Display error if any */}
          {/* {error && <Typography color="error">{error}</Typography>} */}
        </CardContent>

        {/* Task Input Section */}
        <Box sx={{ display: isVisible ? 'block' : 'none', mt: 2 }} key={isVisible}>
          <CardActions
            sx={{
              mx: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: 1,
            }}
          >
            <div>
              <Input
                type="text"
                ref={inputRef}
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleCreateKeyDown}
                color={borderColor}
                prop={'What needs to be done?'}
              />
            </div>

            <div>
              <CreateTaskDecision
                handleClick={handleClick}
                task={task}
                setDbTask={setDbTask}
                setError={setError}
                handleTaskReset={handleTaskReset}
              />
            </div>
          </CardActions>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 5 }}>
            {task !== '' && <Box sx={{ fontSize: 25, mx: 13 }}>{task}</Box>}
          </Box>
        </Box>

        <br />

        {/* Footer Text */}
        <Box sx={{ mx: 20 }}>
          <p>Don't miss out on important tasks anymore</p>
        </Box>

        <br />

        {/* Footer */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Copyright year={2024} placeholder="Aldrich" />
        </Box>
      </Card>
    </Box>
  );
}
