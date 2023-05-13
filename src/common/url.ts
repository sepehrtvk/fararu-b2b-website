export const getOriginFromUrl = (url: string) => {
  var pathArray = url.split('/');
  var protocol = pathArray[0];
  var host = pathArray[2];
  return protocol + '//' + host;
};
