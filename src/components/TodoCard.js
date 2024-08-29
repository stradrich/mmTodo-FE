import * as React from 'react';
import { useState } from 'react';
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

export default function TodoCard({ borderColor }) {
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible); // Toggle the visibility state
    // console.log('Create Button Clicked from Parent');
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
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '40rem' }}>
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

            <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ mt: 1, fontWeight: 'bold' }}>blablabla</Typography>

              <Box sx={{ display: 'flex' }}>
                <Checkbox />
                <DropdownButton optionsRange={[1, 3]}/>
              </Box>
            </Box>
            <hr />
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
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              gap: 2,
            }}
          >
            <div>
              <Input type="text" color={borderColor} prop={'What needs to be done?'} />
            </div>

            <div>
              <CreateTaskToggle  handleClick={handleClick}/>
            </div>
          </CardActions>
        </Box>

        <br />

        <Box sx={{ mx: 13 }}>
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
