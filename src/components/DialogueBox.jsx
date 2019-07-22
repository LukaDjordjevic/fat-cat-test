import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

const DalogueBox = (props) => {
  const {
    headline,
    additionalText,
    onClick,
    buttonText,
  } = props
  return (
    <div className="modal">
      <div className="basic-form" style={{ width: '280px', alignItems: 'center' }}>
        <div className="form-headline">{headline}</div>
        <div className="">{additionalText}</div>
        <div style={{ height: '10px' }} />
        <Button
          className="button"
          size="default"
          onClick={onClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

DalogueBox.defaultProps = {
  additionalText: '',
}

DalogueBox.propTypes = {
  onClick: PropTypes.func.isRequired,
  headline: PropTypes.string.isRequired,
  additionalText: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
}

export default DalogueBox
