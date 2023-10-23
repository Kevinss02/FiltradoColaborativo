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
  if (!(data[0] != null && data[1] != null)) { throw new Error('Hay un error en las líneas 1 y 2') }
  const minValue = parseFloat(data[0])
  const maxValue = parseFloat(data[1])
  const matrix: Array<Array<number | null>> = []
  const queue: Incognita[] = []
  let pos: number[] = []
  for (let i = 2; i < data.length; i++) {
    let count: number = 0
    if (!(data[i] != null)) { throw new Error(`Hay un error de formato en la línea ${i}`) }
    const values = data[i]?.split(' ').map((value) => {
      if (value === '-') {
        pos.push(count++)
        return null
      } else {
        const numericValue = parseFloat(value)
        if (!isNaN(numericValue)) {
          if (numericValue >= minValue && numericValue <= maxValue) {
            count++
            return numericValue
          } else { throw new Error(`El valor ${numericValue} está fuera del rango definido`) }
        } else {
          throw new Error('Los valores en la matriz deben ser números válidos o "-"')
        }
      }
    }) ?? []
    matrix.push(values)
    if (pos.length > 0) { queue.push({ index: (i - 2), pos }) }
    pos = []
  }

  queue.sort((a, b) => {
    if (a.pos.length !== b.pos.length) {
      return a.pos.length - b.pos.length
    } else {
      return a.index - b.index
    }
  })

  return { min: minValue, max: maxValue, value: matrix, queue }
}
