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
    // console.log(data);

    data.response.results.forEach((result) => {
      this.#createArticleEl(result);
    });
  }

  // private functions

  #createArticleEl(result) {
    const article = document.createElement("a");
    article.className = "article";
    const url = result.webUrl;
    article.setAttribute("href", url);
    article.setAttribute("target", "_blank");
    this.mainContainerEl.append(article);
    const img = document.createElement("img");
    img.src = result.fields.thumbnail;
    article.append(img);
    const headline = document.createElement("a");
    headline.textContent = result.webTitle;
    headline.className = "headline";
    article.append(headline);
    const author = document.createElement("div");
    author.textContent = result.fields.byline;
    author.className = "byline";
    article.append(author);
    const abstract = document.createElement("div");
    abstract.className = "abstract";
    abstract.innerHTML = result.fields.standfirst;
    article.append(abstract);
  }
}

module.exports = NewsView;
