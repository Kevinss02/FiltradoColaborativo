import { type Metric, type Prediction } from '../types'
import { readMatrix } from './utils/readMatrix'

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
  console.log(text)
  console.log(stringArray)
  console.log(chosenMetric)
  console.log(predictionType)
  const read = readMatrix(stringArray)
  console.log(read.value.toString())
  console.log(read)
  return read.value.toString()
}
