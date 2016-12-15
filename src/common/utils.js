export function serialize(url, params) {
  const query = [];

  if (params !== undefined) url += "?"

  for (var property in params) {
    if (params.hasOwnProperty(property)) {
      query.push(encodeURIComponent(property) 
        + "=" 
        + encodeURIComponent(params[property]));
    }
  }
  return url + query.join("&");
}
