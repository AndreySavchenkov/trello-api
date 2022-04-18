import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder()
    .setTitle('Trello')
    .setDescription('The trello API description')
    .setVersion('1.0.0')
    .addBearerAuth()
    // .setBasePath('http://localhost:5000')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
}
bootstrap();
