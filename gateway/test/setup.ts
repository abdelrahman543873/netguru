import fs from "fs";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "../shared/guards/auth.guard";

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
  })
    .overrideGuard(AuthGuard)
    .useValue({ canActivate: () => true })
    .compile();

  const app = module.createNestApplication();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.init();
  await app.startAllMicroservices();
  global.app = app;
};
