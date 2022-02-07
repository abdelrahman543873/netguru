import { HTTP_METHODS_ENUM } from "./../request.methods.enum";
import { ADD_MOVIES } from "./../endpoints/movies.endpoints";
import { testRequest } from "../request";
import { buildMovieParams } from "./movies.factory";
describe("add movies suite case", () => {
  it("should add a movie", async () => {
    const params = buildMovieParams();
    const res = await testRequest({
      method: HTTP_METHODS_ENUM.POST,
      url: ADD_MOVIES,
      variables: {
        Title: params.Title,
      },
    });
    expect(res.body.Title).toBe(params.Title);
  });
});
