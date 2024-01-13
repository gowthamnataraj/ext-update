import React, { useState } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

export const libraries = [
  'Graphic Styles',
  'Brushes',
  'Symbols',
  // ... add other libraries as necessary
];

const LibrariesComponent: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 500); // Reset the active item after the animation duration
  };

  return (
    <List>
      {libraries.map((library, index) => (
        <ListItem 
          key={index} 
          onClick={() => handleItemClick(index)}
          className={activeIndex === index ? 'clicked' : ''}
        >
          <ListItemText primary={library} />
        </ListItem>
      ))}
    </List>
  );
};

export default LibrariesComponent;
