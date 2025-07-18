import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  Divider,
} from '@mui/material';

const AdminDashboard = () => {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/uploads/all');
        setUploads(res.data);
      } catch (error) {
        console.error('Failed to fetch uploads:', error);
      }
    };
    fetchUploads();
  }, []);

  const teams = ['TEAM A', 'TEAM B', 'TEAM C', 'TEAM D', 'TEAM E'];

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      {teams.map((team) => (
        <Box key={team} mb={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {team}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            {uploads
              .filter((u) => u.team === team)
              .map((item, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.imageUrl}
                      alt={`Image from ${team}`}
                    />
                    <CardContent>
                      <Typography variant="body2" fontWeight="bold">
                        {item.prompt}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default AdminDashboard;
