import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Input,
  Paper,
} from "@mui/material";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  const team = localStorage.getItem("team");
 

  if (!team || team === "null") {
    alert("Team not found in localStorage. Please log in again.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("prompt", prompt);
  formData.append("team", team);

  try {
    const response = await axios.post("http://localhost:5000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
   
     alert("Upload successful");
    console.log("Upload successful", response.data);
    window.location.reload();
  } catch (error) {
    console.error("Upload error:", error);
  }
};


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 6 }}>
        <Typography variant="h5" gutterBottom align="center">
          Submit Image & Prompt
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            fullWidth
            disableUnderline
            sx={{ mb: 2 }}
          />
          <TextField
            label="Prompt"
            multiline
            rows={4}
            fullWidth
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" type="submit" fullWidth>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;
