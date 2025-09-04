import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { categorizeWaste } from "./ai/flows/wasteCategorization";

dotenv.config();

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));

// API route
app.post("/categorize", async (req, res) => {
  try {
    const result = await categorizeWaste(req.body);
    res.json(result);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Genkit server running on port ${PORT}`));
 
