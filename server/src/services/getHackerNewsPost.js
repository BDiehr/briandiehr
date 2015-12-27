import rest from 'restler';
const hackerNewsAPI = 'https://hacker-news.firebaseio.com';

function topHackerNewsPost(itemId) {
  return new Promise((resolve, reject) => {
    rest.get(`${hackerNewsAPI}/v0/item/${itemId}.json`)
      .on('complete', response => resolve(response))
      .on('error', error => reject(error));
  });
}

export default topHackerNewsPost;
