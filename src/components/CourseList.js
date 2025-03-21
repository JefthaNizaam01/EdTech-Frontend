import { Card, CardContent, Typography, Grid } from '@mui/material';

function CourseList({ courses }) {
  return (
    <Grid container spacing={2} marginTop={2}>
      {courses?.map((course) => (
        <Grid item xs={12} sm={6} md={4} key={course.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                {course.CourseName || 'Course Name'}
              </Typography>
              <Typography>
                {course.CourseDescription || 'No description available'}
              </Typography>
              <Typography>
                Price: R{course.CoursePrice?.toFixed(2) || '0.00'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default CourseList;
