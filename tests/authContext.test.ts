import { Qrud, getDecodedToken } from "../index";

const firstPersonCase = [
  "getMyOrganizationMemberProfile",
  "listMyOrganizationMemberProfiles",
];

const auth = (event: any) => {
  const fieldName = event.info.fieldName;

  const decodedToken: any = getDecodedToken(event);

  let result: any = { identifiers: [] };

  if (firstPersonCase.includes(fieldName)) {
    result.identifiers.push({
      value: decodedToken.username,
      field: "user_profile_id",
    });
  }

  return result;
};

describe("Qrud [Postgres SQL]", () => {
  it("Should be perform a simple GQL list items", async () => {
    const usr1 =
      "eyJraWQiOiJZdzRzaFFRalR6eXBEandGcFdsdHpqOTVBZU5VOFpvc0YzZmJQOFBzbmhrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhNzg2ZTFkOS0xOTQyLTQxNmUtYmM2OS0wMjJjZTBhMDlkNzIiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9DN0poOVBZc2oiLCJjbGllbnRfaWQiOiIzY3RmczNjY3U3b2xwNWowNzFvNDI4NWY1aiIsIm9yaWdpbl9qdGkiOiIxNzU5MmE2NS1hMTdkLTRiMzEtYmY2Zi0zNzk4YzEyNmMxY2UiLCJldmVudF9pZCI6IjZkNDc1NTg1LTE1NDItNDdiZi05NDRlLTM5NDE1MWI1YjAwOSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDM1MzUxNzIsImV4cCI6MTcwMzUzODc3MiwiaWF0IjoxNzAzNTM1MTcyLCJqdGkiOiI2MDU3ZjYwNC01ZDA0LTQxOGYtODkyMC1lYTUyMzVmODczZmQiLCJ1c2VybmFtZSI6ImFiMWYwZTQwLWFiYjAtNDQ4Ni04MGI2LTg3NTM0NzU3NjA2NyJ9.yCwgbzn4f25SkI_TFzz_dPO4RmT1cAhhUTpGg46WDGQhER3lSwwULDe_uI9dDBG-vD2NQIYrYI-Dv5AuYt7TXHVFldaXoE2yrDeQwnoO_bXe-s2A8KWZ0_ZXE1VS2XOI7MLsjYpubhWsj0XlGzmZsRq2rnvOMmkp5tzgDqvf0sVsOD4JDUdsTvpkTUwdoUFhxN4U2SptH2pMJzUtkBmToIMfXxA2XtaqK6CMVkQGSsL2N37E6tpkKarkckOkxACoqdNtEUYxwuuP5_JsUq8qRrFK5sRxbzRbOYrPhftOvnHFX_Itpz8Hn82vf1h9-vHz3bgavoQFYybl5Gix9ZQ8Hw";

    const usr2 =
      "eyJraWQiOiJZdzRzaFFRalR6eXBEandGcFdsdHpqOTVBZU5VOFpvc0YzZmJQOFBzbmhrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjNjEwYWQxOS04Nzk2LTRlOWYtYTljMC1jZjg1YjMzN2RiNTUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9DN0poOVBZc2oiLCJjbGllbnRfaWQiOiIzY3RmczNjY3U3b2xwNWowNzFvNDI4NWY1aiIsIm9yaWdpbl9qdGkiOiJkYmY2NWYyNi1kYzdlLTQ1NjgtYjIzMS1mYmIyZjM2YTViMzEiLCJldmVudF9pZCI6ImVlMDgwMTNhLWIyYTMtNDNmYi1iNDExLThhNzAyY2E5OTRhMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDM1MzU2MjUsImV4cCI6MTcwMzUzOTIyNSwiaWF0IjoxNzAzNTM1NjI1LCJqdGkiOiI0OGQ2MTQyZi05ZjIwLTQzZTgtYTViYi1iZmNiNTI2ZGQ1OWQiLCJ1c2VybmFtZSI6IjRjZTI0MzE3LWIwMTUtNGQzOS05ZGE0LTNiNTNkODMzNDFjNSJ9.21MwaZk6HcVjwGIBXw_64uLPOCbdAnKqaidG99WTFWUkpMgMdeSTSWVMWRAmmFHYhnA124YDH6L1F6QntdjIec31cybZZyD3MfMdO2KrcTrEiSnXitTxqoqRUzN2yUMyc5ry-OAeNPnVrkSVcY5KAJ6hK8z699TQvRZw_tbL4GKbsHAHuOQnE3wM9r6mLXsnlYYx-DjzfMWMQhOkEjKeV1iQSyPH0YFQODSDK3ZrA00Md8rsVEWOVbzSbX-ZYxFe561iocf3ODvKYZGcnRnDAhRapcnOgRAJIL9HzJ8zCCM9ADIpWlOa4brk-avbv8p7sprWHKNaSLp0h2AW8m91NA";

    const usr3 =
      "eyJraWQiOiJZdzRzaFFRalR6eXBEandGcFdsdHpqOTVBZU5VOFpvc0YzZmJQOFBzbmhrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0YjVlMjkwMy02ZjBkLTQ2ZGMtYjBkNC04NDFkNjkwZWRhYTAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9DN0poOVBZc2oiLCJjbGllbnRfaWQiOiIzY3RmczNjY3U3b2xwNWowNzFvNDI4NWY1aiIsIm9yaWdpbl9qdGkiOiJmNDI4NzExMC05ZjBjLTQ5Y2YtYjZjNi03YWU2MDE2ZjBkNzgiLCJldmVudF9pZCI6ImQ4NjNkYWE3LTg1MDUtNGQ5ZS1hZGU2LWVhM2MzZDQ5NzdlMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDM1MzU4MjYsImV4cCI6MTcwMzUzOTQyNiwiaWF0IjoxNzAzNTM1ODI2LCJqdGkiOiI2ZGUxZWY3ZS0zNDE1LTQ2NTMtODFiNS02ZjY1YjAxOTkzNzYiLCJ1c2VybmFtZSI6IjA0MjBiZjM1LTM5ZGItNGY1Zi1iNTM4LTc0ZDYzMWU5NTVhMCJ9.jYuh3TWsfohLA_Bz3SB0sdaf87a-WfDj8K5_QPz_JsN2by8Bs8gZByhp_HBepz22eE9-StzK4TvNd2hvtIE32ITjNS67N2iXjFWO8F9PSx1Vs9RMlGdmy18JEdnQNzpuSm5jBOq62b02FpPh-sEntBLfFo_DHjCTsgKHcQL40mjexOTLrPguqbp_F43cWEVkD-sbuvmMwm1ycyO3c45GvuZ3eWlUIKO7U9ptpNNod6SQWD9MMTkJei31Ke1kxXw_1sGeBI8WJFqSIhUC3jbLys1ANTFMXOlwjUlslAB9eFXfAKPq-iUjWq5l_ddKVW5HG8WELWGolCo5A-d3mB-Uag";

    const event = {
      info: {
        fieldName: "listMyOrganizationMemberProfiles",
      },
      arguments: {},
      request: {
        headers: {
          Authorization: `Bearer ${usr1}`,
        },
      },
    };

    const api = new Qrud({
      table: "organization_member_profile",
      database: "krono_aurora_pg",
    });

    const result = await api.gql(event, { auth });

    console.log("result", result);

    expect(true).toEqual(true);
  });
});
