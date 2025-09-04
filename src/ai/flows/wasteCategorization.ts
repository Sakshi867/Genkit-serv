import { ai } from "../genkit";
import { z } from "genkit";

// Input schema
const CategorizeWasteInputSchema = z.object({
  photoDataUri: z.string().describe("Image of waste as a Base64 data URI"),
  description: z.string().describe("Short description of the waste"),
});

// Output schema
const CategorizeWasteOutputSchema = z.object({
  category: z.string().describe("Waste category"),
  suitability: z.string().describe("How this waste can be reused"),
});

export async function categorizeWaste(input: z.infer<typeof CategorizeWasteInputSchema>) {
  try {
    // Clean Base64 (remove prefix like data:image/jpeg;base64,)
    const cleanBase64 = input.photoDataUri.replace(/^data:image\/\w+;base64,/, "");

    const response = await ai.generate({
      model: "googleai/gemini-2.5-flash",
      output: { schema: CategorizeWasteOutputSchema },
      messages: [
        {
          role: "user",
          content: [
            { text: Description: ${input.description}. Identify waste category and how it can be reused. },
            {
              media: {
                data: cleanBase64,
                mimeType: "image/jpeg" // or "image/png" based on input
              }
            }
          ]
        }
      ]
    });

    return response.output;

  } catch (error: any) {
    console.error("❌ Error in categorizeWaste:", error.message || error);
    throw new Error("Failed to categorize waste. Please try again.");
  }
}
