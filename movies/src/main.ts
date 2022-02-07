import { NestFactory } from "@nestjs/core";
import { MoviesModule } from "./movies.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MoviesModule,
    {
      transport: Transport.TCP,
    }
  );
  app.listen();
}
bootstrap();
