"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorizeWaste = categorizeWaste;
const genkit_1 = require("../genkit");
const genkit_2 = require("genkit");
const CategorizeWasteInputSchema = genkit_2.z.object({
    photoDataUri: genkit_2.z.string().describe("Image of waste as a Base64 data URI"),
    description: genkit_2.z.string().describe("Short description of the waste"),
});
const CategorizeWasteOutputSchema = genkit_2.z.object({
    category: genkit_2.z.string().describe("Waste category"),
    suitability: genkit_2.z.string().describe("How this waste can be reused"),
});
async function categorizeWaste(input) {
    const prompt = genkit_1.ai.definePrompt({
        name: "categorizeWastePrompt",
        input: { schema: CategorizeWasteInputSchema },
        output: { schema: CategorizeWasteOutputSchema },
        prompt: `You are an expert in agricultural waste categorization.

Description: {{{description}}}
Photo: {{media url=photoDataUri}}

Identify the waste category and describe its suitability.`,
    });
    const { output } = await prompt(input);
    return output;
}
