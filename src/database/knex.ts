import { rdsConfig } from "../config";

const knexDataApiClient = require("knex-aurora-data-api-client");

const db = (database: string) =>
  require("knex")({
    client: knexDataApiClient.postgres,
    connection: {
      secretArn: rdsConfig.secretArn,
      resourceArn: rdsConfig.resourceArn,
      database: database,
      region: rdsConfig.region,
    },
  });

export { db };
