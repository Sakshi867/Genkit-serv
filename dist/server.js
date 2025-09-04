"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const wasteCategorization_1 = require("./ai/flows/wasteCategorization");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "10mb" }));
// API route
app.post("/categorize", async (req, res) => {
    try {
        const result = await (0, wasteCategorization_1.categorizeWaste)(req.body);
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Genkit server running on port ${PORT}`));
