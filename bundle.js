(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/newsModel.js
  var require_newsModel = __commonJS({
    "src/newsModel.js"(exports, module) {
      var NewsModel2 = class {
        constructor() {
          this.newsInfo = null;
        }
        setNews(newsInfo) {
          this.newsInfo = newsInfo;
        }
        getNews() {
          return this.newsInfo;
        }
      };
      module.exports = NewsModel2;
    }
  });

  // src/newsView.js
  var require_newsView = __commonJS({
    "src/newsView.js"(exports, module) {
      var NewsView2 = class {
        constructor(model2, client2) {
          this.model = model2;
          this.client = client2;
          this.mainContainerEl = document.querySelector("#main-container");
          const submitButtonEl = document.querySelector("#submit-button");
          const searchInputEl = document.querySelector("#news-input");
          submitButtonEl.addEventListener("click", () => {
            const searchInput = searchInputEl.value;
            this.getArticles(searchInput);
          });
        }
        getArticles(searchInput) {
          this.client.getNewsData(searchInput, (data) => {
            this.viewArticles(data);
          });
        }
        viewArticles(data) {
          document.querySelector("#news-input").value = null;
          document.querySelectorAll(".article").forEach((element) => {
            element.remove();
          });
          data.response.results.forEach((result) => {
            const article = document.createElement("div");
            article.textContent = result.webTitle;
            article.className = "article";
            this.mainContainerEl.append(article);
          });
        }
      };
      module.exports = NewsView2;
    }
  });

  // apiKey.js
  var require_apiKey = __commonJS({
    "apiKey.js"(exports, module) {
      apiKey = "6a432d19-71de-4647-b9f3-02c6444e3ad2";
      module.exports = apiKey;
    }
  });

  // src/newsClient.js
  var require_newsClient = __commonJS({
    "src/newsClient.js"(exports, module) {
      var apiKey2 = require_apiKey();
      var NewsClient2 = class {
        getNewsData(query, callback) {
          const url = `http://content.guardianapis.com/search?q=${query}&api-key=${apiKey2}`;
          return fetch(url).then((response) => response.json()).then((data) => callback(data));
        }
      };
      module.exports = NewsClient2;
    }
  });

  // index.js
  var NewsModel = require_newsModel();
  var NewsView = require_newsView();
  var NewsClient = require_newsClient();
  var client = new NewsClient();
  var model = new NewsModel();
  var view = new NewsView(model, client);
})();
