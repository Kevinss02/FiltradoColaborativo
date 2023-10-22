import { Form } from 'react-bootstrap'
import { SUPPORTED_PREDICTIONS } from '../constants'
import { type Prediction } from '../types'

interface Props {value: Prediction, onChange: (metric: Prediction) => void }

export const PredictionSelector = ({ onChange, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Prediction)
  }

  return (
    <Form.Select aria-label='Selecciona el tipo de predicción' onChange={handleChange} value={value}>

      {Object.entries(SUPPORTED_PREDICTIONS).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
