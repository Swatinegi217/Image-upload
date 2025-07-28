import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  Divider,
  Checkbox,
  Button,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import PptxGenJS from "pptxgenjs";

const AdminDashboard = () => {
  const [uploads, setUploads] = useState([]);
  const [expandedPrompts, setExpandedPrompts] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("ALL");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/uploads/all");
        setUploads(res.data);
      } catch (error) {
        console.error("Failed to fetch uploads:", error);
      }
    };
    fetchUploads();
  }, []);

  const togglePrompt = (id) => {
    setExpandedPrompts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleZipDownload = async () => {
    const zip = new JSZip();
    const selectedUploads = uploads.filter((u) => selectedItems.includes(u._id));

    for (let item of selectedUploads) {
      const response = await fetch(`http://localhost:5000${item.imageUrl}`);
      const blob = await response.blob();
      zip.file(`${item.prompt.slice(0, 15)}.jpg`, blob);
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
  };

  const handlePPTDownload = async () => {
    const pptx = new PptxGenJS();
    const selectedUploads = uploads.filter((u) => selectedItems.includes(u._id));

    for (let item of selectedUploads) {
      const slide = pptx.addSlide();
      slide.addImage({
        data: await toBase64(`http://localhost:5000${item.imageUrl}`),
        x: 1,
        y: 1,
        w: 6,
        h: 4,
      });
      slide.addText(item.prompt, { x: 1, y: 5, w: 8 });
    }

    pptx.writeFile("images.pptx");
  };

  const toBase64 = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const handleDeleteSelected = async () => {
    try {
      await axios.post("http://localhost:5000/api/uploads/delete", {
        ids: selectedItems,
      });
      setUploads((prev) => prev.filter((u) => !selectedItems.includes(u._id)));
      setSelectedItems([]);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const teams = ["TEAM A", "TEAM B", "TEAM C", "TEAM D", "TEAM E"];

  const filteredUploads = uploads.filter((u) => {
    const teamMatch = selectedTeam === "ALL" || u.team === selectedTeam;
    const searchMatch = u.prompt.toLowerCase().includes(searchText.toLowerCase());
    return teamMatch && searchMatch;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <Box display="flex" flexWrap="wrap" gap={2} mb={3}>
        <Select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
          <MenuItem value="ALL">All Teams</MenuItem>
          {teams.map((team) => (
            <MenuItem key={team} value={team}>
              {team}
            </MenuItem>
          ))}
        </Select>

        <TextField
          placeholder="Search prompt..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleZipDownload}
          disabled={selectedItems.length === 0}
        >
          Download ZIP
        </Button>

        <Button
          variant="contained"
          onClick={handlePPTDownload}
          disabled={selectedItems.length === 0}
        >
          Export PPT
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={handleDeleteSelected}
          disabled={selectedItems.length === 0}
        >
          Delete Selected
        </Button>
      </Box>

      {teams
        .filter((team) => selectedTeam === "ALL" || selectedTeam === team)
        .map((team) => (
          <Box key={team} mb={6}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {team}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              {filteredUploads
                .filter((u) => u.team === team)
                .map((item) => {
                  const isLong = item.prompt.length > 100;
                  const isExpanded = expandedPrompts[item._id];
                  const displayText =
                    isExpanded || !isLong ? item.prompt : item.prompt.slice(0, 50) + "...";

                  return (
                    <Grid item xs={12} sm={6} md={3} key={item._id}>
                      <Card
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          overflow: "hidden",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={`http://localhost:5000${item.imageUrl}`}
                          alt={`Image from ${team}`}
                          sx={{
                            height: 180,
                            width: "100%",
                            objectFit: "cover",
                            borderBottom: "1px solid #ccc",
                          }}
                        />
                        <CardContent sx={{ padding: 1 }}>
                          <Box display="flex" alignItems="flex-start" gap={1}>
                            <Checkbox
                              checked={selectedItems.includes(item._id)}
                              onChange={() => handleSelect(item._id)}
                              size="small"
                            />
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              sx={{
                                wordWrap: "break-word",
                                whiteSpace: "pre-wrap",
                                fontSize: "0.85rem",
                                maxHeight: 80,
                              }}
                            >
                              {displayText}
                              {isLong && (
                                <span
                                  style={{
                                    color: "blue",
                                    cursor: "pointer",
                                    marginLeft: 6,
                                  }}
                                  onClick={() => togglePrompt(item._id)}
                                >
                                  {isExpanded ? " Read less" : " Read more"}
                                </span>
                              )}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
        ))}
    </Container>
  );
};

export default AdminDashboard;
