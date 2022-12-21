class NewsView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
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
      article.className = "article"
      this.mainContainerEl.append(article);
    });
  }

  
}

module.exports = NewsView;
