class NewsView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
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

  // private functions

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
}

module.exports = NewsView;
