import React, { useState } from 'react';
import { Button, Divider, ThemeProvider, createTheme, Select, MenuItem, InputLabel, FormControl, TextField, SelectChangeEvent } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import ToolsComponent from './ToolsComponent';
import LibrariesComponent from './LibrariesComponent';
import './App.css';

interface Sketch {
  id: number;
  name: string;
  image: string | null; // URL of the image
  croquis: string;
}

const theme = createTheme({
  // ... your theme settings
});

const App: React.FC = () => {
  const [croquis, setCroquis] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [primarySketches, setPrimarySketches] = useState<Sketch[]>([]);
  const [sketchName, setSketchName] = useState('');

  const handleCroquisChange = (event: SelectChangeEvent<string>) => {
    setCroquis(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddPrimarySketch = () => {
    if (sketchName) {
      setPrimarySketches(prevSketches => [
        ...prevSketches,
        { id: Date.now(), name: sketchName, image: imagePreviewUrl, croquis: croquis }
      ]);

      setSketchName('');
      setSelectedImage(null);
      setImagePreviewUrl(null);
      setCroquis('');
    } else {
      console.log('Please enter a sketch name.');
    }
  };

  const handleDeleteSketch = (id: number) => {
    setPrimarySketches(prevSketches => prevSketches.filter(sketch => sketch.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <FormControl fullWidth margin="normal" className="croquis-select">
          <InputLabel id="croquis-label">Select Croquis</InputLabel>
          <Select
            labelId="croquis-label"
            id="croquis-select"
            value={croquis}
            label="Select Croquis"
            onChange={handleCroquisChange}
          >
            <MenuItem value="children">Children</MenuItem>
            <MenuItem value="teens">Teens</MenuItem>
            <MenuItem value="adults">Adults</MenuItem>
            {/* Add more age category sizes as MenuItems here */}
          </Select>
        </FormControl>

        <TextField
          label="Primary Sketch Name"
          value={sketchName}
          onChange={(e) => setSketchName(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />

        <Button
          startIcon={<AddAPhotoIcon />}
          component="label"
          variant="contained"
        >
          Add Image
          <input
            type="file"
            hidden
            onChange={handleImageChange}
          />
        </Button>

        <Button
          variant="contained"
          onClick={handleAddPrimarySketch}
        >
          Add Primary Sketch
        </Button>

        <Divider />
        <section className="tools">
          <ToolsComponent />
        </section>

        <Divider />
        <section className="libraries">
          <LibrariesComponent />
        </section>

        <div className="primary-sketches-list">
          <h3>Primary Sketches</h3>
          {primarySketches.map((sketch, index) => (
            <div key={index} className="sketch-item">
              {sketch.name} - {sketch.croquis || 'No Croquis Selected'}
              {sketch.image && <img src={sketch.image} alt={sketch.name} className="sketch-image" />}
              <Button
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteSketch(sketch.id)}
              >
                Delete



          </Button>
        </div>
      ))}
    </div>
  </div>
</ThemeProvider>

);
};

export default App;