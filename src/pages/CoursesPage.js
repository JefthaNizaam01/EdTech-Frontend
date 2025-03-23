import { useState, useEffect } from 'react';
import { Container, Typography, Button, Stack } from '@mui/material'; // Added Stack import
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';
import api from '../api/axios';

function CoursesPage({ userToken, onLogout }) {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchCourses = async () => {
    try {
      if (!userToken) return;
      const res = await api.get('/courses?populate=*', {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      console.log('Fetched courses:', res.data.data);
      setCourses(res.data.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  useEffect(() => {
    if (userToken) fetchCourses();
  }, [userToken]);

  const handleCourseCreated = () => {
    fetchCourses();
    setShowForm(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        My Courses
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Create New Course'}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onLogout} // Ensure this function is passed down!
        >
          Logout
        </Button>
      </Stack>

      {showForm && (
        <CourseForm
          userToken={userToken}
          onCourseCreated={handleCourseCreated}
        />
      )}
      <CourseList courses={courses} />
    </Container>
  );
}

export default CoursesPage;
