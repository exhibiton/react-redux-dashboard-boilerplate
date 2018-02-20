import React from 'react'
import _ from 'lodash'
import { Col, Row } from 'reactstrap'
import Doge from '../../../assets/doge.jpg'
import styled from 'styled-components'

const StyledRow = styled(Row)`
  height: 100vh;
`

class SecretView extends React.Component {
  render() {
    return (
      <StyledRow>
        <Col className="align-self-center">
          <Row className="no-gutters justify-content-center">
            <img src={ Doge } />
          </Row>
        </Col>
      </StyledRow>
    )
  }
}

export default SecretView
