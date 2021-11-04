export default `
(function(){
  var path = location.pathname;
  var slug = path.slice(1);
  var ext = slug.split('.').pop();
  if(ext !== slug && ext === 'html') {
    location.href = path.substr(0, path.lastIndexOf(".")) + '/';
  }
})();
`
