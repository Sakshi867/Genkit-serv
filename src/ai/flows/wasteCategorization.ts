import { ai } from "../genkit";
import { z } from "genkit";

const CategorizeWasteInputSchema = z.object({
  photoDataUri: z.string().describe("Image of waste as a Base64 data URI"),
  description: z.string().describe("Short description of the waste"),
});

const CategorizeWasteOutputSchema = z.object({
  category: z.string().describe("Waste category"),
  suitability: z.string().describe("How this waste can be reused"),
});

export async function categorizeWaste(input: z.infer<typeof CategorizeWasteInputSchema>) {
  const prompt = ai.definePrompt({
    name: "categorizeWastePrompt",
    input: { schema: CategorizeWasteInputSchema },
    output: { schema: CategorizeWasteOutputSchema },
    prompt: `You are an expert in agricultural waste categorization.

Description: {{{description}}}
Photo: {{media url=photoDataUri}}

Identify the waste category and describe its suitability.`,
  });

  const { output } = await prompt(input);
  return output!;
}
 
