import { Form } from 'react-bootstrap'
import { SUPPORTED_METRICS } from '../constants'
import { type Metric } from '../types'

interface Props {value: Metric, onChange: (metric: Metric) => void }

export const MetricSelector = ({ onChange, value }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Metric)
  }

  return (
    <Form.Select aria-label='Selecciona la métrica' onChange={handleChange} value={value}>

      {Object.entries(SUPPORTED_METRICS).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </Form.Select>
  )
}
