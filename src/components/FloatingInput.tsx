import Form from 'react-bootstrap/Form'

interface Props {
  onChange: (value: string) => void
  value: string
  style?: React.CSSProperties
  className?: string
}

export function FloatingInput ({ value, style, className, onChange }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Floating className='mb-3'>
      <Form.Control
        type="input"
        placeholder="Introducir el número de vecinos"
        value={value}
        onChange={handleChange}
        className={`${className}`}
        style={style}
      />
      <label htmlFor="floatingInputCustom" style={{ lineHeight: '0px' }}>Número de vecinos</label>
    </Form.Floating>
  )
}
