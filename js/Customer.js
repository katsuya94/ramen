define([], function() {
  function Customer() {
    this.idealRamen = null;
    this.beer = {
      lunch: 0.0,
      dinner: 0.0,
    };
    this.inebriation = 0.0;
    this.prestige = 1.0;
  }

  return Customer;
});
