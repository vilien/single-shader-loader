module.exports = function (source) {
  this.cacheable && this.cacheable();
  let common = '';
  const content = {
    vertex: '',
    fragment: '',
  };
  const arr = source.split(/\r|\n/);
  const commentsPatt = /^\s*\/\//;
  let key = '';
  if (arr.length > 1) {
    arr.forEach(line => {
      if (!line) return;
      if (line.indexOf('vertex:') === 0) {
        key = 'vertex';
        content[key] += common;
      } else if (line.indexOf('fragment:') === 0) {
        key = 'fragment';
        content[key] += common;
      } else if (key) {
        content[key] += `${line}\n`;
      } else if (!commentsPatt.test(line)) {
        common += `${line}\n`;
      }
    });
  }
  this.value = content;
  return "module.exports = " + JSON.stringify(content);
}
