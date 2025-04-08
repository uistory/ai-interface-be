// src/config/configuration.ts
export default () => ({
  openAi: {
    apiKey: process.env.OPEN_AI_API_KEY,
    embeddingModel: process.env.EMBEDDING_MODEL || 'text-embedding-3-large',
    gptModel: process.env.GPT_MODEL || 'gpt-4o-mini',
    maxTokens: parseInt(process.env.MAX_TOKENS || '2000', 10),
    temperature: parseFloat(process.env.TEMPERATURE || '0.7'),
  },
  aiModel: {
    type: process.env.AI_MODEL_TYPE || 'openai',
  },
});
