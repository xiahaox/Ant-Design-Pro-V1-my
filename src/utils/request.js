import fetch from 'dva/fetch';
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {  
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}



/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

// const defaultHeaders={
//   'Content-Type':'application/json',
// }
const defaultOptions={
  credentials: 'include',
  method:'get',
  headers:{
  'Content-Type':'application/json',

  }
}
const newOptions=Object.assign({},defaultOptions,options?options:{})
if (newOptions.method==='POST') {
  newOptions.headers={'Content-Type': 'application/json; charset=utf-8',}
  newOptions.body=JSON.stringify(newOptions.body)
}
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
