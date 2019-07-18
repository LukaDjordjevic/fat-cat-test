import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const DalogueBox = (props) => {
  return (
    <div className="modal">
      <div className="basic-form" style={{ width: '280px', alignItems: 'center' }}>
        <div className="form-headline">{props.headline}</div>
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
  onClick: PropTypes.func.isRequired,
  headline: PropTypes.string.isRequired,
  additionalText: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
}

export default DalogueBox
