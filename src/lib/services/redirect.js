export default `
(function(){
  var path = location.pathname;
  if(path === '/privacy' || path === '/privacy.html' || path === '/privacy/') {
    location.href = 'https://consensys.net/privacy-policy/';
  } else if (path === '/terms' || path === '/terms.html' || path === '/terms/) {
    location.href = 'https://consensys.net/terms-of-use/';
  }
  var slug = path.slice(1);
  var ext = slug.split('.').pop();
  if(ext !== slug && ext === 'html') {
    location.href = path.substr(0, path.lastIndexOf(".")) + '/';
  }
})();
`
