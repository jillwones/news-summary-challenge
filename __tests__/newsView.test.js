/**
 * @jest-environment jsdom
 */

const NewsView = require("../src/newsView");
const NewsModel = require("../src/newsModel")
const NewsClient = require("../src/newsClient")
const fs = require("fs");
const mockData = require("../mockData");

describe("NewsView", () => {

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  })
  it("displays all articles", () => {
    const model = new NewsModel();
    const client = new NewsClient();
    const view = new NewsView(model, client);
    model.setNews(mockData);
    view.viewArticles();
    expect(document.querySelectorAll(".article").length).toEqual(10);
  });
});

// need to do more unit tests for NewsViews - the test above is 
// integration test
// will need to mock client and model classes