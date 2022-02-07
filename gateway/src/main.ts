import { BaseHttpExceptionFilter } from "./../shared/exception-filter/base-http-exception-filter";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("🚀NetGuru Task🚀")
    .setDescription("NetGuru task requirements")
    .setVersion("1.0")
    .addTag("movies", "movies routes")
    .addTag("auth", "authentication route")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
    })
  );
  SwaggerModule.setup("api", app, document);
  await app.listen(4000);
}
bootstrap();
