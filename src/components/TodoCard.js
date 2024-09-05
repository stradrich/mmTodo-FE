import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Input from './Input';
import CreateTaskToggle from './Button';
import Checkbox from '@mui/material/Checkbox';
import CreateTaskIcon from './PlusIcon'; 
import DropdownButton from './DropdownButton';
import Copyright from './Copyright';

export default function TodoCard({ borderColor}) {
  const [isVisible, setIsVisible] = useState(false);
  const [task, setTask] = useState('');
  const [isBoxChecked, setIsBoxChecked] = useState(false);
 

  const handleClick = () => {
    setIsVisible(!isVisible); // Toggle the visibility state
    // console.log('Create Button Clicked from Parent');
    handleTaskReset();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log(`Task Entered:`, task);
      handleTaskReset();
    }
  }

  const handleCheckBox = () => {
    // console.log('Checkbox clicked');
    setIsBoxChecked(!isBoxChecked)
    console.log(isBoxChecked);
    
  }

  const handleTaskReset = () => {
    setTask(''); // Reset task
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '50rem',  width: '40rem'}}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ mt: 1 }}>
                TEST LIST
            </Typography>

            <Box sx={{ display: 'flex' }}>
              <div onClick={handleClick}>
                <CreateTaskIcon />
              </div>
                <DropdownButton optionsRange={[0, 1]}/>
            </Box>
          </Box>

          <hr />

            <CardContent sx={{ opacity: isBoxChecked ? 1 : 0.5}}>
              {error && <p>{error}</p>}
              {dbTask.map(task => (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ mt: 1, fontWeight: 'bold' }} key={task.id}>
                      {task.title}
                  </Typography>
                <Box sx={{ display: 'flex' }}>
                  <Checkbox onChange={handleCheckBox}/>
                  <DropdownButton optionsRange={[1, 3]}/>
                </Box>
              </Box>
              ))}
              <hr/>
          </CardContent>
          
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

        <Box sx={{ display: isVisible ? 'block' : 'none', mt: 2 }}>
          <CardActions
            sx={{
              mx: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: 4,
            }}
          >
            <div>
              <Input value={task} onChange = {e => setTask(e.target.value)} onKeyDown={handleKeyDown} type="text" color={borderColor} prop={'What needs to be done?'} />
            </div>

            <div>
              <CreateTaskToggle  handleClick={handleClick} task={task}  handleTaskReset={handleTaskReset}/>
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


