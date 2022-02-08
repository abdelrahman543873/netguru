import { AUTH } from "./../endpoints/auth.endpoints";
import { HTTP_METHODS_ENUM } from "./../request.methods.enum";
import { ADD_MOVIES } from "./../endpoints/movies.endpoints";
import { testRequest } from "../request";
import { buildMovieParams } from "./movies.factory";
describe("add movies suite case", () => {
  it("should add a movie", async () => {
    const AuthRequest = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: AUTH,
      variables: {
        username: "premium-jim",
        password: "GBLtTyq3E_UNjFnpo9m6",
      },
    });
    const params = buildMovieParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_MOVIES,
      variables: {
        Title: params.Title,
      },
      token: AuthRequest.body.token,
    });
    expect(res.body.InputTitle).toBe(params.Title);
  });
});
