import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { useDebounce } from './hooks/useDebounce'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'

import './App.css'
import { ClipboardIcon } from './components/Icons'
import { MetricSelector } from './components/MetricSelector'
import { PredictionSelector } from './components/PredictionSelector'
import { TextArea } from './components/TextArea'
import { useStore } from './hooks/useStore'
import { calculate } from './services/calculate'

import { SectionType } from './types.d'

function App () {
  const {
    chosenMetric,
    predictionType,
    neighborsNumber,
    inputMatrix,
    resultMatrix,
    loading,
    setMetric,
    setPrediction,
    setNeighborsNumber,
    setInputMatrix,
    setResultMatrix
  } = useStore()

  const debouncedFromText = useDebounce(inputMatrix, 300)

  useEffect(() => {
    if (debouncedFromText === '') return

    calculate({ chosenMetric, predictionType, neighborsNumber, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResultMatrix(result)
      })
      .catch((error) => { setResultMatrix(error) })
  }, [debouncedFromText, chosenMetric, predictionType, neighborsNumber])

  const handleClipboard = () => {
    navigator.clipboard.writeText(resultMatrix).catch(() => {})
  }

  return (
    <Container fluid>
      <h2 className='mb-5'>Método de filtrado colaborativo</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <MetricSelector
              value={chosenMetric}
              onChange={setMetric}
            />

            <TextArea
              type={SectionType.Input}
              value={inputMatrix}
              onChange={setInputMatrix}
            />
          </Stack>

        </Col>

        <Col>
            <TextArea
                loading={loading}
                type={SectionType.Neighbor}
                value={neighborsNumber}
                onChange={setNeighborsNumber}
                style={{ height: '40px', width: '40px' }}
              />
        </Col>

        <Col>
          <Stack gap={2}>
            <PredictionSelector
              value={predictionType}
              onChange={setPrediction}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                loading={loading}
                type={SectionType.Output}
                value={resultMatrix}
                onChange={setResultMatrix}
              />
              <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                <Button
                  variant='link'
                  onClick={handleClipboard}>
                  <ClipboardIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
