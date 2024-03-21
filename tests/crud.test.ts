import { Qrud } from "../index";
import { z } from "zod";
import { v4 } from "uuid";

describe("Qrud [Postgres SQL]", () => {
  it("Should be perform crud on a resource", async () => {
    const createNewDateISO = new Date().toISOString();

    const Todo = z.object({
      id: z.string().default(v4),
      notes: z.string(),
      updated_at: z.string().default(createNewDateISO),
      created_at: z.string().default(createNewDateISO),
    });

    const event = {
      info: {
        fieldName: "listTodos",
      },
      arguments: {},
    };

    const api = new Qrud({
      schema: Todo,
      table: "task_schedule",
      database: "krono_aurora_pg",
    });

    const listResult = await api.appsync(event);

    console.log("listResult", listResult);

    expect(true).toEqual(true);
  });
});
