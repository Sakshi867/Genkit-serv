import { ai } from "../genkit";
import { z } from "genkit";

const CategorizeWasteInputSchema = z.object({
  photoDataUri: z.string().optional().describe("Image of waste as a Base64 data URI"),
  description: z.string().optional().describe("Short description of the waste"),
});

const CategorizeWasteOutputSchema = z.object({
  category: z.string().describe("Waste category"),
  suitability: z.string().describe("How this waste can be reused"),
});

export async function categorizeWaste(input: z.infer<typeof CategorizeWasteInputSchema>) {
  const parts: any[] = [];

  if (input.description) {
    parts.push({ text: `Description: ${input.description}` });
  }

  if (input.photoDataUri) {
    // Remove Base64 prefix if present
    const base64Data = input.photoDataUri.split(",")[1] || input.photoDataUri;

    parts.push({
      inlineData: {
        mimeType: "image/jpeg", // Hardcode JPEG or detect dynamically
        data: base64Data
      }
    });
  }

  const response = await ai.generate({
    model: "googleai/gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts
      }
    ]
  });

  return {
    result: response.outputText
  };
}
