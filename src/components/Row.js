// Row.js
import React from 'react';
import { Box, CardContent, Typography, Checkbox, Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Input from './Input';
import DropdownButton from './DropdownButton';

const Row = ({ index, style, data }) => {
  const {
    dbTask,
    setDbTask,
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
  } = data;

  const task = dbTask[index];

  return (
    <Box style={style} key={task.id}>
      <CardContent sx={{ opacity: checkedTasks[task.id] ? 0.5 : 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {editingTaskId === task.id ? (
            <Box>
              <Input
                type="text"
                ref={inputRef}
                color={borderColor}
                prop={task.title}
                value={taskInputValue}
                onChange={(e) => setTaskInputValue(e.target.value)}
                onKeyDown={handleEditInputKeyDown}
              />

              <Button
                onClick={handleClickEdit}
                sx={{
                  ml: 42,
                  mb: 1,
                  backgroundColor: '#fafaff',
                  color: 'black',
                  position: 'absolute',
                  zIndex: '1',
                  right: '14rem',
                  top: '4.5rem',
                }}
              >
                <DoneIcon />
              </Button>

              <Button
                onClick={handleCancelClickEdit}
                sx={{
                  mx: 1,
                  mb: 1,
                  backgroundColor: '#fafaff',
                  color: 'black',
                  position: 'absolute',
                  zIndex: '1',
                  right: '8rem',
                  top: '4.5rem',
                }}
              >
                <CloseIcon />
              </Button>
            </Box>
          ) : (
            <Typography sx={{ ml: 1, mt: 3.5, fontWeight: 'bold' }}>
              {task.title}
            </Typography>
          )}

          <Box sx={{ display: 'flex', mb: 3 }}>
            <Checkbox
              checked={!!checkedTasks[task.id]}
              onChange={() => handleCheckBox(task.id)}
            />
            <DropdownButton
              optionsRange={[1, 3]}
              setDbTask={data.setDbTask}
              setError={setError}
              dbTask={dbTask}
              setDbTask={setDbTask}
              taskId={task.id}
              onEdit={() => handleEditInput(task.id, task.title)}
            />
          </Box>
        </Box>
        <hr />
      </CardContent>
    </Box>
  );
};

export default Row;
