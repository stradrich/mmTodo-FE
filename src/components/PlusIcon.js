import * as React from 'react';
import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);

const RoundIconContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 30, 
  height: 30,
  borderRadius: '60%',
  backgroundColor: '#fff',
  border: `2px solid 	#37e2ff`,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  }));

export default function CreateTaskIcon() {
  const handleClick = () => {
  };
  return (
    <Stack direction="row" spacing={3} className="mt-1 mx-1" onClick={handleClick}>
       <RoundIconContainer>
        <IconButton>
          <PlusIcon  sx={{ color: '#37e2ff' }}/>
        </IconButton>
       </RoundIconContainer>
    </Stack>
  );
}
