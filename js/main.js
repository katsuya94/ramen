requirejs.config({
  baseUrl: 'js',
});

require(['Ramen', 'Customer'], function(Ramen, Customer) {
  output = document.getElementById('output');

  function print(str) {
    line = document.createElement('div');
    line.innerHTML = str;
    output.appendChild(line);
  }

  print(Ramen);
  print(Ramen.Noodles);
  print(Ramen.Soup);
});

