import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor, ErrorHandlingInterceptor } from '#/core';
import { createProxyMiddleware } from 'http-proxy-middleware';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new ErrorHandlingInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enable automatic transformation
      whitelist: true,
      //DO NOT USE EVER!
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    }),
  );

  if (!!process.env.S3_ENDPOINT) {
    //Allows access to files on S3 bucket through a proxy middleware. Set CORS_ENDPOINT
    app.use(
      '/cors-proxy',
      createProxyMiddleware({
        target: process.env.S3_ENDPOINT, // target host with the same base path
        changeOrigin: true, // needed for virtual hosted sites
        pathRewrite: { '^/cors-proxy': '' },
      }),
    );
  }
  app.useGlobalInterceptors(new ResponseInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Swagger API')
    .setVersion('1.0')
    .addTag('api')
    .addServer('/')
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'defaultBearerAuth',
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'api-key',
        in: 'header',
        description: 'API Key Authorization',
      },
      'api-key', // This is the name that will be displayed in Swagger UI
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Keeps authorization active
    },
  });
  // Important! Create a swagger spec file for Code Generator, which is used in the frontend.
  fs.writeFileSync('swagger-spec.json', JSON.stringify(document));

  console.log(process.env.PORT ?? 3333);
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
