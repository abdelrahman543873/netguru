import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule.register({}),
    ClientsModule.register([
      {
        name: "MOVIES",
        transport: Transport.TCP,
        options: {
          port: 2000,
          ...(process.env.DOCKER_MOVIES_HOST && {
            host: process.env.DOCKER_MOVIES_HOST,
          }),
        },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
