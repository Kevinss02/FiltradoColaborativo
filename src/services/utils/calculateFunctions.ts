/* Functions needed for CalculateCosineDistance */
export function calculateDotProduct(x: Array<number | null>, y: Array<number | null>): number {
  if (x.length !== y.length) {
    throw new Error("Los arrays deben tener la misma longitud");
  }
  let result = 0;
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null && y[i] !== null) {
      result += x[i]! * y[i]!
    }
  }
  return result;
}
  
export function calculateMagnitude(x: Array<number | null>) {
  let sumOfSquares = 0;
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null) {
      sumOfSquares += x[i]! ** 2;
    }
  }
  const magnitude = Math.sqrt(sumOfSquares);
  return magnitude;
}

/* Functions needed for CalculatePearsonCorrelation */
export function calculateSum(x: Array<number | null>, y: Array<number | null>) {
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null && y[i] !== null) {
      sum += x[i]!;
    }
  }
  return sum;
}
  
export function calculateProductSum(x: Array<number | null>, y: Array<number | null>) {
  let sumXY = 0;
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null && y[i] !== null) {
      sumXY += x[i]! * y[i]!;
    }
  }
  return sumXY
}

export function calculateSquaredSum(x: Array<number | null>, y: Array<number | null>) {
  let sumXSquared = 0;
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null && y[i] !== null) {
      sumXSquared += x[i]! ** 2;
    }
  }
  return sumXSquared
}

/* Function needed for CalculateEuclideanDistance */
export function calculateSquaredDifferences(x: Array<number | null>, y: Array<number | null>) {
  const squaredDifferences = [];
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null && y[i] !== null) {
      squaredDifferences.push((x[i]! - y[i]!) ** 2);
    } else {
      squaredDifferences.push(0);
    }
  }
  return squaredDifferences;
}