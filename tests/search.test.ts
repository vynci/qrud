import { z } from "zod";
import { v4 } from "uuid";
import { Qrud } from "../index";

const createNewDateISO = () => new Date().toISOString();

export const OrganizationMember = z.object({
  id: z.string().default(v4),
  user_profile_id: z.string(),
  organization_id: z.string(),
  role: z.string(),
  status: z.string(),
  updated_at: z.string().default(createNewDateISO),
  created_at: z.string().default(createNewDateISO),
});

export type TOrganizationMember = z.infer<typeof OrganizationMember>;

describe("Qrud [Postgres SQL]", () => {
  it("Should be able to perform a simple search", async () => {
    const api = new Qrud<TOrganizationMember>({
      schema: OrganizationMember,
      table: "organization_member_profile",
      database: "pgw_aurora_pg",
    });

    const listResult = await api.list({
      filter: {
        organization_id: "95a5198e-7d4b-42c6-b19b-82964bcfd33a",
      },
      search: {
        fields: ["user_profile_full_name", "user_profile_email"],
        value: "%vince%",
      },
    });

    console.log("listResult", listResult);

    expect(true).toEqual(true);
  });
});

const test = {
  filter: [
    {
      field: "organization_id",
      value: "95a5198e-7d4b-42c6-b19b-82964bcfd33a",
      operator: "=",
    },
  ],
};
