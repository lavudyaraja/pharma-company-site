import express from "express";
import cors from "cors";
import { getTabletsHandler, getTabletByIdHandler, createTabletHandler, updateTabletHandler, deleteTabletHandler } from "../src/integrations/neon/api/tablets.ts";

const app = express();
app.use(cors());
app.use(express.json());

// Get all tablets
app.get("/api/tablets", async (req, res) => {
  const result = await getTabletsHandler();
  res.status(result.status).json(result.body);
});

// Get tablet by ID
app.get("/api/tablets/:id", async (req, res) => {
  const result = await getTabletByIdHandler(req.params.id);
  res.status(result.status).json(result.body);
});

// Create new tablet
app.post("/api/tablets", async (req, res) => {
  const result = await createTabletHandler(req.body);
  res.status(result.status).json(result.body);
});

// Update tablet
app.put("/api/tablets/:id", async (req, res) => {
  const result = await updateTabletHandler(req.params.id, req.body);
  res.status(result.status).json(result.body);
});

// Delete tablet
app.delete("/api/tablets/:id", async (req, res) => {
  const result = await deleteTabletHandler(req.params.id);
  res.status(result.status);
  if (result.body && Object.keys(result.body).length > 0) {
    res.json(result.body);
  } else {
    res.end();
  }
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
