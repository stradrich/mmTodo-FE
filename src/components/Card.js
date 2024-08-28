import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ColorTextFields from './Input';
import BasicButtons from './Button';
import Checkbox from '@mui/material/Checkbox';
import CreateSvgIcon from './PlusIcon'; 
import FontAwesomeSvgIconDemo from './KebabIcon';
import Copyright from './Copyright';

export default function BasicCard() {
  return (
     <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}
     >

    <Card sx={{ display: 'inline-block'}}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2}}>
            <Typography  sx={{ mt: 1,}}>
                    TEST LIST
            </Typography>
        
            <Box sx={{ display: 'flex'}}>
                <CreateSvgIcon/>
                <FontAwesomeSvgIconDemo/>
            </Box>
        </Box>

        <hr />

        {/* <Box>
          <ul>
            <li>asdasdasd</li>
          </ul>
        </Box> */}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2}}>
            <Typography  sx={{ mt: 1, fontWeight: 'bold' ,}}>
                    blablabla
            </Typography>
        
            <Box sx={{ display: 'flex'}}>
                <Checkbox/>
                <FontAwesomeSvgIconDemo/>
            </Box>
        </Box>
        
      </CardContent>
      
        <br/>  

      <Box  sx={{ display: ''}}>
        <CardActions  sx={{
            mx: 2,
            display: 'flex',
            flexDirection: 'column', 
            alignItems: 'stretch',
            gap: 2,
            }}>
            <div>
                <ColorTextFields  type="text" color="primary" prop={'What needs to be done?'}/>
            </div>

            <div>
                 <BasicButtons/>
            </div>
        </CardActions>
      </Box>

        <br/> 

      <Box sx={{mx: 13,}}>
        <p>Don't miss out on important tasks anymore</p>
      </Box>
      <br/>
      <Box sx={{display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 2, 
            mb: 5,}}>
        <Copyright year={2024} placeholder='Aldrich'/>
      </Box>
    </Card>
    </Box>
  );
}
