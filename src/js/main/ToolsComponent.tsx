import React, { useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import SymmetryToolIcon from '@mui/icons-material/Gesture';
import SpecToolIcon from '@mui/icons-material/Assessment';
import CalloutsToolIcon from '@mui/icons-material/Announcement';
import ZoomToolIcon from '@mui/icons-material/ZoomIn';

export const tools = [
  { name: 'Symmetry Tool', icon: <SymmetryToolIcon /> },
  { name: 'Spec Tool', icon: <SpecToolIcon /> },
  { name: 'Callouts Tool', icon: <CalloutsToolIcon /> },
  { name: 'Zoom Tool', icon: <ZoomToolIcon /> },
  // ... add other tools as necessary
];

const ToolsComponent: React.FC = () => {
  const [clickedIndex, setClickedIndex] = useState(-1);

  const handleClick = (index) => {
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(-1), 500); // Reset after animation
  };

  return (
    <List>
      {tools.map((tool, index) => (
        <ListItem 
          key={index} 
          onClick={() => handleClick(index)} 
          className={clickedIndex === index ? 'clicked' : ''}
        >
          <ListItemIcon>{tool.icon}</ListItemIcon>
          <ListItemText primary={tool.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default ToolsComponent;
