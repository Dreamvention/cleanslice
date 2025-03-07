import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { configure } from '@codegenie/serverless-express';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express';
import { ResponseInterceptor, ErrorHandlingInterceptor } from '#/core';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';
import { Callback, Context, Handler } from 'aws-lambda';
import { ReplaySubject, firstValueFrom } from 'rxjs';
import { Reflector } from '@nestjs/core';

global['fetch'] = require('node-fetch');

// let server: any;
const serverSubject = new ReplaySubject<Handler>();

async function bootstrap(): Promise<Handler> {
  console.log('COLD START: Initializing Nest');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ErrorHandlingInterceptor());
  app.enableCors();
  // app.setGlobalPrefix('v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Removes any properties not defined in the DTO
      transform: true, // Enable automatic transformation
      //DO NOT USE EVER!
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  );

  const config = new DocumentBuilder().setTitle('Swagger API').setVersion('1.0').addTag('api').addServer('/v1').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  });
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  return configure({ app: expressApp });
}

//Do not wait for lambdaHandler to be called before bootstraping Nest.
//Pass the result of bootstrap() into the ReplaySubject
bootstrap().then((server) => serverSubject.next(server));

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  //Convert the ReplaySubject to a Promise.
  //Wait for bootstrap to finish, then start handling requests.
  const server = await firstValueFrom(serverSubject);
  return server(event, context, callback);
};

// export const handler: any = async (event: any, context: any, callback: any) => {
//   server = server ?? (await bootstrap());
//   return server(event, context, callback);
// };
