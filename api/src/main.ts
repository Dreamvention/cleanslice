import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('CleanSlice API')
    .setVersion('1.0')
    .addTag('cleanslice')
    .addServer('/')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token', // This is the name of the security scheme
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Important! Create a swagger spec file for Code Generator, which is used in the frontend.
  fs.writeFileSync('swagger-spec.json', JSON.stringify(document));
  await app.listen(3333);
}
bootstrap();
