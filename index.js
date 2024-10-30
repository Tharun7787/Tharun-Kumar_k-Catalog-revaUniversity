const fs = require("fs");


function readJsonFile(filePath) {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}


function decodeValue(value, base) {
  let decodedValue = 0;
  const digits = value.split("").reverse();

  for (let i = 0; i < digits.length; i++) {
    decodedValue += parseInt(digits[i], base) * Math.pow(base, i);
  }

  return decodedValue;
}


function lagrangeInterpolation(points) {
  let c = 0;
  const k = points.length;

  for (let i = 0; i < k; i++) {
    let xi = points[i][0];
    let yi = points[i][1];
    let term = yi;

    for (let j = 0; j < k; j++) {
      if (i !== j) {
        term *= (0 - points[j][0]) / (xi - points[j][0]);
      }
    }
    c += term;
  }

  return Math.round(c); 
}


function calculateSecrets(input) {
  const results = [];

  for (const key in input) {
    if (key === "keys") continue;

    const { base, value } = input[key];
    const x = parseInt(key);
    const y = decodeValue(value, parseInt(base));

    results.push([x, y]);
  }

  const k = input.keys.k;
  const points = results.slice(0, k); 
  const secret = lagrangeInterpolation(points);

  return secret;
}


const testCase1 = readJsonFile("testCase1.json");
const testCase2 = readJsonFile("testCase2.json");

const secret1 = calculateSecrets(testCase1);
const secret2 = calculateSecrets(testCase2);

console.log(`Secret for Test Case 1: ${secret1}`);
console.log(`Secret for Test Case 2: ${secret2}`);