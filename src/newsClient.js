const apiKey = require("../apiKey");

class NewsClient {
  getNewsData(query, callback) {
    const url = `http://content.guardianapis.com/search?q=${query}&api-key=${apiKey}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => callback(data));
  }
}

module.exports = NewsClient;
