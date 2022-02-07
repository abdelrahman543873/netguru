import NodeEnvironment from "jest-environment-node";

class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    await super.setup();
    this.global.__MONGO_URI__ = global.mongoUri;
    this.global.__MONGO_DB_NAME__ = global.mongoDBName;
    this.global.app = global.app;
  }

  async teardown() {
    await super.teardown();
  }
}
module.exports = MongoEnvironment;
