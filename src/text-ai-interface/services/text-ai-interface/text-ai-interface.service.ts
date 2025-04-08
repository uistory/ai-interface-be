import { Injectable } from '@nestjs/common';
import { StringOutputParser } from '@langchain/core/output_parsers';
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from '@langchain/core/prompts';
import {
  Runnable,
  RunnableWithMessageHistory,
} from '@langchain/core/runnables';
import { ChatMessageHistory } from '@langchain/community/stores/message/in_memory';
import {
  AzureChatOpenAI,
  AzureOpenAIEmbeddings,
  OpenAIEmbeddings,
} from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import 'dotenv/config';
import { ChatPromptValueInterface } from '@langchain/core/prompt_values';
import { BaseMessage } from '@langchain/core/messages';

@Injectable()
export class TextAiInterfaceService {
  public EMBEDDING_MODEL = 'text-embedding-3-large';
  public GPT_MODEL = 'gpt-4-turbo-preview';
  public CONTEXT_FILE_PATH = './context/client.txt';
  public HISTORY_KEY = 'history';
  public USER_QUERY_KEY = 'input';

  // Initialize Pinecone client and index.
  // Ensure that the API key and index name are set as environment variables.
  public pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string, // Access Pinecone API key from .env.
  });
  public pineconeIndex = this.pinecone.Index(
    process.env.PINECONE_INDEX_NAME as string,
  ); // Replace with your index name.

  getEmbeddingModel = (): OpenAIEmbeddings => {
    // Replace this comment with the implementation.

    return new AzureOpenAIEmbeddings({
      model: 'text-embedding-ada-002',
      azureOpenAIApiKey: process.env.DIAL_API_KEY,
      azureOpenAIBasePath: 'https://ai-proxy.lab.epam.com',
      azureOpenAIApiDeploymentName: 'openai/deployments/text-embedding-ada-002',
      azureOpenAIApiVersion: '2023-12-01-preview',
    });
  };

  getChatOpenAI = (): AzureChatOpenAI => {
    // Replace this comment with the implementation.
    return new AzureChatOpenAI({
      model: this.GPT_MODEL,
      maxTokens: 2000,
      temperature: 0.7,
      azureOpenAIApiKey: process.env.DIAL_API_KEY,
      azureOpenAIBasePath: 'https://ai-proxy.lab.epam.com',
      azureOpenAIApiDeploymentName: 'openai/deployments/gpt-4o-2024-11-20',
      azureOpenAIApiVersion: '2023-12-01-preview',
    });
  };

  retrieveContextFromPinecone = async (): Promise<string> => {
    // Replace this comment with the implementation.
    const embeddings = this.getEmbeddingModel();
    const pineconeIndex = this.pineconeIndex;
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
    });
    const results = await vectorStore.similaritySearch('John Doe', 1, {
      source: './src/client.txt',
    });
    return results.map((document) => document.pageContent).join('\n');
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

  getChainWithHistory = () => {
    // Replace this comment with the implementation.
    const messageHistory = new ChatMessageHistory();
    const chatModel = this.getChatOpenAI();
    const prompt = this.getPromptTemplate();
    return new RunnableWithMessageHistory({
      runnable: prompt.pipe(chatModel).pipe(new StringOutputParser()),
      inputMessagesKey: 'input',
      historyMessagesKey: 'history',
      getMessageHistory: (_sessionId) => messageHistory,
    });
  };

  // getSimpleChain = async (prompt: string) => {
  //   // We can directly return a runnable that pipes the prompt to the model.
  //   const systemTemplate = 'Translate the following into {language}:';
  //   const parser = new StringOutputParser();
  //   const model = this.getChatOpenAI(); // Get the GPT model.

  //   const promptTemplate = ChatPromptTemplate.fromMessages([
  //     ['system', systemTemplate],
  //     ['user', '{text}'],
  //   ]);
  //   const chain = promptTemplate.pipe(model).pipe(parser);
  //   const result = await chain.invoke({ language: 'italian', text: 'hi' });
  //   return result;
  // };

  getSimpleChain = async (ingredients: string) => {
    const systemTemplate =
      'You are a helpful assistant that suggests recipes based on the given ingredients. Respond with a list of possible recipes.';
    const parser = new StringOutputParser();
    const model = this.getChatOpenAI(); // Get the GPT model.

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      [
        'user',
        `Given the following ingredients: ${ingredients}, provide a list of 5 recipes that can be made:`,
      ],
    ]);
    const chain = promptTemplate.pipe(model).pipe(parser);
    const result = await chain.invoke({ ingredients });
    return result;
  };

  public getAiResponse = async (prompt: string): Promise<string> => {
    const result = await this.getSimpleChain(prompt);
    return result;
  };
}
