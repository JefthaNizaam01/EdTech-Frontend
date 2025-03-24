import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import api from '../api/axios';

function CourseForm({ userToken, onCourseCreated }) {
  const [CourseName, setCourseName] = useState('');
  const [CourseDescription, setCourseDescription] = useState('');
  const [CoursePrice, setCoursePrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!CourseName.trim() || !CourseDescription.trim() || !CoursePrice) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(
        '/courses',
        {
          data: {
            CourseName,
            CourseDescription,
            CoursePrice: parseFloat(CoursePrice) || 0,
          },
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      console.log('Created Course:', res.data); 

 
      onCourseCreated();

      setCourseName('');
      setCourseDescription('');
      setCoursePrice('');
    } catch (err) {
      console.error(
        'Error creating course:',
        err.response ? err.response.data : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box marginTop={2}>
      <TextField
        label="Course Name"
        fullWidth
        margin="normal"
        value={CourseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <TextField
        label="Course Description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={CourseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
      />
      <TextField
        label="Course Price (R)"
        fullWidth
        margin="normal"
        type="number"
        value={CoursePrice}
        onChange={(e) => setCoursePrice(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? 'Saving...' : 'Save Course'}
      </Button>
    </Box>
  );
}

export default CourseForm;
