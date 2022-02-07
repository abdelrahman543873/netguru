import { ENV_VARIABLE_NAMES } from "./../../movies.const";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { existsSync, readFileSync } from "fs";
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        // done this way to be able to connect in case of testing
        // docker and real runtime without docker
        return {
          uri:
            (existsSync("globalConfig.json") &&
              JSON.parse(readFileSync("globalConfig.json", "utf-8"))
                .mongoUri) ||
            configService.get<string>("MONGO_DB") ||
            configService.get<string>(ENV_VARIABLE_NAMES.LOCAL_MONGO_DB),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DataBaseModule {}
