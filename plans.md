Starting structure (remove or move react default files to somewhere)

Initial file structure
```
└── 📁src
    └── App.js
    └── index.css
    └── index.js
    └── logo.svg
    └── reportWebVitals.js
```

Updated file structure
```
└── 📁src
    └── 📁components
        └── Card.js
        └── TodoInput.js
        └── TodoList.js
        └── TodoItem.js
        └── Button.js
        └── IconButto n.js ???
        └── KebabIcon.js ???
    └── App.js (Card will nest TodoInput, TodoList, TodoItem, IcontButton, KebabIcon)
    └── index.css
    └── index.js
    └── initialApp.js (just for visualising html outlook)
    └── logo.svg
    └── reportWebVitals.js
```

# Initial Structural Understanding

App.js (before spilting into components)

export default function todoList() {
    return (
        <div>
            <div>
                <input/> // 1 - TodoInput component
                <button></button>
                <button></button>
            </div>
            <ul> // 2 - TodoList component
                <li></li> // 3 - TodoItem component
                <button></button>
                <button></button>
            </ul>
        </div>
    )
}

# Componentization
1 - TodoInput component
```
export default function TodoInput() {
    return (
        <div>
            <input />
            <button>Add</button>
            <button>Clear</button>
        </div>
    );
}
```
// 2 - TodoList component
```
export default function TodoList() {
    return (
        <ul>
            <li>Todo Item</li>
            <button>Edit</button>
            <button>Delete</button>
        </ul>
    );
}
```
// 3 - TodoItem component
```
export default function TodoItem() {
    return (
        <li>
            Todo Item
            <button>Edit</button>
            <button>Delete</button>
        </li>
    );
}
```

# MM FE Interview Expected Structure (sketch)

```
export default function todoList() {
  return (
      <div>
        // Card Component
         // HEADER SECTION
         // Add new item
          <div>
             To Do List
             // Button 1: trigger Input 1 display
              <button>+</button>
             // Button 2: 
              <button>...</button>
            // Bulk Action - delete
             // THIS PART IS HIDDEN (show when Button 2 is triggered - should this be a tooltip? If not, a div should appear when hovered, display must stay there to perform the delete all tasks function, perhaps more like hoverable dropdown, refer https://www.w3schools.com/css/tryit.asp?filename=trycss_dropdown_text)
              <div>
                <span>
                // Button 3: delete all tasks
                  <button>X</button>
                  <p>Delete Entire List</p>
                </span>
              </div>
          </div>
        
        // BODY SECTION
            // Always get all tasks from backend and render
          <ul>
              <li>test</li> // Change into input when edit button in clicked
              <input type='checkbox'/>
              <button>...</button>
              // Action - Edit
              <div>
               // THIS PART IS HIDDEN (show when Button 2 is triggered - hoverable dropdown show edit or delete specific)
              <span>
              // Button 4: edit specific tasks
                  <button>O</button>
                  <p>Edit item</p>
              </span>
              <span>
              // Button 5: delete specific tasks
                  <button>O</button>
                  <p>Delete item</p>
              </span>
              </div>
          </ul>

          // THIS PART IS HIDDEN (show when Button 1 is triggered)
          <div> 
            <form>
                // Input 1: triggered by Button 1
                <input placeholder="What needs to be done?"/>
                <div>
                  <button>Create</button>
                  <button>Cancel</button>
                </div>
            </form>
          </div>
          // Footer Component
          <span>Don't miss out on important tasks anymore</span>
      </div>
      
  )
}
```

# State Management

# Event Handling

