import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Input, Select, Button } from 'antd'
import { range } from '../util'
import constants, { numberOfBoardSquares } from '../constants'

const DalogueBox = (props) => {
  return (
    <div className="modal">
      <div className="basic-form" style={{ width: '280px', alignItems: 'center' }}>
        <div className="form-headline">{props.headline}</div>
        {/* <div style={{ height: '10px' }} /> */}
        <div className="">{props.additionalText}</div>
        <div style={{ height: '10px' }} />
        <Button
          className="button"
          size="default"
          onClick={props.onClick}
        >
          {props.buttonText}
        </Button>
      </div>
    </div>
  )
}

DalogueBox.defaultProps = {
  additionalText: ''
}

DalogueBox.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  headline: PropTypes.string.isRequired,
  additionalText: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
}

const mapStateToProps = ({ app, board, game }) => ({
})

export default connect(mapStateToProps)(DalogueBox)
