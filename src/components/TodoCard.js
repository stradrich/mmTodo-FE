import axios from 'axios';
import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Input from './Input';
import CreateTaskDecision from './CreateCancelButton';
import {Checkbox, Button} from '@mui/material/';
import CreateTaskIcon from './PlusIcon'; 
import DropdownButton from './DropdownButton';
import Copyright from './Copyright';
import { FixedSizeList } from "react-window";
import '/home/aldrich/mmTodoFs/mmtodofe/src/scrollbar.css'; 
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

export default function TodoCard({ borderColor}) {
  const [isVisible, setIsVisible] = useState(false);
  const [task, setTask] = useState('');
  const [isBoxChecked, setIsBoxChecked] = useState(false);
  const [checkedTasks, setCheckedTask] = useState({});
  const [dbTask, setDbTask] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);  // Access the DOM node directly and focus the input
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskInputValue, setTaskInputValue] = useState('');
  const dueDate = new Date('2024-12-31').toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/tasks');
        setDbTask(response.data); // Correctly set the fetched data
      } catch (error) {
        setError('Failed to fetch tasks'); // More descriptive error message
      }
    };
    
    fetchData();
  }, []);

  const handleClick = (taskId) => {
    setIsVisible(!isVisible); // Toggle the visibility state
    // console.log('Create Button Clicked from Parent');
    handleTaskReset();
    setEditingTaskId(taskId); // Set the task id that is being edited
  };
  
  // focus on create input when clicked
  useEffect(() => {
    if(isVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50)
    }
  }, [isVisible]);


  const handleCreateKeyDown = async (e) => {
    if (task === '') return;

    if (e.key === 'Enter') {
      e.preventDefault();
      
      try {
        await axios.post('http://127.0.0.1:8000/tasks',{title: task, description: "none", status: 'incomplete', due_date: dueDate, priority: "medium"}); // Make sure to pass the right JSON structure to backend
 
        handleTaskReset();

        const response = await axios.get('http://127.0.0.1:8000/tasks');
        setDbTask(response.data);
      } catch (error) {
        setError('Failed to create tasks');
      }
      console.log(`Task Entered:`, task);
    }
  }

  const handleCheckBox = (taskId) => {
    // setIsBoxChecked(!isBoxChecked)
    // console.log('Checkbox clicked');
    
    setCheckedTask((prevCheckedTasks) => ({
      ...prevCheckedTasks,
      [taskId]: !prevCheckedTasks[taskId],
    }))
    console.log(isBoxChecked);
    console.log(taskId);
  }

  const handleTaskReset = () => {
    setTask(''); // Reset task
  };

  const handleEditInput = (taskId, taskTitle) => {
    console.log(`Link onEdit event from ParentComponent to ChildComponent`);
    console.log(`Selecting task to be edited with the id of ${taskId}....`);
    
    setEditingTaskId(taskId); // Set the current task in edit mode
    setTaskInputValue(taskTitle); // Set the input field with the current task title
  }
  
  // focus on edit input when clicked
  useEffect(() => {
    if(editingTaskId) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50)
    }
  }, [editingTaskId]);

  // Handle the "Enter" key press
  const handleEditKeyDown = async (e) => {
    console.log(editingTaskId);
    console.log(taskInputValue);
    
    if (e.key === 'Enter') {
      // e.preventDefault(); // Prevent default behavior if Enter is pressed
      
      if (taskInputValue === '') {
        console.log('Task input is empty, not saving.');
        return; // Exit if the input is empty
      }
  
      console.log('Editing Task ID:', editingTaskId);
      console.log('Input value:', taskInputValue);
    
      try {
        // Send PUT request to update task
        await axios.put(`http://127.0.0.1:8000/tasks/${editingTaskId}`, {
          title: taskInputValue,
          description: "none",
          status: 'incomplete',
          due_date: dueDate,
          priority: "medium"
        });
  
          // Refetch tasks after update
        const response = await axios.get('http://127.0.0.1:8000/tasks');
        setDbTask(response.data);

        console.log(setDbTask);
        

        console.log('Task Edited Successfully:', response.data);
        
        // Clear the input and toggle back to display the task title
        setTaskInputValue(''); // Clear input field
        setEditingTaskId(null); // Exit edit mode
  
      } catch (error) {
        console.error('Failed to edit task:', error);
        setError('Failed to edit task'); // Set error message
      }
    }
  };
  

  const handleClickEdit = async (e) => {
    // if(editingTaskId) {
    //   console.log('Updated Task:', taskInputValue);
    //   setTaskInputValue('');
    //   setEditTaskValue(null);
    // }
    console.log(editingTaskId);
    console.log(taskInputValue);

    if (taskInputValue === '') return;

    try {
      // Send PUT request to update task
      await axios.put(`http://127.0.0.1:8000/tasks/${editingTaskId}`, {
        title: taskInputValue,
        description: "none",
        status: 'incomplete',
        due_date: dueDate,
        priority: "medium"
      });

        // Refetch tasks after update
      const response = await axios.get('http://127.0.0.1:8000/tasks');
      setDbTask(response.data);

      console.log(setDbTask);
      

      console.log('Task Edited Successfully:', response.data);
      
      // Clear the input and toggle back to display the task title
      setTaskInputValue(''); // Clear input field
      setEditingTaskId(null); // Exit edit mode

    } catch (error) {
      console.error('Failed to edit task:', error);
      setError('Failed to edit task'); // Set error message
    }
 
  }

  const handleCancelClickEdit = () => {
    setEditingTaskId(null); // Exit edit mode to show the task title again
  }

  // Move DB mapping here, to be encapsulated into the scrollable component
  const Row = ({index, style}) => {
    const task = dbTask[index];
    return(
      <Box style={style} key={task.id}>
        <CardContent sx={{ opacity: checkedTasks[task.id] ? 0.5 : 1}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {editingTaskId === task.id ? 
                    (<Box>
                      <Input 
                        type="text" // EDIT INPUT
                        color={borderColor} 
                        prop={task.title} 
                        ref={inputRef}
                        handleTaskReset={handleTaskReset}
                        onKeyDown={handleEditKeyDown}

                        value={taskInputValue} // Controlled input bound to taskInputValue
                        onChange={(e) => setTaskInputValue(e.target.value)} // Update input as user types
                        // onKeyDown={(e) => { if (e.key === "Enter") {console.log('Edit');
                        // }}}
                      />
                   
                        <Button 
                            // onClick={ (e) => {
                            //   console.log('edit clicked');
                            //   console.log(taskInputValue); // This will log the value
                            // }} 
                            
                          onClick={handleClickEdit}
                          sx={{ml: 42, mb: 1, backgroundColor: '#fafaff',  color: 'black', position: 'absolute', zIndex: '1', right: '13rem', top: '4.5rem'}}>
                          <DoneIcon/>
                        </Button>

                        <Button 
                          // onClick={ (e) => {console.log('cancel clicked');}} 
                          onClick={handleCancelClickEdit}
                          sx={{mx: 1,  mb: 1, backgroundColor: '#fafaff',   color: 'black', position: 'absolute', zIndex: '1', right: '8rem', top: '4.5rem'}}>
                          <CloseIcon/>
                        </Button>
                        {/* <DropdownForEditInput/>  */}
                    
                    </Box>
                    ) 
                    :
                    (<Typography sx={{ ml: 1, mt: 3.5, fontWeight: 'bold' }}>
                        {task.title}
                    </Typography>)
                  }
                  <Box sx={{ display: 'flex', mb: 3}}>
                    <Checkbox checked={!!checkedTasks[task.id]} onChange={() => handleCheckBox(task.id)}/>
                    <DropdownButton  optionsRange={[1, 3]} setDbTask={setDbTask} setError={setError} dbTask={dbTask} taskId={task.id} onEdit={()=> handleEditInput(task.id, task.title)}/>
                  </Box>
                </Box>
             <hr/>
        </CardContent>
      </Box>
    )
  }

  // console.log('setDbTask in ParentComponent:', setDbTask);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Card sx={{ display: 'flex', flexDirection: 'column',  width: '40rem', boxShadow: 8 }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ mt: 1 }}>
                TEST LIST
            </Typography>

            <Box sx={{ display: 'flex' }}>
              <div onClick={handleClick}>
                <CreateTaskIcon />
              </div>
                <DropdownButton optionsRange={[0, 1]} setDbTask={setDbTask} dbTask={dbTask} setError={setError} taskId={task.id}/>
            </Box>
          </Box>

          <hr />
            
            <FixedSizeList 
              height={418}
              itemSize={100}
              itemCount={dbTask.length}
              itemData={dbTask}
              width="100%"
              className="transparent-scrollbars"
            >
                {Row}
            </FixedSizeList>

            {/* {error && <p>{error}</p>}
            {dbTask.map(task => (
            <CardContent key={task.id} sx={{ opacity: checkedTasks[task.id] ? 1 : 0.5}}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ mt: 1, fontWeight: 'bold' }} key={task.id}>
                      {task.title}
                  </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Checkbox checked={!!checkedTasks[task.id]} onChange={() => handleCheckBox(task.id)}/>
                  <DropdownButton optionsRange={[1, 3]}/>
                </Box>
              </Box>
              <hr/>
            </CardContent>
            ))} */}
          
        </CardContent>

        {/* <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography sx={{ mt: 1, fontWeight: 'bold' }}>blablabla</Typography>

            <Box sx={{ display: 'flex' }}>
              <Checkbox />
              <DropdownButton optionsRange={[1, 3]}/>
            </Box>
          </Box>
          <hr />
        </CardContent> */}

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
              type="text" // CREATE INPUT
              ref={inputRef} 
              value={task} onChange = {(e) => setTask(e.target.value)} 
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
          {task !== '' &&  <Box sx={{fontSize: 25, mx: 13}}>{task}</Box>}
          </Box>
        </Box>

        <br/>


        {/* GET DUMMY DATA FROM BE*/}
        {/* <Box sx={{ mx: 30, mb: 5 }}>
          {error && <p>{error}</p>}
          <ul>
            {dbTask.map(task => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </Box> */}

        <Box sx={{ mx: 20 }}>
          <p>Don't miss out on important tasks anymore</p>
        </Box>
        
        <br />
        <Box  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Copyright year={2024} placeholder="Aldrich" />
        </Box>
      </Card>

    </Box>
  );
}
