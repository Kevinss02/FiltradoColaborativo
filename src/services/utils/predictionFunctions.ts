export function simplePrediction (similarities: number[], values: number[]): number {
  if (similarities.length !== values.length) {
    throw new Error('Las longitudes de los vectores de similitudes y valores deben ser iguales')
  }

  const numerator = similarities.reduce((acc, value, index) => acc + value * (values[index] ?? 0), 0)
  const denominator = similarities.reduce((acc, value) => acc + value, 0)

  if (denominator === 0) {
    throw new Error('El denominador no puede ser cero')
  }

  return numerator / denominator
}

export function meanDifferencePrediction (userMean: number, similarities: number[], values: number[], mean: number[]): number {
  // Calcula la suma de las similitudes
  const similaritiesSum = Math.abs(similarities.reduce((acumulador, similitud) => acumulador + similitud, 0))

  // Calcula la puntuación utilizando la fórmula proporcionada
  const result = userMean + (
    similarities.reduce((acumulador, similitud, i) => {
      return acumulador + (similitud * ((values[i] ?? 0) - (mean[i] ?? 0)) / similaritiesSum)
    }, 0)
  )

  return result
}
