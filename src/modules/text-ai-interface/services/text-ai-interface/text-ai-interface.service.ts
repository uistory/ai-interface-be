import { Injectable } from '@nestjs/common';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import 'dotenv/config';

@Injectable()
export class TextAiInterfaceService {
  public EMBEDDING_MODEL = 'text-embedding-3-large';
  public GPT_MODEL = 'gpt-4o-mini';
  public CONTEXT_FILE_PATH = './context/client.txt';
  public HISTORY_KEY = 'history';
  public USER_QUERY_KEY = 'input';

  getChatOpenAI = (): ChatOpenAI => {
    // Replace this comment with the implementation.
    return new ChatOpenAI({
      apiKey: process.env.OPEN_AI_API_KEY,
      model: this.GPT_MODEL,
      maxTokens: 2000,
      temperature: 0.7,
    });
  };

  getPromptTemplate = (): ChatPromptTemplate => {
    // Replace this comment with the implementation.
    return ChatPromptTemplate.fromMessages([
      [
        'system',
        'You are a dedicated health assistant tasked with providing tailored advice on nutrition, exercises, and general health. Each response should be a direct recommendation that is relevant and specific to the provided context: {context}. Focus solely on delivering actionable advice without additional commentary.',
      ],
      new MessagesPlaceholder('history'),
      ['user', '{input}'],
    ]);
  };

  getSimpleChain = async (prompt: string) => {
    const systemTemplate =
      'You are a helpful assistant that suggests recipes based on the given ingredients. Respond with a list of possible recipes.';
    const parser = new StringOutputParser();
    const model = this.getChatOpenAI(); // Get the GPT model.
    // Adjust the prompt to ensure the AI returns a valid recipe JSON
    const recipePrompt = `Given the following ingredients: {ingredients}, provide an array of 3 recipes. Single recipe must be in the following JSON format:
    {{
      "id": 1,  // A unique numeric identifier for the recipe
      "name": "Chicken Pasta with Tomato Sauce",  // The name of the recipe
      "image": "https://example.com/chicken-pasta.jpg",  // A URL to an image of the dish
      "calories": 550,  // The number of calories per serving
      "prepTime": 30,  // Preparation time in minutes
      "allergens": ["Gluten"],  // List of allergens (e.g., gluten)
      "rating": 4.7,  // Average rating out of 5
      "nutriScore": "B",  // Nutritional score (e.g., A, B, C)
      "tasteProfile": ["Savory", "Umami"],  // Taste profile of the dish
      "ingredients": ["Chicken breast", "Pasta", "Tomatoes", "Garlic", "Olive oil"],  // List of ingredients
      "instructions": [
        "Cook the pasta according to package instructions.",
        "Dice chicken, cook it with olive oil and garlic.",
        "Add tomatoes and cook until a sauce forms.",
        "Combine pasta with sauce and serve."
      ]  // Instructions for preparing the dish
    }}
    Ensure that all fields are included and formatted correctly. The response must be a valid JSON object.`;

    // const promptTemplate = ChatPromptTemplate.fromMessages([
    //   ['system', systemTemplate],
    //   ['user', recipePrompt],
    // ]);
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      ['user', recipePrompt],
    ]);
    const chain = promptTemplate.pipe(model).pipe(parser);
    //const result = await chain.invoke({ ingredients: ingredients });
    const result = await chain.invoke({ ingredients: prompt });

    return result;
  };

  public getAiResponse = async (prompt: string): Promise<string> => {
    const result = await this.getSimpleChain(prompt);
    return result;
  };
}
