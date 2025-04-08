const { ChatPromptTemplate } = require('langchain/prompts');
const { StringOutputParser } = require('langchain/parsers');
const { ChatOpenAI } = require('langchain/chat_models');
const { LLMChain } = require('langchain/chains');

class RecipeGenerator {
  private openAIModel;
  constructor(openAIModel) {
    // Dependency injection: OpenAI model is passed as a dependency
    this.openAIModel = openAIModel;
  }

  getSimpleChain = async (ingredients) => {
    // System instruction for the model to understand the task
    const systemTemplate =
      'You are a helpful assistant that suggests recipes based on the given ingredients. Respond with a list of possible recipes.';

    // Parser to handle the output from the model
    const parser = new StringOutputParser();

    // Create a prompt template using user ingredients as input
    const promptTemplate = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      [
        'user',
        `Given the following ingredients: ${ingredients}, provide a list of recipes that can be made:`,
      ],
    ]);

    // Create the chain to invoke the model and parse the response
    const chain = new LLMChain({
      llm: this.openAIModel,
      prompt: promptTemplate,
      outputParser: parser,
    });

    // Get the result by invoking the chain with the ingredients
    const result = await chain.call({ ingredients });

    return result;
  };
}

// Dependency injection: Instantiate with the OpenAI model
const openAI = new ChatOpenAI({ model: 'gpt-4' }); // This can be replaced with any model or mock for testing
const recipeGen = new RecipeGenerator(openAI);

// Example Usage
recipeGen
  .getSimpleChain('pasta, cottage cheese, tomatoes, garlic, spinach')
  .then((result) => console.log(result))
  .catch((err) => console.error('Error generating recipes:', err));
