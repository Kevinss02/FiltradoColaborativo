import { type Metric, type Prediction } from '../types'
import { readMatrix } from './utils/readMatrix'
import { calculateCosineDistance, calculateEuclideanDistance, calculatePearsonCorrelation } from './utils/similarityFunctions'

export async function calculate ({
  chosenMetric,
  predictionType,
  neighborsNumber,
  text
}: {
  chosenMetric: Metric
  predictionType: Prediction
  neighborsNumber: string
  text: string
}) {
  const stringArray: string[] = text.split('\n')
  // const read = readMatrix(stringArray)
  // console.log(read.value.toString())
  // onsole.log(read)

  /* const datos: string[] = [
    "0.000",
    "5.000",
    "3.142 2.648 1.649 - 1.116 0.883 0.423 3.976 - 3.143",
    "3.412 0.314 3.796 4.233 2.159 4.513 2.392 0.868 2.473 -",
    "4.408 4.495 2.052 - 0.051 - 3.355 3.739 4.085 -",
    "1.731 - - 1.511 4.866 2.217 3.003 2.901 2.113 -",
    "0.555 4.887 1.217 0.803 3.799 4.877 2.831 0.991 4.493 0.437"
  ] */
  const matrix = readMatrix(stringArray)

  const r = calculateCosineDistance(matrix.value[0] ?? [], matrix.value[1] ?? [])
  const r2 = calculateEuclideanDistance(matrix.value[0] ?? [], matrix.value[1] ?? [])
  const r3 = calculatePearsonCorrelation(matrix.value[0] ?? [], matrix.value[1] ?? [])
  switch (chosenMetric) {
    case 'cp':
      return r

    case 'de':
      return r2

    case 'dc':
      return r3
  }
}
