// Test data generator with 30% chance of errors
const QATARI_STOCKS = ["AHCS", "ERES", "IHGS", "MCCS", "ORDS", "QNBK"];

export const generateTestData = () => {
  const length = Math.floor(Math.random() * 8) + 4; // 4-12 symbols
  let result = "";

  for (let i = 0; i < length; i++) {
    const stock =
      QATARI_STOCKS[Math.floor(Math.random() * QATARI_STOCKS.length)];
    result += stock;
  }

  // 30% chance to add error (trimmed symbol)
  if (Math.random() < 0.3) {
    const errorTypes = [
      () => result + "AB", // 2 chars at end
      () => result + "XYZ", // 3 chars at end
      () => "Q" + result, // 1 char at start
      () => "WX" + result, // 2 chars at start
    ];
    const errorFn = errorTypes[Math.floor(Math.random() * errorTypes.length)];
    result = errorFn();
  }

  return result;
};
