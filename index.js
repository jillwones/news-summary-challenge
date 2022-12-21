const NewsModel = require("./src/newsModel");
const NewsView = require("./src/newsView")
const NewsClient = require("./src/newsClient")

const client = new NewsClient();
const model = new NewsModel();
const view = new NewsView(model, client);