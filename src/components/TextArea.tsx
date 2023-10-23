import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
  style?: React.CSSProperties
  className?: string
}

const commonStyles = { height: '200px' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.Input) return 'Introducir matriz'
  if (type === SectionType.Neighbor) return ''
  if (loading === true) return 'Cargando...'
  return 'Salida'
}

export const TextArea = ({ type, loading, value, style, className, onChange }: Props) => {
  const styles = type === SectionType.Input || type === SectionType.Neighbor
    ? { ...commonStyles, ...style }
    : { ...commonStyles, ...style, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.Input || type === SectionType.Neighbor}
      as={type === SectionType.Neighbor ? 'input' : 'textarea' }
      disabled={type === SectionType.Output}
      placeholder={getPlaceholder({ type, loading })}
      style={{ ...styles, whiteSpace: 'nowrap', overflowX: 'auto', overflowY: 'hidden' }}
      value={value}
      onChange={handleChange}
      className={`${className ?? ''}`}
    />
  )
}
