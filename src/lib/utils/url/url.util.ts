import url from 'url';

function formatUrl(urlObject: URL) {
  return url.format(urlObject);
}
