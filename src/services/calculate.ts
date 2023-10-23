import { type Metric, type Prediction, type Incognita } from '../types'
import { readMatrix } from './utils/readMatrix'
import { SUPPORTED_METRICS_FUNCTIONS } from '../constants'

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
  const matrix = readMatrix(stringArray)

  const queue: Incognita[] = matrix.queue
  let metricMatrix
  if (matrix != null) {
    console.log('msize', matrix.value[0].length)
    metricMatrix = new Array<number>()
  } else { throw new Error('Matrix is null') }

  // const sz = queue.length
  for (let i = 0; i < 1; i++) {
    const current = queue[i]
    if (current?.pos != null) {
      for (let j = 0; j < 1; j++) {
        for (let k = 0; k < matrix.value.length; k++) {
          if (k === current.index) { continue }
          const metricFunction = SUPPORTED_METRICS_FUNCTIONS[chosenMetric]
          const result = metricFunction(matrix.value[current.index], matrix.value[k])
          console.log(result)
          metricMatrix.push(result)
        }
      }
      console.log(metricMatrix)
      return metricMatrix
    }
  }
}
