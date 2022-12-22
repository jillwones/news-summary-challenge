const NewsModel = require("../src/newsModel");

describe("NewsModel", () => {
  let model;

  beforeEach(() => {
    model = new NewsModel();
  });

  it("initialises news data as null", () => {
    expect(model.getNews()).toEqual(null);
  });

  it("sets news data and returns that new data", () => {
    model.setNews("data");
    expect(model.getNews()).toEqual("data");
  });
});
