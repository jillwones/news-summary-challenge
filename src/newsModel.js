class NewsModel {
  constructor() {
    this.newsInfo = null;
  }

  setNews(newsInfo) {
    this.newsInfo = newsInfo;
  }

  getNews() {
    return this.newsInfo;
  }
}

module.exports = NewsModel;