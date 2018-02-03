module.exports = {
  celsiusToFahrenheit: temperatureInCelsius => {
    return (9 / 5 * temperatureInCelsius) + 32;
  },
  fahrenheitToCelsius: temperatureInFahrenheit => {
    return temperatureInFahrenheit - (32 * 5 / 9);
  }
};
