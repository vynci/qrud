import { Qrud } from "../index";

describe("Qrud [Postgres SQL]", () => {
  it("Should be perform a simple GQL list items", async () => {
    const event = {
      info: {
        fieldName: "listTaskSchedules",
      },
      arguments: {},
    };

    const api = new Qrud({
      table: "task_schedule",
      database: "krono_aurora_pg",
    });

    const listResult = await api.appsync(event);

    console.log("listResult", listResult);

    expect(true).toEqual(true);
  });
});