# Styling
Components
    - Material UI
        - reusable card https://www.youtube.com/watch?v=rlPkrWjtlw4&list=PLDxCaNaYIuUlG5ZqoQzFE27CUOoQvOqnQ&index=5
        and https://mui.com/material-ui/react-card/
        - checkbox https://mui.com/material-ui/react-checkbox/
        - input https://mui.com/material-ui/react-text-field/ (how to change the colour of the input outline? refer https://mui.com/material-ui/react-text-field/)
        - button (plus button and threedots https://mui.com/material-ui/icons/)
                // plus button 
                ```
                    import * as React from 'react';
                    import Stack from '@mui/material/Stack';
                    import { createSvgIcon } from '@mui/material/utils';
                    import { styled } from '@mui/material/styles';

                    const HomeIcon = createSvgIcon(
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
                    'Home',
                    );

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

                    // Styled component for the round container
                    const RoundIconContainer = styled('div')(({ theme }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 48, // Adjust size as needed
                    height: 48, // Adjust size as needed
                    borderRadius: '60%',
                    backgroundColor: '#fff', // White background
                    border: `4px solid skyblue`, // Primary color border
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional shadow for better visibility
                    }));

                    export default function CreateSvgIcon() {
                    return (
                        <Stack direction="row" spacing={3}>
                        <HomeIcon />
                        <HomeIcon color="primary" />
                        <RoundIconContainer>
                            <PlusIcon />
                        </RoundIconContainer>
                        <RoundIconContainer>
                            <PlusIcon color="primary" />
                        </RoundIconContainer>
                        </Stack>
                    );
                    }

                ```

Steps in beautifying this app:
Installation
npm install @mui/material @emotion/react @emotion/styled

Check Dependencies!

Fonts? Material UI or Google Web Fonts

Icons

How to start? After installation, import like this

```
import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonUsage() {
  return <Button variant="contained">Hello world</Button>;
}
```

Optional: Dashboard with graphs and table (https://mui.com/material-ui/getting-started/templates/dashboard/)

Inspiration: https://mui.com/store/previews/soft-ui-pro-dashboard/

# Relationship (props, states, usetate, usecontext, ref, useEffect)

todoApp
    todoCard
        Box
            Card
                CardContent
                    Box
                        Typography
                        Box
                            CreateTaskIcon (on click show Create Task Section)
                            DropdownButton
                CardContent
                        Typography
                        Box
                            Checkbox
                            DropdownButton
                Box (Create Task Section)
                    CardActions
                        Input
                        BasicButtons
                Box
                Box
                    Copyright

Scrollable component:
npm install react-window (use FixedSizeList)



# React Component Structure

## todoApp
- ### todoCard
  - **Box**
    - **Card**
      - #### CardContent (First Section)
        - **Box**
          - **Typography** (Text, e.g., title or header)
          - **Box**
            - **CreateTaskIcon**
              - On click: Toggles the visibility of the **Create Task Section** (default: hidden)
            - **DropdownButton**
              - On click: Triggers a dropdown menu with options, such as "delete entire task"
              - Also toggles the visibility of the **Create Task Section** (if needed)
      - #### CardContent (Second Section)
        - **Typography** (Text, e.g., task description)
        - **Box**
          - **Checkbox** (Marks task as completed)
          - **DropdownButton** (Additional task-related options)
      - #### Box (Create Task Section) *(Default: hidden)*
        - **CardActions**
          - **Input** (Field to type a new task)
          - **BasicButtons** (Submit new task)
      - **Box** (Additional content/layout purposes)
      - **Box**
        - **Copyright** (Displays copyright information)

# Testing

reactivity 
plus button > SECTION 1: show/hide input-create btn-cancel btn
dotted hamburgen > show options (only handle open/close now), I want to know which option I choose, how to log it out? 

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

when i type, 1. log out input, 2. enable create button.
Need 2 event handler... enter on input will create task, then clear input

when edit option inside DropdownButton is click, it should change {task.title} inside Row into  <Input ref={inputRef} value={task} onChange = {(e) => setTask(e.target.value)} onKeyDown={handleKeyDown} type="text" color={borderColor} prop={'What needs to be done?'}/>

Step 1: Make a function for handling Edit input
Step 2; Pass the Edit input function as a prop to DropdownButton
Step 3: Pass onEdit argument into DropdownButton
Step 4: Use onEdit function in the swtich options 
Step 5: make a ternary toggling for Row to show edit input or just task.title

Edit Input Problem:
It shouldn't stop focusing when keydown.
After enter keydown and put resquest is success, the task.title should change immediately, 

# ENV set up

# INTEGRATE REST-API
npm install axios


