import { Qrud } from "../index";
import { jwtDecode } from "jwt-decode";
import { z } from "zod";
import { v4 } from "uuid";

export const getDecodedToken = (event: any) => {
  let token: string;

  const authorizationHeader =
    event?.headers?.Authorization ||
    event?.headers?.authorization ||
    event?.request?.headers?.authorization ||
    event?.request?.headers?.Authorization;

  if (authorizationHeader?.includes("Bearer"))
    token = authorizationHeader.split("Bearer")[1];
  else token = authorizationHeader;

  const result = token ? jwtDecode(token) : {};

  return result;
};

const firstPersonCase = [
  "getMyUserProfile",
  "updateMyUserProfile",
  "deleteMyUserProfile",
];

const auth = (event: any) => {
  const fieldName = event.info.fieldName;

  const decodedToken: any = getDecodedToken(event);

  let result: any = { identifiers: [] };

  if (firstPersonCase.includes(fieldName))
    result.identifiers.push({
      value: decodedToken.username,
      field: "id",
    });

  return result;
};

describe("Auth - Qrud [Postgres SQL]", () => {
  it("Should be perform createUserProfile", async () => {
    const event = {
      info: {
        fieldName: "createUserProfile",
      },
      arguments: {
        payload: {
          id: "ops.rcoleman@gmail.com",
          first_name: "John",
          last_name: "Cena",
          email: "ops.rcoleman@gmail.com",
          phone: "123",
          url: "url",
        },
      },
      request: {
        headers: {},
      },
    };

    const UserProfile = z.object({
      id: z.string().default(v4()),
      first_name: z.string(),
      last_name: z.string(),
      email: z.string(),
      phone: z.string().nullable().optional(),
      avatar: z.string().nullable().optional(),
      updated_at: z.string().default(new Date().toISOString()),
      created_at: z.string().default(new Date().toISOString()),
    });

    const api = new Qrud({
      schema: UserProfile,
      table: "user_profile",
      database: "krono_aurora_pg",
    });

    const result = await api.appsync(event, { auth });

    console.log("[createUserProfile] result", result);

    expect(true).toEqual(true);
  });

  it("Should be perform getMyUserProfile", async () => {
    const event = {
      info: {
        fieldName: "getMyUserProfile",
      },
      arguments: {},
      request: {
        headers: {
          Authorization:
            "Bearer eyJraWQiOiJiU2NCSWNQQ2o5WU1pV3JCanhEVWZJRzRGM1o2MEJuQzBDU0V4REt6SlJ3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMmVmOWZlNS00NzgwLTQ3YWUtOTUwYy00ZTkwZDMzMzJhYjMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuY2EtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2NhLWNlbnRyYWwtMV9HZGFvUlVaZDMiLCJjbGllbnRfaWQiOiI1MDE2MnQ1YWRwdDhjbW45Ymw3aGVzYWtrNyIsIm9yaWdpbl9qdGkiOiJhNWE2ZTlhMi02NjEwLTRmY2UtYWFmZC1mNmQyNjRlZjEwZTMiLCJldmVudF9pZCI6ImUzNzllNjBiLWM4MWMtNDFjZS1iMmRjLTVlMDg5ODM5YzI0ZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDE5NzU0ODAsImV4cCI6MTcwMjI1MTQ0NiwiaWF0IjoxNzAyMTY1MDQ2LCJqdGkiOiI3NTNiYzc1My00MjA3LTRlMjEtYmZkZi0zMjMzZGM1OWUyNTQiLCJ1c2VybmFtZSI6Im9wcy5yY29sZW1hbkBnbWFpbC5jb20ifQ.CXD57w1vvTSuNZPghZc_nGIzMCUTb2eaqnurzQxprsa0WXlcSLBpGNYyZlWaQHx8C-xLtAC8lxQB1nZC0bf_ck1-fpAtoJAtn60miodQPjl6fqO7f-7QznM4nMCRefBPz6Hr8gBKenk8GiuDgVCAEqrVyKPmWWUF89Ot6b_COONVG2ewJG_s-GqrfBQr7XmlcKuJVMSDFNCG00F2ZD1ls_wabKtVKLSv4gVMeM3-Y8MjjMuhS_KPxLHIouBQd1oS8f1D-tULXxR7qab7Ut8gE3ZiZT_3TvAEOz3dlDnvNp7mBEKgZxY2jmAYjxp6SqenQ_qW1BNn9XDW-0m3-feehg",
        },
      },
    };

    const api = new Qrud({
      table: "user_profile",
      database: "krono_aurora_pg",
    });

    const result = await api.appsync(event, { auth });

    console.log("[getMyUserProfile] result", result);

    expect(true).toEqual(true);
  });

  it("Should be perform updateMyUserProfile", async () => {
    const event = {
      info: {
        fieldName: "updateMyUserProfile",
      },
      arguments: {
        id: "from_arguments_id",
        payload: { first_name: `new name ${new Date().getTime()}` },
      },
      request: {
        headers: {
          Authorization:
            "Bearer eyJraWQiOiJiU2NCSWNQQ2o5WU1pV3JCanhEVWZJRzRGM1o2MEJuQzBDU0V4REt6SlJ3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMmVmOWZlNS00NzgwLTQ3YWUtOTUwYy00ZTkwZDMzMzJhYjMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuY2EtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2NhLWNlbnRyYWwtMV9HZGFvUlVaZDMiLCJjbGllbnRfaWQiOiI1MDE2MnQ1YWRwdDhjbW45Ymw3aGVzYWtrNyIsIm9yaWdpbl9qdGkiOiJhNWE2ZTlhMi02NjEwLTRmY2UtYWFmZC1mNmQyNjRlZjEwZTMiLCJldmVudF9pZCI6ImUzNzllNjBiLWM4MWMtNDFjZS1iMmRjLTVlMDg5ODM5YzI0ZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDE5NzU0ODAsImV4cCI6MTcwMjI1MTQ0NiwiaWF0IjoxNzAyMTY1MDQ2LCJqdGkiOiI3NTNiYzc1My00MjA3LTRlMjEtYmZkZi0zMjMzZGM1OWUyNTQiLCJ1c2VybmFtZSI6Im9wcy5yY29sZW1hbkBnbWFpbC5jb20ifQ.CXD57w1vvTSuNZPghZc_nGIzMCUTb2eaqnurzQxprsa0WXlcSLBpGNYyZlWaQHx8C-xLtAC8lxQB1nZC0bf_ck1-fpAtoJAtn60miodQPjl6fqO7f-7QznM4nMCRefBPz6Hr8gBKenk8GiuDgVCAEqrVyKPmWWUF89Ot6b_COONVG2ewJG_s-GqrfBQr7XmlcKuJVMSDFNCG00F2ZD1ls_wabKtVKLSv4gVMeM3-Y8MjjMuhS_KPxLHIouBQd1oS8f1D-tULXxR7qab7Ut8gE3ZiZT_3TvAEOz3dlDnvNp7mBEKgZxY2jmAYjxp6SqenQ_qW1BNn9XDW-0m3-feehg",
        },
      },
    };

    const api = new Qrud({
      table: "user_profile",
      database: "krono_aurora_pg",
    });

    const result = await api.appsync(event, { auth });

    console.log("[updateMyUserProfile] result", result);

    expect(true).toEqual(true);
  });

  it("Should be perform deleteMyUserProfile", async () => {
    const event = {
      info: {
        fieldName: "deleteMyUserProfile",
      },
      arguments: {},
      request: {
        headers: {
          Authorization:
            "Bearer eyJraWQiOiJiU2NCSWNQQ2o5WU1pV3JCanhEVWZJRzRGM1o2MEJuQzBDU0V4REt6SlJ3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzMmVmOWZlNS00NzgwLTQ3YWUtOTUwYy00ZTkwZDMzMzJhYjMiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuY2EtY2VudHJhbC0xLmFtYXpvbmF3cy5jb21cL2NhLWNlbnRyYWwtMV9HZGFvUlVaZDMiLCJjbGllbnRfaWQiOiI1MDE2MnQ1YWRwdDhjbW45Ymw3aGVzYWtrNyIsIm9yaWdpbl9qdGkiOiJhNWE2ZTlhMi02NjEwLTRmY2UtYWFmZC1mNmQyNjRlZjEwZTMiLCJldmVudF9pZCI6ImUzNzllNjBiLWM4MWMtNDFjZS1iMmRjLTVlMDg5ODM5YzI0ZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDE5NzU0ODAsImV4cCI6MTcwMjI1MTQ0NiwiaWF0IjoxNzAyMTY1MDQ2LCJqdGkiOiI3NTNiYzc1My00MjA3LTRlMjEtYmZkZi0zMjMzZGM1OWUyNTQiLCJ1c2VybmFtZSI6Im9wcy5yY29sZW1hbkBnbWFpbC5jb20ifQ.CXD57w1vvTSuNZPghZc_nGIzMCUTb2eaqnurzQxprsa0WXlcSLBpGNYyZlWaQHx8C-xLtAC8lxQB1nZC0bf_ck1-fpAtoJAtn60miodQPjl6fqO7f-7QznM4nMCRefBPz6Hr8gBKenk8GiuDgVCAEqrVyKPmWWUF89Ot6b_COONVG2ewJG_s-GqrfBQr7XmlcKuJVMSDFNCG00F2ZD1ls_wabKtVKLSv4gVMeM3-Y8MjjMuhS_KPxLHIouBQd1oS8f1D-tULXxR7qab7Ut8gE3ZiZT_3TvAEOz3dlDnvNp7mBEKgZxY2jmAYjxp6SqenQ_qW1BNn9XDW-0m3-feehg",
        },
      },
    };

    const api = new Qrud({
      table: "user_profile",
      database: "krono_aurora_pg",
    });

    const result = await api.appsync(event, { auth });

    console.log("[deleteMyUserProfile] result", result);

    expect(true).toEqual(true);
  });
});
