import { ai } from "../genkit";
import { z } from "genkit";

// Input schema: description + image (Base64)
const CategorizeWasteInputSchema = z.object({
  photoDataUri: z.string().describe("Image of waste as a Base64 data URI"),
  description: z.string().describe("Short description of the waste"),
});

// Output schema: category + suitability
const CategorizeWasteOutputSchema = z.object({
  category: z.string().describe("Waste category"),
  suitability: z.string().describe("How this waste can be reused"),
});

export async function categorizeWaste(input: z.infer<typeof CategorizeWasteInputSchema>) {
  try {
    // Clean Base64 (remove data URI prefix if present)
    const cleanBase64 = input.photoDataUri.replace(/^data:image\/\w+;base64,/, "");

    // Generate response using Gemini model
    const response = await ai.generate({
      model: "googleai/gemini-2.5-flash",
      input: {
        description: input.description,
        photoDataUri: cleanBase64
      },
      output: { schema: CategorizeWasteOutputSchema },
      prompt: `You are an expert in agricultural waste categorization.

Description: ${input.description}
The user has provided an image of the waste in Base64 format.

Identify:
1. Waste category
2. How this waste can be reused (suitability).`
    });

    return response.output;

  } catch (error: any) {
    console.error("❌ Error in categorizeWaste:", error.message || error);
    throw new Error("Failed to categorize waste. Please try again.");
  }
}
