import fs from "fs";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { ValidationPipe } from "@nestjs/common";

const mongod = new MongoMemoryServer({ binary: { version: "4.2.8" } });
module.exports = async (): Promise<void> => {
  await mongod.start();
  const mongoConfig = {
    mongoDBName: "jest",
    mongoUri: await mongod.getUri(),
  };
  fs.writeFileSync("globalConfig.json", JSON.stringify(mongoConfig));
  global.__MONGOD__ = mongod;
  global.mongoUri = mongoConfig.mongoUri;
  global.mongoDBName = mongoConfig.mongoDBName;
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.init();
  global.app = app;
};
