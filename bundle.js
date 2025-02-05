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
          document.addEventListener("DOMContentLoaded", () => {
            this.client.getNewsData("", (data) => {
              this.searchInput = "";
              this.model.setNews(data);
              this.viewArticles();
            });
          });
          submitButtonEl.addEventListener("click", () => {
            const searchInput = searchInputEl.value;
            this.client.getNewsData(searchInput, (data) => {
              this.searchInput = searchInput;
              this.model.setNews(data);
              this.viewArticles();
            });
          });
          searchInputEl.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              submitButtonEl.click();
            }
          });
        }
        viewArticles() {
          document.querySelector("#news-input").value = null;
          document.querySelectorAll(".article, .results").forEach((element) => {
            element.remove();
          });
          const data = this.model.getNews();
          this.#showResults();
          data.response.results.forEach((result) => {
            this.#createArticle(result);
          });
        }
        #createArticle(result) {
          const article = this.#createArticleElement(result);
          const img = this.#createImageElement(result);
          const headline = this.#createHeadlineElement(result);
          const author = this.#createAuthorElement(result);
          const abstract = this.#createAbstractElement(result);
          article.append(img, headline, author, abstract);
          this.mainContainerEl.append(article);
        }
        #createArticleElement(result) {
          const article = document.createElement("a");
          article.className = "article";
          const url = result.webUrl;
          article.setAttribute("href", url);
          article.setAttribute("target", "_blank");
          return article;
        }
        #createImageElement(result) {
          const img = document.createElement("img");
          img.src = result.fields.thumbnail;
          return img;
        }
        #createHeadlineElement(result) {
          const headline = document.createElement("a");
          headline.textContent = result.webTitle;
          headline.className = "headline";
          return headline;
        }
        #createAuthorElement(result) {
          const author = document.createElement("div");
          author.textContent = result.fields.byline;
          author.className = "byline";
          return author;
        }
        #createAbstractElement(result) {
          const abstract = document.createElement("div");
          abstract.className = "abstract";
          abstract.innerHTML = result.fields.standfirst;
          return abstract;
        }
        #showResults() {
          const results = document.createElement("div");
          results.className = "results";
          if (this.searchInput === "") {
            results.textContent = "Showing Latest Articles";
          } else if (this.model.getNews().response.results.length === 0) {
            results.textContent = "No results";
          } else {
            results.textContent = `Showing results for "${this.searchInput}"`;
          }
          this.mainContainerEl.append(results);
        }
      };
      module.exports = NewsView2;
    }
  });

  // apiKey.js
  var require_apiKey = __commonJS({
    "apiKey.js"(exports, module) {
      apiKey = "61c2f080-0079-4aa8-955d-54389cd052d9";
      module.exports = apiKey;
    }
  });

  // src/newsClient.js
  var require_newsClient = __commonJS({
    "src/newsClient.js"(exports, module) {
      var apiKey2 = require_apiKey();
      var NewsClient2 = class {
        getNewsData(query, callback) {
          const url = `https://content.guardianapis.com/search?q=${query}&query-fields=headline&show-fields=thumbnail,headline,byline,standfirst&order-by=newest&api-key=${apiKey2}`;
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
