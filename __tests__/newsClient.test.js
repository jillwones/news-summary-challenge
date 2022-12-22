const NewsClient = require("../src/newsClient");
require("jest-fetch-mock").enableMocks();

describe("NewsClient", () => {
  it("calls fetch and loads news data", (done) => {
    const client = new NewsClient();
    fetch.mockResponseOnce(
      JSON.stringify({
        results: "data",
      })
    );

    client.getNewsData("", (newsData) => {
      expect(newsData.results).toBe("data");
      done();
    });
  });
});
