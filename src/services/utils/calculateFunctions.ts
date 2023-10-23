/* Functions needed for CalculateCosineDistance */
export function calculateDotProduct (x: Array<number | null>, y: Array<number | null>): number {
  let result = 0
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null && y[i] !== null) {
      result += (x[i] ?? 0) * (y[i] ?? 0)
    }
  }
  return result
}

export function calculateMagnitude (x: Array<number | null>) {
  let sumOfSquares = 0
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null) {
      sumOfSquares += (x[i] ?? 0) ** 2
    }
  }
  const magnitude = Math.sqrt(sumOfSquares)
  return magnitude
}

/* Functions needed for CalculatePearsonCorrelation */
export function calculateSum (x: Array<number | null>, y: Array<number | null>) {
  let sum = 0
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null && y[i] !== null) {
      sum += x[i] ?? 0
    }
  }
  return sum
}

export function calculateProductSum (x: Array<number | null>, y: Array<number | null>) {
  let sumXY = 0
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null && y[i] !== null) {
      sumXY += (x[i] ?? 0) * (y[i] ?? 0)
    }
  }
  return sumXY
}

export function calculateSquaredSum (x: Array<number | null>, y: Array<number | null>) {
  let sumXSquared = 0
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null && y[i] !== null) {
      sumXSquared += (x[i] ?? 0) ** 2
    }
  }
  return sumXSquared
}

/* Function needed for CalculateEuclideanDistance */
export function calculateSquaredDifferences (x: Array<number | null>, y: Array<number | null>) {
  const squaredDifferences = []
  for (let i = 0; i < x.length; i++) {
    if (x[i] !== null && y[i] !== null) {
      squaredDifferences.push(((x[i]) ?? 0 - (y[i] ?? 0)) ** 2)
    } else {
      squaredDifferences.push(0)
    }
  }
  return squaredDifferences
}


/* Function needed for meanDifferencePrediction */
export function calculateMeans(data: Array<Array<number | null>> | Array<number | null>): number[] {
  const means: number[] = [];

  // Verificar si se proporciona una matriz o un vector
  const isMatrix = Array.isArray(data[0]);

  if (isMatrix) {
    // Calcular medias para cada fila de la matriz
    for (let row of data as Array<Array<number | null>>) {
      let sum = 0;
      let counter = 0;

      for (let value of row) {
        if (value !== null) {
          sum += value;
          counter++;
        }
      }

      const mean = counter > 0 ? sum / counter : 0;
      means.push(mean);
    }
  } else {
    // Calcular la media para el vector
    let sum = 0;
    let counter = 0;

    for (let value of data as (number | null)[]) {
      if (value !== null) {
        sum += value;
        counter++;
      }
    }

    const mean = counter > 0 ? sum / counter : 0;
    means.push(mean);
  }
  return means
}
