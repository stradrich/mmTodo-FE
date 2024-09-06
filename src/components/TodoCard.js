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
import Checkbox from '@mui/material/Checkbox';
import CreateTaskIcon from './PlusIcon'; 
import DropdownButton from './DropdownButton';
import Copyright from './Copyright';
import { FixedSizeList } from "react-window";
import '/home/aldrich/mmTodoFs/mmtodofe/src/scrollbar.css'; 

export default function TodoCard({ borderColor}) {
  const [isVisible, setIsVisible] = useState(false);
  const [task, setTask] = useState('');
  const [isBoxChecked, setIsBoxChecked] = useState(false);
  const [checkedTasks, setCheckedTask] = useState({});
  const [dbTask, setDbTask] = useState([]);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);  // Access the DOM node directly and focus the input

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

  const handleClick = () => {
    setIsVisible(!isVisible); // Toggle the visibility state
    // console.log('Create Button Clicked from Parent');
    handleTaskReset();
  };
  useEffect(() => {
    if(isVisible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50)
    }
  }, [isVisible]);


  const handleKeyDown = async (e) => {
    if (task === '') return;

    if (e.key === 'Enter') {
      e.preventDefault();
      const dueDate = new Date('2024-12-31').toISOString().split('T')[0];
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

  // Move DB mapping here, to be encapsulated into the scrollable component
  const Row = ({index, style}) => {
    const task = dbTask[index];
    return(
      <div style={style} key={task.id}>
        <CardContent key={task.id} sx={{ opacity: checkedTasks[task.id] ? 0.5 : 1}}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography sx={{ mt: 1, fontWeight: 'bold' }} key={task.id}>
                        {task.title}
                    </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <Checkbox checked={!!checkedTasks[task.id]} onChange={() => handleCheckBox(task.id)}/>
                    <DropdownButton optionsRange={[1, 3]} setDbTask={setDbTask} setError={setError} dbTask={dbTask} taskId={task.id}/>
                  </Box>
                </Box>
                <hr/>
        </CardContent>
      </div>
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
              <Input ref={inputRef} value={task} onChange = {(e) => setTask(e.target.value)} onKeyDown={handleKeyDown} type="text" color={borderColor} prop={'What needs to be done?'}/>
            </div>

            <div>
              <CreateTaskDecision  handleClick={handleClick} task={task} setDbTask={setDbTask} setError={setError} handleTaskReset={handleTaskReset}/>
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
