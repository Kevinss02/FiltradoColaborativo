import { type Metric, type Prediction, type Incognita } from '../types'
import { readMatrix } from './utils/readMatrix'
import { SUPPORTED_METRICS_FUNCTIONS } from '../constants'
import { meanDifferencePrediction, simplePrediction } from './utils/predictionFunctions'
import { calculateMeans } from './utils/calculateFunctions'

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
  console.log("QUEUE: ", queue)
  const INCOGNITA_ROW_NUMBER = queue.length
  const INCOGNITA_NUMBER = queue.reduce((sum, element) => {
    return sum + element.pos.length;
  }, 0);  
  const MAX_NEIGHBORS_NUMBER = matrix.value.length - 1
  const NEIGHBORS_NUMBER = parseInt(neighborsNumber)
  let metricVector: {value: number, index: number}[] = []
  const metricMatrix: Array<Array<number>> = []
  const metricFunction = SUPPORTED_METRICS_FUNCTIONS[chosenMetric]
  
  for (let i = 0; i < 1; i++) {
    const current = queue[i]
    if (current?.pos != null) {
      for (let j = 0; j < queue[i].pos.length; j++) {
        console.log("CURRENT", current)
        for (let k = 0; k < matrix.value.length; k++) {
          if (k === current.index) { continue }
          const resultMetric = metricFunction.metric(matrix.value[current.index], matrix.value[k])
          metricVector.push({ value: resultMetric, index: k })
        }
        
        metricVector = metricFunction.sort(metricVector)


        if (isNaN(NEIGHBORS_NUMBER)) { throw new Error('Número de vecinos inválido') }
        if (NEIGHBORS_NUMBER > MAX_NEIGHBORS_NUMBER) { throw new Error(`El número de vecinos supera los existentes. Rango: 1 - ${MAX_NEIGHBORS_NUMBER}`) }
        if (NEIGHBORS_NUMBER <= 0) { throw new Error('El número de vecinos debe ser mayor a 0')}
        
        
        const metricVectorNeighbors: {value: number, index: number}[] = []
        const positionIncognita = queue[i].pos[j]
        const neighborsRatings: number[] = []
        for (let i = 0; i < metricVector.length; i++) {
          const value = matrix.value[metricVector[i].index][positionIncognita]
          if (value === null) { continue }
          else {
            metricVectorNeighbors.push({value: metricVector[i].value , index: metricVector[i].index})
            neighborsRatings.push(value)
          }
          if (metricVectorNeighbors.length === NEIGHBORS_NUMBER) { break }
        }

        console.log("CALCULOS", metricVector)
        console.log("SOLOVECINOS", metricVectorNeighbors)
        console.log("VECINOSRATINGS", neighborsRatings)
        
        const means = calculateMeans(matrix.value)
        const userMean = calculateMeans(matrix.value[queue[i].index])[0]
        console.log(userMean)

        const metricVectorNeighborsValues = metricVectorNeighbors.map(element => element.value)

        let resultPrediction = 0
        if (predictionType === 'ps') { 
          resultPrediction = simplePrediction(metricVectorNeighborsValues, neighborsRatings)
        } else {
          resultPrediction = meanDifferencePrediction(userMean , metricVectorNeighborsValues, neighborsRatings, means)
        }
        
        return resultPrediction
        console.log(matrix.value.toString())
        


        return metricVectorNeighbors
        metricMatrix.push(metricVector)
        metricVector = []

      }
    }
  
  let output = ''
  for (let row = 0; row < metricMatrix.length; row++) {
    output += metricMatrix[row].join(' ') + '\n' // Imprime la fila como una cadena separada por espacios
  }

  return output
 }
}
