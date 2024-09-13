import * as React from "react";
import { useState } from 'react';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FontAwesomeKebabIcon from './KebabIcon';
import axios from "axios";

const options = ["Delete Entire List", "Edit Item", "Delete Item"];

export default function DropdownButton({ optionsRange, setDbTask, setError, dbTask, taskId, onEdit}) {
    // console.log('setDbTask in ChildComponent:', setDbTask);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedOption, setSelectionOption] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log('show');
        
    };

    const handleClose = () => {
        setAnchorEl(null);
        console.log('hide');
    };

    // handle CRUD here (mainly, delete all, edit specific and delete specific), using switch
    const handleOptionClick = (option) => {
        console.log(taskId);
        
        setSelectionOption(option);
        console.log('Selected Option:', option);
        // Show if we could get the data from backend (render data to check if we can get anything)
        
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
            console.log("Deleting the entire list... "); 
            
            const response = await axios.get('http://127.0.0.1:8000/tasks');
            
            setDbTask(response.data);
            // console.log(setDbTask);
            // console.log(response.data);
            console.log("Tasks after deletion:", response.data);
        } catch (error) {
            console.log('Failed to delete the entire list', error);
            setError('Failed to delete the entire list');
        }
    };

    const editItem = (taskId) => {
        console.log(`Editing the item with id of ${taskId}... `); 
    };

    const deleteItem = async () => {
        console.log(taskId);
        try {
            const taskToDelete = dbTask.find(task => task.id === taskId);
            const taskTitle = taskToDelete ? taskToDelete.title : 'Unknown';

            await axios.delete(`http://127.0.0.1:8000/tasks/${taskId}`)

            const response = await axios.get('http://127.0.0.1:8000/tasks');
            
            setDbTask(response.data);
            // console.log(setDbTask);
            // console.log(response.data);
            console.log(`Deleting item named ${taskTitle} with the id of ${taskId}... `); 
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
