export interface Matrix {
  value: Array<Array<number | null>>
  min: number
  max: number
  queue: Incognita[]
}

export interface Incognita {
  index: number
  pos: number[]
}

export function readMatrix (data: string[]): Matrix {
  if (data.length < 3) { throw new Error('La matriz debe contener al menos tres líneas de datos.') } // TODO comprobar validez matriz
  //  Comprobar fila 1 y 2 sean un solo valor

  const minValue = parseFloat(data[0])
  const maxValue = parseFloat(data[1])
  const matrix: Array<Array<number | null>> = []
  const queue: Incognita[] = []
  let pos: number[] = []
  for (let i = 2; i < data.length; i++) {
    let count: number = 0

    const values = data[i].split(' ').map((value) => {
      if (value === '-') {
        pos.push(count++)
        return null
      } else {
        count++
        return parseFloat(value)
      }
    })
    matrix.push(values)
    if (pos.length > 0) { queue.push({ index: (i - 2), pos }) }
    pos = []
  }
  console.log(queue)
  queue.sort((a, b) => {
    if (a.pos.length !== b.pos.length) {
      return a.pos.length - b.pos.length
    } else {
      return a.index - b.index
    }
  })
  console.log(queue)
  return { min: minValue, max: maxValue, value: matrix, queue }
}

export function validateMatrix (matrix: Matrix) {
  // TODO validate
  return matrix
}
