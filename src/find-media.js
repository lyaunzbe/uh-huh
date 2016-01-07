import XMLHttpRequestPromise from 'xhr-promise';

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function() {
  let xhrPromise = new XMLHttpRequestPromise();
  let offset = getRandomIntInclusive(0, 5600);
  return xhrPromise.send({
    method: 'GET',
    url: 'http://api.giphy.com/v1/gifs/search?q=animatedtext&limit=25&offset='+offset+'&api_key=dc6zaTOxFJmzC'
  })
  .then(function (res) {
    let results = res.responseText.data,
        finalResult = results[getRandomIntInclusive(0,25)];
    if (results.length < 1) {
      console.log('reloading');
      window.location.reload();
    } else {
      return finalResult;
    }
  });

}
