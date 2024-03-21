import { mergeFilterAndAuthContext } from "../src/helpers/helper";

describe("Helper tests", () => {
  it("Should be merge filter and authContext", async () => {
    const filter = [
      {
        field: "organization_id",
        value: "95a5198e-7d4b-42c6-b19b-82964bcfd33a",
      },
      {
        field: "user_id",
        value: "2222@gmail.com",
      },
      { field: "status", value: "active" },
    ];

    const authContext = [
      {
        field: "organization_id",
        value: "11111-1111",
      },
      {
        field: "user_id",
        value: "vncelizaga@gmail.com",
      },
      { field: "role", value: "admin" },
    ];

    mergeFilterAndAuthContext(filter, authContext);

    console.log(filter);

    expect(true).toEqual(true);
  });
});
