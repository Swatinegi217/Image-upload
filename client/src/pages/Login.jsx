import { useState } from "react";
import {
Box,
Button,
Container,
TextField,
Typography,
Paper,
Grid,
} from "@mui/material";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const teams = ["TEAM A", "TEAM B", "TEAM C", "TEAM D", "TEAM E", "ADMIN"];

const Login = () => {
const [selectedTeam, setSelectedTeam] = useState("TEAM A");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");


const handleTeamClick = (team) => {
setSelectedTeam(team);
};

const handleLogin = async (e) => {
e.preventDefault();
setError("");  
try {
  const res = await axios.post(`${BACKEND_URL}/api/auth/login`, {
    email,
    password,
  });

  const { token, user } = res.data;
localStorage.setItem('team', user.team); // Correct way
localStorage.setItem('token', token);


  if (user.role === "admin") {
    window.location.href = "/admin";

  } else {
    window.location.href = "/dashboard";
  }
} catch (err) {
  console.error(err); 
  setError("Invalid credentials");
}
};

return (
<Grid container sx={{ minHeight: "100vh", backgroundColor: "#ddd" }}>
{/* Sidebar */}
<Grid
item
xs={12}
md={2}
sx={{
backgroundColor: "#f0f0f0",
p: 2,
display: "flex",
flexDirection: "column",
gap: 1,
}}
>
{teams.map((team) => (
<Button
key={team}
variant={selectedTeam === team ? "contained" : "outlined"}
sx={{
backgroundColor:
selectedTeam === team ? "#ccc" : "transparent",
color: "#000",
fontWeight: "bold",
borderRadius: 0,
borderColor: "#aaa",
}}
onClick={() => handleTeamClick(team)}
>
{team}
</Button>
))}
</Grid>
  {/* Main Content */}
  <Grid
    item
    xs={12}
    md={10}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
      px: 2,
    }}
  >
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        px: 4,
        py: 1,
        mb: 3,
        fontWeight: "bold",
      }}
    >
      {selectedTeam} WORK
    </Box>

    <Paper elevation={3} sx={{ p: 4, minWidth: 300 }}>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
      </form>
    </Paper>
  </Grid>
</Grid>
);
};

export default Login;
