import { NestFactory } from "@nestjs/core";
import { MoviesModule } from "./movies.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
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
  app.listen();
}
bootstrap();
