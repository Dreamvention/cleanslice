import { Injectable } from '@nestjs/common';
import { InvocationType, InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import * as child_process from 'child_process';
import * as path from 'path';
@Injectable()
export class LambdaRepository {
  client: LambdaClient;
  constructor() {
    this.client = new LambdaClient({});
  }

  async invoke(name: string, payload: Record<string, unknown>) {
    if (!process.env?.LOCAL) {
      await this.client.send(
        new InvokeCommand({
          FunctionName: name,
          InvocationType: InvocationType.Event,
          Payload: Buffer.from(JSON.stringify(payload), 'utf8'),
        }),
      );
    } else {
      if (name === 'sources') {
        const child = child_process.fork(path.resolve(__dirname, '../../../../../sources/handlers/sources'), {
          silent: true,
        });
        child.stdout.on('data', (data) => {
          console.log(data.toString());
        });
        child.stderr.on('data', (data) => {
          console.log(data.toString());
        });
        child.send(payload);
      }
    }
  }
}
