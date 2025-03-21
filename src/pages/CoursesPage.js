import { useState, useEffect } from 'react';
import { Container, Typography, Button } from '@mui/material';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';
import api from '../api/axios';

function CoursesPage({ userToken }) {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);

 const fetchCourses = async () => {
  try {
    if (!userToken) return;
    const res = await api.get('/courses?populate=*', {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    console.log('Fetched courses:', res.data.data); // Add this line
    setCourses(res.data.data);
  } catch (err) {
    console.error('Error fetching courses:', err);
  }
};

  useEffect(() => {
    if (userToken) fetchCourses();
  }, [userToken]); // depend on userToken to avoid warning!

  const handleCourseCreated = () => {
    fetchCourses();
    setShowForm(false);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>My Courses</Typography>
      <Button variant="contained" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Create New Course'}
      </Button>
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
