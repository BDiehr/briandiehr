import rest from 'restler';
const redditAPI = 'https://reddit.com';

function getTopStoriesReddit(number) {
  return new Promise((resolve, reject) => {
    rest.get(`${redditAPI}/r/programming/hot/.json?limit=${number}`)
      .on('complete', response => resolve(response))
      .on('error', error => reject(error));
  });
}

export default getTopStoriesReddit;
