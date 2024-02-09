import { z } from "zod";
import { v4 } from "uuid";

describe("Zod", () => {
  it("Case 1", async () => {
    const createNewDateISO = () => new Date().toISOString();

    const User = z.object({
      id: z.string().default(v4),
      first_name: z.string(),
      last_name: z.string(),
      email: z.string(),
      phone: z.string().nullable().optional(),
      avatar: z.string().nullable().optional(),
      updated_at: z.string().default(createNewDateISO),
      created_at: z.string().default(createNewDateISO),
    });

    const payload = {
      first_name: "John",
      last_name: "Cena",
      email: "john_cena@gmail.com",
    };

    const result1 = User.parse(payload);

    console.log("result1", result1);

    const result2 = User.parse(payload);

    console.log("result2", result2);

    expect(true).toEqual(true);
  });
});
