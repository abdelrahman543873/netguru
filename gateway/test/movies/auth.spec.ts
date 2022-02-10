import { AUTH } from "./../endpoints/auth.endpoints";
import { HTTP_METHODS_ENUM } from "./../request.methods.enum";
import { testRequest } from "../request";
describe("auth suite case", () => {
  it("should authenticate successfully", async () => {
    const AuthRequest = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: AUTH,
      variables: {
        username: "premium-jim",
        password: "GBLtTyq3E_UNjFnpo9m6",
      },
    });
    expect(AuthRequest.body.token).toBeTruthy();
  });
});
