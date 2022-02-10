import { NestFactory } from "@nestjs/core";
import { MoviesModule } from "./movies.module";
import {
  MicroserviceOptions,
  Transport,
  RpcException,
} from "@nestjs/microservices";
import { ExceptionFilter } from "../shared/exception-filter/exception-filter";
import { ValidationPipe } from "@nestjs/common";
import { useContainer } from "class-validator";
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MoviesModule,
    {
      transport: Transport.TCP,
      options: {
        port: 2000,
        ...(process.env.DOCKER_MOVIES_HOST && {
          host: process.env.DOCKER_MOVIES_HOST,
        }),
      },
    }
  );
  useContainer(app.select(MoviesModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        return new RpcException(
          errors[0].constraints[Object.keys(errors[0].constraints)[0]]
        );
      },
    })
  );
  app.useGlobalFilters(new ExceptionFilter());
  app.listen();
}
bootstrap();
