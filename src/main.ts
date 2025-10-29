import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('TLT Ecommerce API')
    .setDescription('TLT Ecommerce API')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Input your JWT token',
      name: 'Authorization',
      in: 'header',
    }, 'bearer')
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  app.enableCors();
  await app.listen(5500);
}
bootstrap();
