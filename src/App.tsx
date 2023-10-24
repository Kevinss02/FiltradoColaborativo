import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import { useDebounce } from './hooks/useDebounce'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'

import './App.css'
import { ClipboardIcon } from './components/Icons'
import { MetricSelector } from './components/MetricSelector'
import { PredictionSelector } from './components/PredictionSelector'
import { TextArea } from './components/TextArea'
import { FloatingInput } from './components/FloatingInput'
import { useStore } from './hooks/useStore'
import { calculate, printOutput } from './services/calculate'
import { PaginationIncognita } from './components/PaginationIncognita'

import { SectionType } from './types.d'

function App () {
  const {
    chosenMetric,
    predictionType,
    neighborsNumber,
    inputMatrix,
    resultMatrix,
    output,
    outputIndex,
    incognitaNumber,
    loading,
    setMetric,
    setPrediction,
    setNeighborsNumber,
    setInputMatrix,
    setResultMatrix,
    setOutput,
    setOutputIndex,
    setIncognitaNumber
  } = useStore()

  const debouncedFromText = useDebounce(inputMatrix, 300)

  useEffect(() => {
    if (debouncedFromText === '') return

    calculate({ chosenMetric, predictionType, neighborsNumber, setIncognitaNumber, text: debouncedFromText })
      .then(result => {
        if (result == null) return
  
        setResultMatrix(result.resultMatrix)
        setOutput(printOutput(result.output, parseInt(outputIndex)))
      })
      .catch((error) => { setResultMatrix(error) })
  }, [debouncedFromText, chosenMetric, predictionType, neighborsNumber, outputIndex])

  const handleClipboard = () => {
    navigator.clipboard.writeText(resultMatrix).catch(() => {})
  }

  return (
    <Container fluid>
      <h2 className='mb-5' style={{ padding: '50px' }}>Método de filtrado colaborativo</h2>

      <Row>
        <Col style={{ width: '400px' }}>
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

        <Col style={{ width: '200px', display: 'flex', justifyContent: 'center' }}>
          <FloatingInput
            value={neighborsNumber}
            onChange={setNeighborsNumber}
            style={{ height: '38px', width: '170px' }}
          />
        </Col>

        <Col style={{ width: '400px' }}>
          <Stack gap={2}>
            <PredictionSelector
              value={predictionType}
              onChange={setPrediction}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                loading={loading}
                type={SectionType.Matrix}
                value={resultMatrix}
                onChange={setResultMatrix}
              />
            </div>
            <div style={{ marginLeft: '220px' }}>
              <Button
                variant='link'
                onClick={handleClipboard}>
                <ClipboardIcon />
              </Button>
            </div>
          </Stack>
        </Col>
      </Row>

      <Row gap={2} className='mt-2 mb-3'>
        <div style={{ position: 'relative' }}>
          <TextArea
            loading={loading}
            type={SectionType.Output}
            value={output}
            onChange={setOutput}
          />
        </div>
      </Row>
      <PaginationIncognita incognitaNumber={incognitaNumber} setOutputIndex={setOutputIndex}/>
    </Container>
  )
}

export default App
