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
  if (type === SectionType.Output) return 'Salida'
  if (loading === true) return 'Cargando...'
  return 'Matriz resultado'
}

export const TextArea = ({ type, loading, value, style, className, onChange }: Props) => {
  const styles: React.CSSProperties = (type === SectionType.Input)
    ? { ...commonStyles, ...style, whiteSpace: 'nowrap', overflowX: 'auto', overflowY: 'hidden' }
    : (type === SectionType.Matrix) ? { ...commonStyles, ...style, whiteSpace: 'pre', overflowX: 'auto', overflowY: 'auto' }
    : { ...commonStyles, ...style, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.Input}
      as='textarea'
      disabled={type === SectionType.Output || type === SectionType.Matrix}
      placeholder={getPlaceholder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
      className={`${className ?? ''}`}
    />
  )
}
