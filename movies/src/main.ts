import { NestFactory } from "@nestjs/core";
import { MoviesModule } from "./movies.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { BaseHttpExceptionFilter } from "../shared/exception-filter/base-http-exception-filter";
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MoviesModule,
    {
      transport: Transport.TCP,
      options: {
        port: 2000,
        host: process.env.DOCKER_MOVIES_HOST || process.env.MOVIES_HOST,
      },
    }
  );
  app.useGlobalFilters(new BaseHttpExceptionFilter());
  app.listen();
}
bootstrap();
