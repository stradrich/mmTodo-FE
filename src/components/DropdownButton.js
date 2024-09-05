import * as React from "react";
import { useState } from 'react';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FontAwesomeKebabIcon from './KebabIcon';

const options = ["Delete Entire List", "Edit Item", "Delete Item"];

export default function DropdownButton({ optionsRange }) {
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
        setSelectionOption(option);
        console.log('Selected Option:', option);
        // Show if we could get the data from backend (render data to check if we can get anything)
        
        // Excecute CRUD
        switch(option.trim()) {
            case "Delete Entire List":
                deleteEntireList();
                break;
            case "Edit Item":
                editItem();
                break;
            case "Delete Item":
                deleteItem();
            default:
             console.log('unknown action');
             
        }
        handleClose();  
    };

    const deleteEntireList = () => {
        console.log("Deleting the entire list... "); 
    };

    const editItem = () => {
        console.log("Editing the item with id of {id}... "); 
    };

    const deleteItem = () => {
        console.log("Deleting the item with id of {id}... "); 
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
