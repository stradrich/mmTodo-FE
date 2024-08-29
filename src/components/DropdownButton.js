import * as React from "react";
import { useState } from 'react';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FontAwesomeKebabIcon from './KebabIcon';

const options = ["Delete Entire List", "Edit item", "Delete item"];

export default function DropdownButton({ optionsRange }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedOption, setSelectionOption] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log('show');
        
    };

    const handleClose = () => {
        setAnchorEl(null);
        // console.log('Selected Option', selectedOption[selectedOption]);
        
        console.log('hide');
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
                    <MenuItem key={index} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
