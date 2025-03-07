import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

// Configuration for AWS DynamoDB or Local
@Injectable()
export class OpensearchRepository implements OnModuleInit {
  public client: Client;
  onModuleInit() {
    // Assuming you have NODE_ENV set to 'development' for local development
    this.client = new Client({
      ...AwsSigv4Signer({
        region: process.env.AWS_REGION,
        service: 'es', // 'aoss' for OpenSearch Serverless
        // Must return a Promise that resolve to an AWS.Credentials object.
        // This function is used to acquire the credentials when the client start and
        // when the credentials are expired.
        // The Client will treat the Credentials as expired if within
        // `requestTimeout` ms of expiration (default is 30000 ms).

        // Example with AWS SDK V3:
        getCredentials: () => {
          // Any other method to acquire a new Credentials object can be used.
          const credentialsProvider = defaultProvider();
          return credentialsProvider();
        },
      }),
      requestTimeout: 120000,
      nodes: [process.env.OPENSEARCH_URL ?? 'http://127.0.0.1:9200'],
    });
  }

  async checkIndexExists(indexName: string): Promise<boolean> {
    try {
      // Check if the index exists
      const { body: exists } = await this.client.indices.exists({ index: indexName });

      if (exists) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(`An error occurred while checking if index "${indexName}" exists:`, error);
      return false;
    }
  }

  async checkIndexWrite(indexName: string) {
    try {
      const { body: indexSettings } = await this.client.indices.getSettings({
        index: indexName,
        name: '*',
      });
      const isReadOnly = indexSettings[indexName].settings.index.blocks?.write === 'true';

      if (isReadOnly) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('OpenSearch Error:', error);
    }
  }

  async countRecords(indexName: string): Promise<number> {
    try {
      // Use the count API to count the number of records in the specified index
      const { body } = await this.client.count({ index: indexName });

      return body.count;
    } catch (error) {
      console.error(`An error occurred while counting records in index "${indexName}":`, error);
      return 0;
    }
  }
}
