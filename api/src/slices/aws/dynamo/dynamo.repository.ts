import { Injectable, OnModuleInit } from '@nestjs/common';
import * as dynamoose from 'dynamoose';
import { Item } from 'dynamoose/dist/Item';
import { SortOrder } from 'dynamoose/dist/General';

// Configuration for AWS DynamoDB or Local
@Injectable()
export class DynamoRepository implements OnModuleInit {
  private table;
  onModuleInit() {
    // Assuming you have NODE_ENV set to 'development' for local development
    if (process.env.DYNAMO_ENDPOINT) {
      // Configure Dynamoose to use your local DynamoDB instance
      dynamoose.aws.ddb.local(process.env.DYNAMO_ENDPOINT); // Default local DynamoDB URL
    } else {
      if (process.env.DYNAMO_REGION === undefined) throw new Error('DYNAMO_REGION is not defined');
      // For production, use the AWS configuration
      // Ensure AWS credentials are set in your environment or through other AWS SDK configuration methods
      const ddb = new dynamoose.aws.ddb.DynamoDB({
        region: process.env.DYNAMO_REGION,
      });

      // Set DynamoDB instance to the Dynamoose DDB instance
      dynamoose.aws.ddb.set(ddb);
    }

    this.table = process.env.DYNAMO_TABLE;
  }

  model<T>(name?: string, schema?: any) {
    return dynamoose.model<ItemData<T>>(name ?? this.table, schema ?? this.toSchema());
  }

  async create<T>(data: any, name?: string, schema?: any) {
    const model = dynamoose.model<ItemData<T>>(name ?? this.table, schema ?? this.toSchema());
    return await model.create(data);
  }

  async update<T>(data: any, name?: string, schema?: any) {
    const model = dynamoose.model<ItemData<T>>(name ?? this.table, schema ?? this.toSchema());
    return await model.update(data);
  }

  async findAll<T>(name?: string, schema?: any) {
    const model = dynamoose.model<ItemData<T>>(name ?? this.table, schema ?? this.toSchema());
    const result = await model.scan().exec();
    return result;
  }

  async listByPK<T>(pk: string, name?: string, schema?: any) {
    const model = dynamoose.model<ItemData<T>>(name ?? this.table, schema ?? this.toSchema());
    return await model.query('pk').eq(pk).sort(SortOrder.ascending).exec();
  }

  async listByGSI1PK<T>(gsi1pk: string, name?: string, schema?: any) {
    const model = dynamoose.model<ItemData<T>>(name ?? this.table, schema ?? this.toSchema());
    return await model.query('gsi1pk').eq(gsi1pk).sort('descending').exec();
  }

  async findByKey<T>(pk: string, sk: string, name?: string, schema?: any) {
    const model = dynamoose.model<ItemData<T>>(name ?? this.table, schema ?? this.toSchema());
    return await model.get({ pk, sk });
  }

  async delete<T>(id: string, name?: string, schema?: any) {
    const model = dynamoose.model<ItemData<T>>(name ?? this.table, schema ?? this.toSchema());
    return await model.delete(id);
  }

  async batchDelete<T>(ids: string[], name?: string, schema?: any) {
    const model = dynamoose.model<ItemData<T>>(name ?? this.table, schema ?? this.toSchema());
    return await model.batchDelete(ids);
  }

  toSchema() {
    return new dynamoose.Schema(
      {
        pk: {
          type: String,
          hashKey: true,
        },
        sk: {
          type: String,
          rangeKey: true,
        },
        gsi1pk: {
          type: String,
          index: {
            type: 'global', // Global Secondary Index
            name: 'gsi1pkIndex', // Match Terraform configuration
            rangeKey: 'gsi1sk', // Specify gsi1sk as the range key for this GSI
            project: true, // Project all attributes
          },
        },
        gsi1sk: {
          type: String, // Defined as the range key for gsi1pkIndex
        },
        status: {
          type: String,
        },
        data: {
          type: Object,
          required: true,
        },
      },
      {
        saveUnknown: true,
        timestamps: {
          createdAt: {
            createdAt: {
              type: {
                value: Date,
                settings: {
                  storage: 'iso',
                },
              },
            },
          },
          updatedAt: {
            updatedAt: {
              type: {
                value: Date,
                settings: {
                  storage: 'iso',
                },
              },
            },
          },
        },
      },
    );
  }
}

export class ItemData<T> extends Item {
  pk: string;
  sk: string;
  gsi1pk: string;
  gsi1sk: string;
  data: T;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
