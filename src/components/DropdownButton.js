import * as React from "react";
import { useState } from 'react';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FontAwesomeKebabIcon from './KebabIcon';
import axios from "axios";

const options = ["Delete Entire List", "Edit Item", "Delete Item"];

export default function DropdownButton({ optionsRange, setDbTask, setError, dbTask, taskId, onEdit}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedOption, setSelectionOption] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // handle CRUD here (mainly, delete all, edit specific and delete specific), using switch
    const handleOptionClick = (option) => {
        setSelectionOption(option);
        
        // Excecute CRUD
        switch(option.trim()) {
            case "Delete Entire List":
                deleteEntireList();
                break;
            case "Edit Item":
                onEdit(taskId);
                break;
            case "Delete Item":
                deleteItem();
            default:
             console.log('unknown action'); 
        }
        handleClose();  
    };

    const deleteEntireList = async () => {
        try {
            await axios.delete('http://127.0.0.1:8000/api/tasks')
            
            const response = await axios.get('http://127.0.0.1:8000/tasks');
            setDbTask(response.data);
        } catch (error) {
            setError('Failed to delete the entire list');
        }
    };

    const deleteItem = async () => {
        try {
            const taskToDelete = dbTask.find(task => task.id === taskId);
            const taskTitle = taskToDelete ? taskToDelete.title : 'Unknown';

            await axios.delete(`http://127.0.0.1:8000/tasks/${taskId}`)

            const response = await axios.get('http://127.0.0.1:8000/tasks');
            
            setDbTask(response.data);
        } catch (error) {
            setError(`Failed to delete task with id of ${taskId}`);
        }
    };

    return (
        <>
            <div onClick={handleClick}>
                <FontAwesomeKebabIcon />
            </div>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.slice(...optionsRange).map((option, index) => (
                    <MenuItem key={index} onClick={() => handleOptionClick(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
