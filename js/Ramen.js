define([], function() {
  function Ramen() {
    this.noodles = null;
    this.soup = null;
    this.toppings = [];
  }

  function Noodles() {
    this.thickness = 1.0;
    this.chewiness = 1.0;
  }

  Ramen.Noodles = Noodles;

  function Soup() {
    this.type = 'shio';
    this.thickness = 1.0;
    this.saltiness = 1.0;
    this.dankness = 1.0;
    this.spiciness = 1.0;
    this.temperature = 100.0;
  }

  Ramen.Soup = Soup;

  return Ramen;
});
