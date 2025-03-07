import {
  BedrockRuntimeClient,
  InvokeModelWithResponseStreamCommand,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { BedrockEmbeddings } from '@langchain/community/embeddings/bedrock';
import { Injectable } from '@nestjs/common';
import { BedrockModels } from './bedrock.types';
import { Bedrock } from '@langchain/community/llms/bedrock';
import { BedrockChat } from '@langchain/community/chat_models/bedrock';

@Injectable()
export class BedrockRepository {
  public client: BedrockRuntimeClient;
  public embeddings: BedrockEmbeddings;
  public clientLC: Bedrock;
  public clientLCSM: Bedrock;
  public clientChat: BedrockChat;

  constructor() {
    //Local env
    this.client = new BedrockRuntimeClient({
      region: process.env.AWS_REGION ?? 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
        sessionToken: process.env.AWS_SESSION_TOKEN,
      },
    });

    this.clientLC = new Bedrock({
      model: BedrockModels.AnthropicClaud2, // You can also do e.g. "anthropic.claude-v2"
      region: process.env.AWS_REGION ?? 'us-east-1',
      // endpointUrl: "custom.amazonaws.com",
      maxTokens: 2000,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
        sessionToken: process.env.AWS_SESSION_TOKEN,
      },
      // modelKwargs: {},
    });

    this.clientLCSM = new Bedrock({
      model: BedrockModels.AnthropicClaud21, // You can also do e.g. "anthropic.claude-v2"
      region: process.env.AWS_REGION ?? 'us-east-1',
      // endpointUrl: "custom.amazonaws.com",
      maxTokens: 500,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
        sessionToken: process.env.AWS_SESSION_TOKEN,
      },
      // modelKwargs: {},
    });

    this.embeddings = new BedrockEmbeddings({
      region: process.env.AWS_REGION! ?? 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
        sessionToken: process.env.AWS_SESSION_TOKEN,
      },
      model: BedrockModels.AmazonTitanEmbedTextV2, // Default value
    });

    this.clientChat = new BedrockChat({
      model: BedrockModels.AnthropicClaud35Sonnet,
      region: process.env.AWS_REGION! ?? 'us-east-1',
      // endpointUrl: "custom.amazonaws.com",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
        sessionToken: process.env.AWS_SESSION_TOKEN,
      },
      // modelKwargs: {
      //   anthropic_version: "bedrock-2023-05-31",
      // },
    });
  }

  async invokeAnthropicWithStream(messages) {
    return await this.client.send(
      new InvokeModelWithResponseStreamCommand({
        modelId: BedrockModels.AnthropicClaud21,
        // modelId: 'meta.llama3-70b-instruct-v1:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          prompt: messages,
          max_tokens_to_sample: 300,
        }),
      }),
    );
  }

  async invokeModelCommand(data: { model: BedrockModels; maxTokens?: number; prompt: string; temperature?: number }) {
    const payload = this.mapInput(data);
    try {
      // Create and send the command
      const command = new InvokeModelCommand({
        contentType: 'application/json',
        body: JSON.stringify(payload),
        modelId: data.model,
      });
      const result = await this.client.send(command);

      // Decode and return the result body
      if (result) {
        const decoder = new TextDecoder('utf-8');
        return this.mapOutput(data.model, JSON.parse(decoder.decode(result.body)));
      }
    } catch (error) {
      console.error('Error invoking model command:', error);
      throw error;
    }
  }

  mapInput(data: { model: BedrockModels; maxTokens?: number; prompt: string; temperature?: number }) {
    if (data.model.startsWith('mistral')) {
      return {
        prompt: `<s>[INST] ${data.prompt} [/INST]`,
        max_tokens: data.maxTokens ?? 300,
        temperature: data.temperature ?? 0.2,
      };
    }

    if (data.model.startsWith('meta')) {
      return {
        prompt: data.prompt,
        max_gen_len: data.maxTokens ?? 300,
        temperature: data.temperature ?? 0.2,
        top_p: 0.9,
      };
    }
    if (data.model.startsWith('anthropic.claude-3')) {
      return {
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: data.prompt,
              },
            ],
          },
        ],
        max_tokens: data.maxTokens ?? 300,
        temperature: data.temperature ?? 0.2,

        anthropic_version: 'bedrock-2023-05-31',
      };
    }
    if (data.model.startsWith('anthropic')) {
      return {
        prompt: `Human:${data.prompt}\\n\\nAssistant:`,
        max_tokens_to_sample: data.maxTokens ?? 300,
        temperature: data.temperature ?? 0.2,
        top_k: 250,
        top_p: 1,
        stop_sequences: [`\\n\\nHuman:`],
        anthropic_version: 'bedrock-2023-05-31',
      };
    }
    if (data.model.startsWith('amazon')) {
      return {
        inferenceConfig: {
          max_new_tokens: data.maxTokens ?? 300,
        },
        messages: [
          {
            role: 'user',
            content: [
              {
                text: data.prompt,
              },
            ],
          },
        ],
      };
    }
  }

  mapOutput(model: BedrockModels, data: any) {
    if (model.startsWith('mistral')) {
      return data.outputs[0].text;
    }

    if (model.startsWith('meta')) {
      return data.generation;
    }

    if (model.startsWith('anthropic.claude-3')) {
      return data.content[0].text;
    }

    if (model.startsWith('anthropic')) {
      return data.completion;
    }

    if (model.startsWith('amazon')) {
      return data.output.message.content[0].text;
    }
  }
}
