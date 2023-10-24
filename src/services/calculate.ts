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
  const textArray: string[] = text.split('\n')
  const matrix = readMatrix(textArray)

  const queue: Incognita[] = matrix.queue
  console.log('QUEUE: ', queue)
  // const INCOGNITA_ROW_NUMBER = queue.length
  /* const INCOGNITA_NUMBER = queue.reduce((sum, element) => {
    return sum + element.pos.length
  }, 0) */

  const MAX_NEIGHBORS_NUMBER = matrix.value.length - 1
  const NEIGHBORS_NUMBER = parseInt(neighborsNumber)
  const metricFunction = SUPPORTED_METRICS_FUNCTIONS[chosenMetric]

  // Un vector con todos los resultados de la métrica respecto a sus vecinos
  let metricVector: Array<{ value: number, index: number }> = []

  let outputIncognita = ''
  let outputMetricResults = ''
  let outputPredictionResult = ''
  let output = new Array<string>()
  const outputWithSeparateLines = new Array<string>()

  for (let i = 0; i < 2; i++) {
    // Saca la primera fila con incógnitas de la cola
    const current = queue[i]
    console.log('CURRENT', current)

    if (current?.pos != null) {
      // Itera por cada una de las incógnitas de la fila elegida
      for (let j = 0; j < queue[i].pos.length; j++) {
        // Itera por cada una de las filas vecinas diferentes a la fila sacada de la cola
        for (let k = 0; k < matrix.value.length; k++) {
          if (k === current.index) { continue }
          const resultMetric = metricFunction.metric(matrix.value[current.index], matrix.value[k])

          // Se guarda el índice de la fila y su resultado respecto a la métrica
          metricVector.push({ value: resultMetric, index: k })
        }

        // Se ordena el vector de resultados con los más favorables según la métrica
        metricVector = metricFunction.sort(metricVector)

        // Validaciones del número de vecinos
        if (isNaN(NEIGHBORS_NUMBER)) { throw new Error('Número de vecinos inválido') }
        if (NEIGHBORS_NUMBER > MAX_NEIGHBORS_NUMBER) { throw new Error(`El número de vecinos supera los existentes. Rango: 1 - ${MAX_NEIGHBORS_NUMBER}`) }
        if (NEIGHBORS_NUMBER <= 0) { throw new Error('El número de vecinos debe ser mayor a 0') }

        // Un vector que tendrá los resultados de la métrica de los vecinos seleccionados y el índice de la fila del vecino
        const metricVectorNeighbors: Array<{ value: number, index: number }> = []

        // Un vector que tendrá las valoraciones de los vecinos seleccionados en la misma columan de la incógnita
        const neighborsRatings: number[] = []

        const positionIncognita = queue[i].pos[j]
        // Itera por cada uno de los vecinos para seleccionar los mejores
        for (let i = 0; i < metricVector.length; i++) {
          const value = matrix.value[metricVector[i].index][positionIncognita]
          // Si el valor es otra incógnita se descarta el vecino y se analiza el siguiente
          if (value === null) {
            continue
          } else {
            metricVectorNeighbors.push({ value: metricVector[i].value, index: metricVector[i].index })
            neighborsRatings.push(value)
          }
          // El bucle para cuando se alcanza el número de vecinos requerido
          if (metricVectorNeighbors.length === NEIGHBORS_NUMBER) { break }
        }

        console.log('CALCULOS', metricVector)
        console.log('SOLOVECINOS', metricVectorNeighbors)
        console.log('VECINOSRATINGS', neighborsRatings)

        // Se calcula la media de las filas de la matriz
        const means = calculateMeans(matrix.value)

        // Se calcula la media de la fila de la incógnita
        const userMean = calculateMeans(matrix.value[queue[i].index])[0]
        console.log(userMean)

        // Vector con solo los valores del vector metricVectorNeighbors, sin índices
        const metricVectorNeighborsValues = metricVectorNeighbors.map(element => element.value)

        // Se calcula la predicción de la incógnita
        let resultPrediction = 0
        if (predictionType === 'ps') {
          resultPrediction = simplePrediction(metricVectorNeighborsValues, neighborsRatings)
        } else {
          resultPrediction = meanDifferencePrediction(userMean, metricVectorNeighborsValues, neighborsRatings, means)
        }

        console.log('RESULT', resultPrediction)

        // Se prepara el output respecto a los datos calculados
        outputIncognita = `Incógnita: (${current.index}, ${current.pos[j]})`
        outputMetricResults = 'Vecinos: '
        output.push(outputIncognita)
        output.push(outputMetricResults)
        for (let i = 0; i < metricVectorNeighbors.length; i++) {
          outputMetricResults = `  => (${metricVectorNeighbors[i].index}, ${metricVectorNeighbors[i].value})`
          output.push(outputMetricResults)
        }
        outputPredictionResult = `\nPred: ${resultPrediction}`
        output.push(outputPredictionResult)

        console.log(output)
        const textWithSeparateLines: string = output.join('\n')
        console.log(textWithSeparateLines)
        outputWithSeparateLines.push(textWithSeparateLines)

        // Limpieza de variables
        metricVector = []
        outputIncognita = ''
        outputMetricResults = ''
        outputPredictionResult = ''
        output = []
      }
    } else { throw new Error(`${current.index} pos is null`) }
  }
  return outputWithSeparateLines
}

export function printOutput (output: string[], outputIndex: number) {
  return output[outputIndex]
}
