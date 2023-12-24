import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import 'reflect-metadata';

global['fetch'] = require('node-fetch');

let server: any;

async function bootstrap(): Promise<any> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Mobiflor')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth()
    // .addServer('/dev')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  });
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();

  return serverlessExpress({ app: expressApp });
}

export const handler: any = async (event: any, context: any, callback: any) => {
  // if (event.path === '/api') {
  //   event.path = '/api/';
  // }
  // event.path = event.path.includes('swagger-ui')
  //   ? `/api${event.path}`
  //   : event.path;
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
