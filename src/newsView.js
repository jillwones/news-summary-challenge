class NewsView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector("#main-container");

    const submitButtonEl = document.querySelector("#submit-button");
    const searchInputEl = document.querySelector("#news-input");

    document.addEventListener("DOMContentLoaded", () => {
      this.client.getNewsData("", (data) => {
        this.model.setNews(data);
        this.viewArticles();
      });
    });

    submitButtonEl.addEventListener("click", () => {
      const searchInput = searchInputEl.value;
      this.client.getNewsData(searchInput, (data) => {
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
    document.querySelectorAll(".article").forEach((element) => {
      element.remove();
    });

    const data = this.model.getNews();

    data.response.results.forEach((result) => {
      this.#createArticleEl(result);
    });
  }

  // private functions

  #createArticleEl(result) {
    const article = document.createElement("div");
    article.className = "article";
    this.mainContainerEl.append(article);
    const img = document.createElement("img");
    img.src = result.fields.thumbnail;
    article.append(img);
    const headline = document.createElement("a");
    headline.textContent = result.webTitle;
    headline.className = "headline";
    const url = result.webUrl;
    headline.setAttribute("href", url);
    article.append(headline);
  }
}

module.exports = NewsView;
